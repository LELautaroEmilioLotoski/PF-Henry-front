import { handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("estoy en el login de auth0");
    
    await handleLogin(req, res, {
<<<<<<< HEAD
      returnTo: '/profile',
=======
      returnTo: '/profile', // Página a la que redirigir después del login
>>>>>>> 3858565680e99ddd85c989879195305d37470f29
    });
  } catch (error) {
    console.error(error);
  }
}
