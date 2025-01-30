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
    console.error('Error during Auth0 callback:', error);
<<<<<<< HEAD
    // res.redirect('/profile'); 
=======
    res.redirect('/profile'); 
>>>>>>> e923976a3f78cf907c72d7582f1dbaba010838d3
  }
}
