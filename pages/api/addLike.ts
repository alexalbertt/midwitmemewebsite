import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { getSession } from 'next-auth/react';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    // get the tweetId from the request query
    const tweetId = req.body.tweetId as string;



    if (session?.user?.email) {
      // create a new like
      const newLike = await prisma.like.create({
        data: {
          tweet: {
            connect: {
              tweetId: tweetId
            }
          },
          user: {
            connect: { email: session.user.email }
          }
        }
      });
      // send the created like as a response
      res.status(201).json(newLike);
    } else {
      res.status(500).json({ message: "User email not found" });
    }
  } catch (err:any) {
    console.log("Error adding like " + err.message)
    res.status(500).json({ message: err.message });
  }
};