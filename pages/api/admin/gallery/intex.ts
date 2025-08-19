import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(items);
  }
  if (req.method === "POST") {
    const { imageUrl, caption } = req.body;
    if (!imageUrl) return res.status(400).json({ error: "imageUrl is required" });
    const item = await prisma.galleryItem.create({ data: { imageUrl, caption } });
    return res.status(201).json(item);
  }
  return res.status(405).end();
}
