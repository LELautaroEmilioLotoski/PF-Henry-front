import { getAuth0TokenAndSendToBackend } from '@/helpers/getAuth0SendToBackend';
import { handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("estoy en el login de auth0");
    
    await handleLogin(req, res, {
<<<<<<< HEAD
      returnTo: '/profile', // Página a la que redirigir después del login
=======
      returnTo: '/profile',
>>>>>>> aca5f75b9170ca47f9107102563c6a7ebeb9f669
    });
  } catch (error) {
    console.error(error);
  }
}
