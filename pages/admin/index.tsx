import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "superadmin") {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p className="text-center mt-20 text-white">Checking permissions...</p>;
  }

  if (!session || session.user?.role !== "superadmin") {
    return null;
  }

  return (
    <div className="min-h-screen text-white p-8 bg-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-yellow-400">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">{session?.user?.email}</span>
          <button
            className="px-3 py-2 bg-red-500 rounded hover:bg-red-400"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>

      <p className="text-zinc-300 mb-6">
        If you can see this page, your account has the <b>superadmin</b> role.
      </p>

      <ul className="space-y-3">
        <li>
          <Link href="/admin/gallery" className="text-blue-400 hover:underline">
            Manage Gallery
          </Link>
        </li>
        <li>
          <Link href="/admin/servers" className="text-blue-400 hover:underline">
            Manage Servers
          </Link>
        </li>
      </ul>
    </div>
  );
}
