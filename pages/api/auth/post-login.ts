import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user?.email === "gk.aasishkarki@gmail.com") {
    // You are the admin → go to admin dashboard
    res.writeHead(302, { Location: "/admin" });
  } else {
    // Anyone else → go to homepage
    res.writeHead(302, { Location: "/" });
  }
  res.end();
}
