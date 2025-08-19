import MinecraftHeader from "@/components/MinecraftHeader";
import MinecraftCard from "@/components/MinecraftCard";
import mods from "@/data/mods.json";

export default function RequiredMods() {
  return (
    <div className="min-h-screen bg-[url('/textures/stone.png')] text-white minecraft-font">
      <MinecraftHeader />

      <main className="container mx-auto py-12 px-6">
        <h2 className="text-3xl text-yellow-400 text-center mb-12">
          Required Mods
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mods.map((mod, idx) => (
            <MinecraftCard
              key={idx}
              className="text-center hover:scale-105 transition-transform h-full flex flex-col justify-between"
            >
              {/* Just name (no logo) */}
              <h3 className="text-xl text-yellow-300 mb-4">{mod.name}</h3>

              <p className="text-gray-200 mb-4 flex-grow">{mod.desc}</p>

              <a
                href={mod.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline hover:text-green-300 mt-auto"
              >
                Download
              </a>
            </MinecraftCard>
          ))}
        </div>
      </main>
    </div>
  );
}
