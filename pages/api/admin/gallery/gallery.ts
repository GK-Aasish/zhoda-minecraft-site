import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== Role.superadmin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method === "POST") {
    const { imageUrl, caption } = req.body;
    const item = await prisma.galleryItem.create({ data: { imageUrl, caption } });
    return res.json(item);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.galleryItem.delete({ where: { id } });
    return res.json({ success: true });
  }

  res.status(405).end();
}
