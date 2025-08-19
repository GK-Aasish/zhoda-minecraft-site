import type { NextApiRequest, NextApiResponse } from "next";
import { status } from "minecraft-server-util";
import dns from "dns/promises";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { host } = req.query;

  if (!host) return res.status(400).json({ error: "Missing host" });

  try {
    // Split "hostname:port"
    const [hostname, portStr] = (host as string).split(":");
    const port = parseInt(portStr || "25565", 10);

    // Resolve DNS to raw IP (fixes Aternos changing IP)
    const { address } = await dns.lookup(hostname);

    // Ping the resolved IP
    const serverStatus = await status(address, port, { timeout: 5000 });

    return res.status(200).json({
      online: true,
      players: serverStatus.players,
      motd: serverStatus.motd?.clean ?? "",
      version: serverStatus.version?.name ?? "",
    });
  } catch (error) {
    console.error(`Error pinging server ${host}`, error);
    return res.status(200).json({
      online: false,
      players: { online: 0, max: 0 },
    });
  }
}
