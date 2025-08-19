export type ServerInfo = {
  host: string;
  displayHost: string;
  name: string;
  desc: string;
  comingSoon?: boolean;
};

export const servers: ServerInfo[] = [
  {
    host: "185.107.193.158:45126",
    displayHost: "N0_Nonsense.aternos.me:45126",
    name: "Survival Server",
    desc: "Classic survival with Create & Farmer's Delight",
  },
  {
    host: "",
    displayHost: "creative.zhoda.net",
    name: "Creative Server",
    desc: "Unleash your imagination in Creative mode with powerful build mods.",
    comingSoon: true,
  },
  {
    host: "",
    displayHost: "modded.zhoda.net",
    name: "Heavily Modded",
    desc: "Advanced gameplay with 50+ mods for endless adventures.",
    comingSoon: true,
  },
  {
    host: "",
    displayHost: "pvp.zhoda.net",
    name: "PvP Arena",
    desc: "Battle it out in fast-paced PvP combat arenas.",
    comingSoon: true,
  },
];
