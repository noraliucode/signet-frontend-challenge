import { InjectedExtension } from "@polkadot/extension-inject/types";
import { AnonymousEvent, ProxyAccount } from "./types";
import { APIService } from "../services/apiService";
import { removeComma } from "./helpers";
import { ApiPromise } from "@polkadot/api";

export const createPure = async (
  api: ApiPromise | null,
  sender: string,
  injector: InjectedExtension,
  setLoading: (_: boolean) => void,
  setMessage?: (_: string) => void
): Promise<ProxyAccount | undefined> => {
  try {
    if (!api) return;
    const apiService = new APIService(api);
    setLoading && setLoading(true);
    let real = sender;
    const delay = 0;
    const bal = (await apiService.getBalance(sender)).toString();
    const proxyDepositBase: any = await apiService.getProxyDepositBase();
    const formattedProxyDepositBase = removeComma(proxyDepositBase.toString());

    console.log("ceate pure proxy...");

    // proxyDepositBase is only for the first time creating proxy
    if (proxyDepositBase && Number(bal) < Number(formattedProxyDepositBase)) {
      setMessage && setMessage("Insufficient Balance!");
      setTimeout(() => {
        setLoading && setLoading(false);
      }, 2000);
      return;
    }
    const proxyData = (await apiService.createPureProxy(
      sender,
      injector,
      delay
    )) as AnonymousEvent;
    const { pure, who } = proxyData.data;
    real = pure;

    const balance = await apiService.getBalance(pure);

    console.log("pure proxy >>", real);

    const _callBack = async () => {
      setLoading && setLoading(false);
    };

    _callBack();
    return {
      address: real,
      balance: balance.toString(),
    };
  } catch (error) {
    console.error("createPure error >>", error);
    setLoading && setLoading(false);
  }
};
