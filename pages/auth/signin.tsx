import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }: any) {
  const playClick = () => {
    const audio = new Audio("/sounds/click.wav");
    audio.play();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-black font-minecraft">
      <div className="p-8 rounded-xl bg-black/70 border-4 border-green-600 shadow-2xl">
        <h1 className="text-3xl mb-6 text-green-400 text-center drop-shadow-lg">
          Minecraft Login
        </h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="text-center">
            <button
              onClick={() => {
                playClick();
                signIn(provider.id, { callbackUrl: "/" });
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg shadow-md transition-all transform hover:scale-105"
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
