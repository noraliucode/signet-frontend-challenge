import { Keyring } from "@polkadot/api";
import type {
  AccountId,
  AccountIndex,
  Address,
} from "@polkadot/types/interfaces";
import config from "./ss58-registry.json";

export function toShortAddress(
  _address?: AccountId | AccountIndex | Address | string | null | Uint8Array,
  number = 5
): string {
  const address = (_address || "").toString();

  return address.length > 13
    ? `${address.slice(0, number)}…${address.slice(number * -1 + 1)}`
    : address;
}

export const renderAddress = (
  address: string,
  network: string,
  number?: number
) => {
  if (!address) return "";
  const keyring = new Keyring();
  const registry = config.registry.find(
    (x) => x.network.toLowerCase() === network.toLowerCase()
  );
  const encodedAddress = keyring.encodeAddress(address, registry?.prefix);
  if (number) {
    return toShortAddress(encodedAddress, number);
  } else {
    return encodedAddress;
  }
};
