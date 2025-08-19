import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function MinecraftButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "minecraft-font px-6 py-3 border-4 border-black shadow-[4px_4px_0_#000] bg-[url('/textures/planks.png')] hover:scale-105 transition-transform enchant-glint crack-effect",
        className
      )}
    >
      {children}
    </button>
  );
}
