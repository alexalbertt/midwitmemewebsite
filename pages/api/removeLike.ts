import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
  }
    // get the likeId from the request body
    const likeId = req.body.likeId;

    // delete the like
    await prisma.like.delete({ where: { id: likeId } });

    // send a successful response
    res.status(200).json({ message: 'Like successfully removed' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};