// pages/api/auth/token.ts
import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const handler = withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getAccessToken(req, res);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error obteniendo el token:", error); // Ahora se usa la variable error
    res.status(500).json({ error: "Error al obtener el token" });
  }
});


export default handler;
