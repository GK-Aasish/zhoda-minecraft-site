import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === "DELETE") {
    await prisma.server.delete({ where: { id } });
    return res.status(204).end();
  }

  if (req.method === "PUT") {
    const { name, host, displayHost, desc, comingSoon } = req.body;
    const item = await prisma.server.update({
      where: { id },
      data: { name, host, displayHost, desc, comingSoon: Boolean(comingSoon) },
    });
    return res.status(200).json(item);
  }

  return res.status(405).end();
}

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    await prisma.server.delete({ where: { id: String(id) } });
    return res.json({ ok: true });
  }

  res.status(405).end();
}
