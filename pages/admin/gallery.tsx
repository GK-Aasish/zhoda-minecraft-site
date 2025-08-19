import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminGallery() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  // Protect admin route
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "superadmin") {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  // Fetch gallery items
  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("/api/gallery");
      setItems(res.data);
    };
    fetchItems();
  }, []);

  // Add new item
  const addItem = async () => {
    if (!imageUrl) return alert("Please upload or paste an image URL");
    const res = await axios.post("/api/admin/gallery", { imageUrl, caption });
    setItems([res.data, ...items]);
    setImageUrl("");
    setCaption("");
  };

  // Delete item
  const deleteItem = async (id: string) => {
    await axios.delete("/api/admin/gallery", { data: { id } });
    setItems(items.filter((i) => i.id !== id));
  };

  // Upload file to API (Cloudinary/local)
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }

    setUploading(false);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session || session.user?.role !== "superadmin") return null;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl text-yellow-400 mb-6">Manage Gallery</h1>

      {/* Add new image */}
      <div className="mb-8 space-y-2">
        <input
          type="text"
          placeholder="Paste Image URL or Upload Below"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {uploading && <p className="text-sm text-gray-400">Uploading...</p>}

        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <button
          onClick={addItem}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
        >
          Add to Gallery
        </button>
      </div>

      {/* List existing images */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-gray-900 p-4 rounded">
            <img
              src={item.imageUrl}
              alt={item.caption}
              className="mb-2 rounded w-full object-cover"
            />
            <p>{item.caption}</p>
            <button
              onClick={() => deleteItem(item.id)}
              className="mt-2 px-3 py-1 bg-red-500 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
