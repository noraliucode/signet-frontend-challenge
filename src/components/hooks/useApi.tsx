import { useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { NODE_ENDPOINT } from "../../utils/constants";
import { INetwork } from "../../utils/types";

interface IState {
  api: ApiPromise | null;
}

export const useApi = (network: INetwork) => {
  const [state, setState] = useState<IState>({
    api: null,
  });

  const createApiObj = async () => {
    try {
      const wsProvider = new WsProvider(NODE_ENDPOINT[network]);
      const api = await ApiPromise.create({ provider: wsProvider });

      setState((prev) => ({
        ...prev,
        api,
      }));
    } catch (error) {
      console.error("createApiObj error", error);
    }
  };
  useEffect(() => {
    createApiObj();
  }, [network]);
  return { ...state };
};
