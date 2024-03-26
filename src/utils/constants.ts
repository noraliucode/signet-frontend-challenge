export const APP_SESSION = "APP_SESSION";
export const DEFAULT_NETWORK = "ROCOCO";
export const NETWORK = "network";
export const ROCOCO = "wss://rococo-rpc.polkadot.io";
export const WESTEND = "wss://westend-rpc.polkadot.io";
export const KUSAMA = "wss://kusama-rpc.polkadot.io";
export const POLKADOT = "wss://rpc.polkadot.io";
export const KABOCHA = "wss://kabocha.jelliedowl.net";
export const SHIBUYA = "wss://rpc.shibuya.astar.network";
export const PURE_CREATED = "PureCreated";
const assetPath = "/assets/networks/";
export const NODE_ENDPOINT = {
  ROCOCO,
  WESTEND,
  KUSAMA,
  POLKADOT,
  KABOCHA,
  SHIBUYA,
};
export const DECIMALS = {
  ROCOCO: 12,
  WESTEND: 12,
  KUSAMA: 12,
  KABOCHA: 12,
  POLKADOT: 10,
  SHIBUYA: 18,
};
export const NETWORKS = [
  // { network: "KUSAMA", icon: `${assetPath}kusama.gif` },
  // { network: "POLKADOT", icon: `${assetPath}polkadot.svg` },
  { network: "ROCOCO", icon: `${assetPath}rococo.svg` },
  // { network: "WESTEND", icon: `${assetPath}westend.svg` },
  { network: "SHIBUYA", icon: `${assetPath}shibuya.png` },
];
