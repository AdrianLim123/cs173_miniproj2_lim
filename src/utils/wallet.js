// TODO 2.a - Setup beacon wallet instance
import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
  name: "Mini project 2",
  preferredNetwork: "limanet",
});

export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "ghostnet" } });
};

export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  } else {
    return "";
  }
};
