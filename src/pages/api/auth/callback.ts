// // src/pages/api/auth/callback.ts
// import { handleCallback } from '@auth0/nextjs-auth0';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function callback(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await handleCallback(req, res, {
//       redirectTo: '/profile',
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

import { handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res); // Sin 'redirectTo'
  } catch (error) {
<<<<<<< HEAD
    console.error('Error during Auth0 callback:', error);
    res.redirect('/profile'); 
=======
    console.error('Callback error:', error);
    res.status(500).json({ error: 'Authentication callback failed' });
>>>>>>> aca5f75b9170ca47f9107102563c6a7ebeb9f669
  }
}
