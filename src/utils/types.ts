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
