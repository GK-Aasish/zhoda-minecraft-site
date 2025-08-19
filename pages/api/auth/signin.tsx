import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="p-8 rounded-xl bg-black/40">
        <h1 className="text-3xl mb-6 text-yellow-400 text-center">Sign in</h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="text-center">
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

SignIn.getInitialProps = async (context: any) => {
  const providers = await getProviders();
  return { providers };
};
