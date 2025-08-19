import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Zhoda Minecraft</h1>

      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          Login with Google
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <img src={session.user?.image ?? ""} alt="Profile" className="w-16 h-16 rounded-full" />
          <p className="text-xl">
            Welcome, {session.user?.name}{" "}
            {session.user?.email === process.env.NEXT_PUBLIC_OWNER_EMAIL && "👑"}
          </p>
          <button
            onClick={() => signOut()}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
