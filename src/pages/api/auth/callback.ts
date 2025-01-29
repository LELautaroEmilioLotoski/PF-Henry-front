// src/pages/api/auth/callback.ts
import { handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res, {
      redirectTo: '/profile', 
    });
  } catch (error) {
    console.error('Error during Auth0 callback:', error);
    res.redirect('/profile'); 
  }
}
