import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import { setCookie } from "cookies-next";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { first_name, last_name, email, phone, city, password } = req.body;
    const validSchema = [
      {
        valid: validator.isLength(first_name, { min: 1, max: 20 }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(last_name, { min: 1, max: 20 }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
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

    const userWithEmail = await prisma.user.findFirst({ where: { email } });
    if (userWithEmail) {
      res.status(400).json({ errorMessage: "Email is already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        city,
        email,
        phone,
        password: hashedPassword,
      },
    });

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
