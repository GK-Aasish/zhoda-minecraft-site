import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }: any) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="p-8 rounded-xl bg-black/40">
        <h1 className="text-3xl mb-6 text-yellow-400 text-center">Sign in</h1>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <div key={provider.name} className="text-center">
              <button
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-md transition-all"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
