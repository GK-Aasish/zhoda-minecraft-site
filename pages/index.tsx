import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Zhoda Minecraft</h1>
        <button
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-yellow-400 text-black rounded-2xl shadow-lg hover:bg-yellow-300 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center">
        <img
          src={session.user?.image || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold flex items-center">
          {session.user?.name}
          {session.user?.role === "crown" && <span className="ml-2">👑</span>}
        </h2>
        <p className="text-sm text-gray-500">{session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-2xl shadow hover:bg-red-400 transition"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
