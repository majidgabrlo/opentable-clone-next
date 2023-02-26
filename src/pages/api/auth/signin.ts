import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import validator from "validator";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const validSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, { min: 3 }),
        errorMessage: "Password is invalid",
      },
    ];

    const errors = validSchema.filter((field) => !field.valid);
    if (errors.length) {
      res.status(400).json({
        errorMessages: errors.map((error) => error.errorMessage),
      });
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(401).json({ errorMessage: "Email or password is invalid" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ errorMessage: "Email or password is invalid" });
    }

    const algoritm = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg: algoritm })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 6 * 24 * 60 });

    return res.status(200).json({
      email:user.email,
      first_name:user.first_name,
      last_name:user.last_name,
      phone:user.phone,
      city:user.city
    });
  }
  return res.status(404).json("Unknown endpoint");
}
