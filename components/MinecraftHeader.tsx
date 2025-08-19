import React from "react";
import Link from "next/link";

export default function MinecraftHeader() {
  return (
    <header className="py-8 text-center">
      <h1 className="minecraft-font text-6xl text-yellow-400 drop-shadow-md mb-6">
        ZHODA
      </h1>
      <nav className="flex justify-center gap-8 minecraft-font text-lg">
        <Link href="/" className="hover:text-yellow-300">HOME</Link>
        <Link href="/server-ip" className="hover:text-yellow-300">SERVER IP</Link>
        <Link href="/required-mods" className="hover:text-yellow-300">REQUIRED MODS</Link>
        <Link href="/gallery" className="hover:text-yellow-300">GALLERY</Link>
        <a href="/admin" className="hover:text-yellow-300">ADMIN</a>
      </nav>
    </header>
  );
}
