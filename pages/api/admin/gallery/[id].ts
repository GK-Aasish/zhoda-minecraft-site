import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    await prisma.galleryItem.delete({ where: { id: String(id) } });
    return res.json({ ok: true });
  }

  res.status(405).end();
}
