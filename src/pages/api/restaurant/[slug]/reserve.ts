import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  const findAvailableTablesData = await findAvailableTables({
    day,
    res,
    slug,
    time,
  });
  if (!findAvailableTablesData) {
    return res.status(400).json({
      errorMessage: "Invalid request",
    });
  }
  const { restaurant, searchTimesWithTables } = findAvailableTablesData;

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return res.status(400).json({ errorMessage: "Restaurant is not open" });
  }

  const searchTimeWithTables = searchTimesWithTables.find(
    (t) => t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
  );

  if (!searchTimeWithTables) {
    return res.status(400).json({
      errorMessage: "No availability",
    });
  }

  res.json({ searchTimeWithTables });
}
