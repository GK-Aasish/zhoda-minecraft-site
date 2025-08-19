import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard 👑</h1>
      {session?.user?.email === process.env.NEXT_PUBLIC_OWNER_EMAIL ? (
        <p>Welcome, super admin {session.user?.name}!</p>
      ) : (
        <p>Access denied.</p>
      )}
    </main>
  );
}
