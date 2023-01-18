import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const userEmail = session.user?.email as string;
        const likes = await prisma.like.findMany({
            where: {
                user: {
                    email: userEmail
                }
            }
        });
        console.log("FETCHED LIKES: " + likes)
        res.status(200).json(likes);
    } catch (err:any) {
        console.log("Error getting user likes " + err.message)
        res.status(500).json({ message: err.message });
    }
};