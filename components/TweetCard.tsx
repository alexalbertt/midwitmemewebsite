import React, { useState, useEffect } from 'react';
import { Like, Tweet } from '@prisma/client'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { useSession, signIn, signOut } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import TimeIndicator from './TimeIndicator';


interface TweetCardProps {
  tweet: Tweet,
  userId: string
}

const TweetCard = (Props: TweetCardProps) => {
  const { data: session } = useSession()

  // State for all the likes for a tweet
  const [likes, setLikes] = useState<Like[]>([])
  // State for the likeId from the like of the tweet from the current user if it exists
  const [likedTweetId, setLikedTweetId] = useState<string>("")

  const likeCard = async () => {
    if (!session) {
        alert("Please log in to like memes");
        return;
    }
    if (likedTweetId !== "") {
        // remove like
        try {
            const res = await fetch(`/api/removeLike`, {
                method: "DELETE",
                body: JSON.stringify({
                    likeId: likedTweetId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
              setLikes(likes.filter((like) => like.id !== likedTweetId));
              setLikedTweetId("");
            } else {
                console.error("An error occurred while removing the like.");
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        // add like
        try {
            const res = await fetch(`/api/addLike`, {
                method: "POST",
                body: JSON.stringify({
                    tweetId: Props.tweet.tweetId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const newLike = JSON.parse(JSON.stringify(res.json)) as Like
                setLikedTweetId(newLike.id);
                const newLikes = [...likes, newLike];
                setLikes(newLikes);
            } else {
                console.error("An error occurred while adding the like.");
            }
        } catch (err) {
            console.error(err);
        }
    }
  }

  useEffect(() => {
    // Fetch all the likes for a tweet
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/getLikes?tweetId=${Props.tweet.tweetId}`);
        const data = await res.json();
        setLikes(data.likes);
      } catch (err) {
        console.error(err);
      }
    };
    // Check if the user has liked the tweet
    const checkLikes = async () => {
      likes.forEach((like) => {
        if (like.userId === Props.userId) {
          setLikedTweetId(like.id);
        }
      })
    }
    fetchLikes();
    checkLikes();
  });

  return (
    <div className="relative rounded-lg overflow-hidden bg-white max-w-2xl">
      <div className='relative pb-20'>
        <img src={Props.tweet.tweetImageUrl} alt="tweet image" className="w-full" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center bg-gray-100 justify-between py-2 border-t-[1px] border-slate-200">
        <div className="flex justify-center items-center">
          <button onClick={likeCard} className="flex justify-center items-center ml-3">
            <div className="">
              {likedTweetId !== "" ? <FontAwesomeIcon icon={faHeart} size="1x" style={{color: "#ef4444" }}/> : <FontAwesomeIcon icon={farHeart} className="heart-icon" size="1x" style={{color: "grey" }}/>}
            </div>
            <p className="text-lg text-slate-500 ml-1">{likes.length}</p>
          </button>
        </div>
        <div className="flex-col justify-center items-end mr-2">
          <a href={Props.tweet.tweetUrl} className="text-sm text-slate-500 hover:text-slate-800 mr-1">
          <FontAwesomeIcon icon={faTwitter} size="1x" style={{color: "#1DA1F2" }}/> by @{Props.tweet.tweetAuthor}
          </a>
          <TimeIndicator date={Props.tweet.createdAt}/>
        </div>
      </div>
    </div>
  )
}

export default TweetCard