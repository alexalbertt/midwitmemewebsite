import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

// Get the user id from the email
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // get the user email from the request query
    const email = req.query.email as string;

    // find the user by email
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // send the userId as a response
    res.status(200).json({ userId: user.id });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};