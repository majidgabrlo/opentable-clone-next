import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { slug } = req.query as { slug: string };
    const { firstName, lastName, rating, text, email } = req.body as {
      firstName: string;
      lastName: string;
      rating: string;
      text: string;
      email: string;
    };
    console.log({ firstName, lastName, rating, text, email });
    
    if (
      !validator.isLength(firstName, { min: 1 }) ||
      !validator.isLength(lastName, { min: 1 })
    ) {
      return res.status(400).json({
        errorMessage: "Invalid request",
      });
    }
    if (!validator.isLength(text, { min: 1 })) {
      return res.status(400).json({
        errorMessage: "Invalid request",
      });
    }
    if (+rating > 5 || +rating < 0) {
      return res.status(400).json({
        errorMessage: "Invalid request",
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid request",
      });
    }

    const restaurant = await prisma.restaurant.findUnique({ where: { slug } });
    if (!restaurant) {
      return res.status(400).json({
        errorMessage: "Invalid request",
      });
    }

    const payload = await prisma.review.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        rating: +rating,
        text,
        restaurant_id: restaurant.id,
        user_id:user.id
      },
    });
    res.status(200).json(payload)
  }
}

export default handler;
