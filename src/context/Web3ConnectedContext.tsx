import { createContext, useContext, useEffect, useState } from "react";
import {
  web3Accounts,
  web3AccountsSubscribe,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { IInjector, IWeb3ConnectedContextState } from "../utils/types";
import { APP_SESSION, DEFAULT_NETWORK, NETWORK } from "../utils/constants";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface IProps {
  children?: React.ReactElement;
}

const SIGNER = "signer";
const SELECTED_WALLET = "selectedWallet";

const Web3ConnectedContext = createContext<IWeb3ConnectedContextState>(null!);
const useWeb3ConnectedContext = () => useContext(Web3ConnectedContext);

const Web3ConnectedContextProvider: React.FC<IProps> = ({ children }) => {
  const setValue = (
    value: string | InjectedAccountWithMeta | boolean | null,
    key: string
  ) => {
    setState((prev: IWeb3ConnectedContextState) => ({ ...prev, [key]: value }));
  };
  const [state, setState] = useState<IWeb3ConnectedContextState>({
    network: DEFAULT_NETWORK,
    accounts: null,
    signer: null,
    injector: null,
    setSigner: (value) => setValue(value, SIGNER),
    setNetwork: (value) => setValue(value, NETWORK),
    selectedWallet: "",
    setSelectedWallet: (value) => setValue(value, SELECTED_WALLET),
  });
  const {
    network,
    accounts,
    signer,
    injector,
    setSigner,
    setNetwork,
    selectedWallet,
    setSelectedWallet,
  } = state;

  const connector = localStorage.getItem(APP_SESSION);
  let allAccounts = [] as any;
  let extensions = [] as any;

  const getAccounts = async () => {
    try {
      extensions = await web3Enable("signet-frontend-challenge");

      const _selectedWallet = connector
        ? JSON.parse(connector).connected
        : selectedWallet;

      const _allAccounts = await web3Accounts();

      await web3AccountsSubscribe((injectedAccounts) => {
        allAccounts = injectedAccounts.filter(
          (account) => account.meta.source === _selectedWallet
        );
        setState((prev) => ({ ...prev, accounts: allAccounts }));
      });

      allAccounts = _allAccounts.filter(
        (account) => account.meta.source === _selectedWallet
      );

      if (connector && allAccounts && allAccounts.length > 0 && !signer) {
        setSigner(allAccounts[JSON.parse(connector).accountIndex]);
      }

      let injector: IInjector = null;
      if (signer) {
        injector = await web3FromAddress(signer.address);
      }

      setState((prev) => ({ ...prev, accounts: allAccounts, injector }));
    } catch (error) {
      console.error("Web3ConnectedContextProvider error", error);
    }
  };

  const updateInjector = async () => {
    if (!signer) return;
    const _injector = await web3FromAddress(signer.address);

    setState((prev) => ({ ...prev, injector: _injector }));
  };

  useEffect(() => {
    updateInjector();
  }, [signer]);

  useEffect(() => {
    getAccounts();
  }, [network, selectedWallet]);

  const value = {
    network,
    accounts,
    signer,
    injector,
    setSigner,
    setNetwork,
    selectedWallet,
    setSelectedWallet,
  };

  return (
    <Web3ConnectedContext.Provider value={value}>
      {children}
    </Web3ConnectedContext.Provider>
  );
};

export { Web3ConnectedContextProvider, useWeb3ConnectedContext };
