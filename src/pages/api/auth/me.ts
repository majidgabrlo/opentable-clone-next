import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearer = req.headers["authorization"] as string;
  const [, token] = bearer.split(" ");
  const payload = jose.decodeJwt(token) as { email: string };

  const user = await prisma.user.findFirst({
    where: { email: payload.email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });
  if (!user) {
    return res.status(401).json({
      errorMessage: "User Not Found",
    });
  }

  return res.status(200).json({ me: user });
}
