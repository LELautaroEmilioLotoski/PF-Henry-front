// src/pages/api/auth/callback.ts
import { handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res, {
<<<<<<< HEAD
      redirectTo: '/profile',
=======
      redirectTo: '/profile', 
>>>>>>> 025de09475f9eba1cb85e877069a3f72cb52689f
    });
  } catch (error) {
    console.error(error);
  }
}