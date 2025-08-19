import React from "react";
import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function MinecraftCard({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "minecraft-font p-6 rounded-lg border-4 border-black shadow-[4px_4px_0_#000] bg-[url('/textures/grass.png')] enchant-glint",
        className
      )}
    >
      {children}
    </div>
  );
}
