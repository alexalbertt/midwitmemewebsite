import { Like } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../lib/prisma'

interface Data {
    likes: Like[],
    message: string
  }

  // Get all likes for a tweet
export default async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) => {
    const tweetId = req.query.tweetId as string;
  try {
    const likes = await prisma.like.findMany({
      where: {
        tweet: {
          tweetId: tweetId
        }
      }
    });
    res.status(200).json({likes: likes, message: "Success"});
  } catch (err:any) {
    res.status(500).json({ likes: [], message: err.message });
  }
};