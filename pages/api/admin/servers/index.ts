import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== Role.superadmin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method === "GET") {
    const servers = await prisma.server.findMany({ orderBy: { createdAt: "desc" } });
    return res.json(servers);
  }

  if (req.method === "POST") {
    const { name, host, displayHost, desc, comingSoon } = req.body;
    const server = await prisma.server.create({
      data: { name, host, displayHost, desc, comingSoon },
    });
    return res.json(server);
  }

  res.status(405).end();
}
