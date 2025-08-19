import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import cloudinary from "@/lib/cloudinary";
import multer from "multer";

// Disable Next.js default body parser for multipart/form-data
export const config = { api: { bodyParser: false } };

// Helper to run multer as a promise
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async function handler(req: NextApiRequest & { file?: Express.Multer.File }, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || (session.user as any)?.role !== "superadmin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method !== "POST") return res.status(405).end();

  try {
    // @ts-ignore - run multer middleware to populate req.file
    await runMiddleware(req, res, upload.single("file"));

    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Upload to Cloudinary using upload_stream
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "minecraft-gallery" },
        (error, uploaded) => {
          if (error) return reject(error);
          resolve(uploaded);
        }
      );
      stream.end(file.buffer);
    });

    return res.json({ url: result.secure_url });
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: err.message || "Upload failed" });
  }
}
