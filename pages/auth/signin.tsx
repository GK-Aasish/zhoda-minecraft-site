import { getProviders, signIn } from "next-auth/react";

type Props = { providers: Record<string, any> | null };

export default function SignIn({ providers }: Props) {
  if (!providers || Object.keys(providers).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div>No providers configured.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 rounded-xl bg-zinc-800">
        <h1 className="text-3xl mb-6 text-yellow-400 text-center">Sign in</h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="text-center mb-4">
            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-md"
              onClick={() => signIn(provider.id)}
            >
              Continue with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return { props: { providers: providers ?? null } };
}
