import { ApiPromise } from "@polkadot/api";

import { PURE_CREATED } from "../utils/constants";
class APIService {
  api: ApiPromise;
  constructor(api: ApiPromise) {
    this.api = api;
  }

  createPureProxy = async (sender: string, injector: any, delay = 0) => {
    let promise = new Promise((resolve, reject) => {
      this.api.tx.proxy
        .createPure("any", delay, 0)
        .signAndSend(
          sender,
          { signer: injector.signer },
          ({ status, events = [] }) => {
            if (status.isInBlock) {
              const pureCreatedEvent = events.find((x) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const event = x.toHuman().event?.valueOf();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return event.method === PURE_CREATED;
              });

              resolve(pureCreatedEvent?.toHuman().event?.valueOf());
            }
          }
        );
    });

    const pureCreatedEvent = await promise;
    return pureCreatedEvent;
  };

  getProxies = async (address?: string) => {
    let promise = new Promise((resolve, reject) => {
      this.api.query.proxy.proxies
        .entries(async (nodes: any) => {
          if (address) {
            const proxyNodes = nodes.filter((node: any) => {
              return node[1].toHuman()[0][0].delegate === address;
            });
            resolve(proxyNodes);
          } else {
            resolve(nodes);
          }
        })
        .catch((error) => {
          console.log("getProxies error: ", error);
        });
    });

    const proxyNodes = await promise;
    return proxyNodes;
  };

  getBalance = async (address: string) => {
    const { parentHash } = await this.api.rpc.chain.getHeader();
    const apiAt = await this.api.at(parentHash);
    const balance = await apiAt.query.system.account(address);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignores
    return balance.data.free;
  };

  getProxyDepositBase = () => {
    return this.api.consts.proxy.proxyDepositBase.toHuman();
  };
}

export { APIService };
