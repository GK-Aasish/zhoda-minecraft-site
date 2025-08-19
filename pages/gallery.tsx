import { useEffect, useState } from "react";
import axios from "axios";
import MinecraftHeader from "@/components/MinecraftHeader";
import MinecraftCard from "@/components/MinecraftCard";

type GalleryItem = {
  id: string;
  imageUrl: string;
  caption?: string;
};

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await axios.get<GalleryItem[]>("/api/gallery");
      setItems(res.data);
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[url('/textures/grass.png')] text-white minecraft-font">
      <MinecraftHeader />

      <main className="container mx-auto py-12 px-6">
        <h2 className="text-3xl text-yellow-400 text-center mb-12">
          Community Gallery
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-300">No builds yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <MinecraftCard key={item.id} className="p-4">
                <img
                  src={item.imageUrl}
                  alt={item.caption || "Minecraft build"}
                  className="rounded-lg mb-3 w-full object-cover"
                />
                {item.caption && (
                  <p className="text-center text-gray-200">{item.caption}</p>
                )}
              </MinecraftCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
