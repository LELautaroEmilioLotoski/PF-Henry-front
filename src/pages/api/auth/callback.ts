// src/pages/api/auth/callback.ts
import { handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("estoy en callback");
    await handleCallback(req, res, {
      redirectTo: '/profile', // Asegúrate de que este campo exista en la versión de @auth0/nextjs-auth0
    });
  } catch (error) {
    console.error(error);
  }
}
