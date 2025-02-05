// import { getAuth0TokenAndSendToBackend } from '@/helpers/getAuth0SendToBackend';
import { handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from "js-cookie";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    Cookies.get("token")
    
    await handleLogin(req, res, {
      returnTo: '/profile', // Página a la que redirigir después del login
    });
  } catch (error) {
    console.error(error);
  }
}
