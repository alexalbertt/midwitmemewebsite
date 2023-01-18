import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Like, Tweet } from '@prisma/client'
import TweetCard from './TweetCard'
import { useSession } from 'next-auth/react'

interface Props {
  tweets: Tweet[]
}

// Represents the grid of TweetCards
const CardGrid: NextPage<Props> = ({ tweets }) => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState<string>("")
  
  // fetch userId from session
  useEffect(() => {
    if (session) {
      const fetchUserId = async () => {
        try {
          const res = await fetch(`/api/getUserId?email=${session.user?.email}`);
          const data = await res.json();
          setUserId(data.userId);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUserId();
    }
  })
  


  return (
    <div className=''>
      <div className="grid grid-cols-1 gap-8">
        {tweets.slice(0).reverse().map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} userId={userId}/>
        ))}
    </div>
    </div>
  )
}

export default CardGrid