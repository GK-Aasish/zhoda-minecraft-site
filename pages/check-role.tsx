import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CheckRole() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (session.user?.role === "crown") {
      router.replace("/admin");   // Crown → Admin
    } else {
      router.replace("/");        // Others → Homepage
    }
  }, [session, status, router]);

  return <p className="text-center text-white mt-20">Redirecting...</p>;
}
