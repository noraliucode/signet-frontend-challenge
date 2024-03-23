import {
  InjectedExtension,
  InjectedAccountWithMeta,
} from "@polkadot/extension-inject/types";

export type IAccounts = InjectedAccountWithMeta[] | null;
export type INetwork = keyof ICreatorAddress;
export type IInjector = InjectedExtension | null;

export type ICreatorAddress = {
  ROCOCO: string;
  WESTEND: string;
  KUSAMA: string;
  POLKADOT: string;
};

export type IWeb3ConnectedContextState = {
  network: INetwork;
  accounts: IAccounts;
  signer: InjectedAccountWithMeta | null;
  injector: IInjector;
  setSigner: (value: InjectedAccountWithMeta | null) => void;
  setNetwork: (value: string) => any;
  selectedWallet: string;
  setSelectedWallet: (value: string) => any;
};

export type IWallet = {
  name: string;
  icon: string;
  url: string;
  text: string;
  isInstalled: boolean;
};

export const WALLETS = [
  {
    name: "subwallet-js",
    icon: "/assets/wallets/subwallet.svg",
    url: "https://subwallet.app/",
  },
  {
    name: "polkadot-js",
    icon: "/assets/wallets/polkadot.svg",
    url: "https://polkadot.js.org/extension/",
  },
  {
    name: "talisman",
    icon: "/assets/wallets/talisman.svg",
    url: "https://www.talisman.xyz/",
  },
];

type AnonymousData = {
  pure: string;
  who: string;
};

export type AnonymousEvent = {
  data: AnonymousData;
};
