import { useEffect } from "react";
import useSWR from "swr";

const admins = {
  "0xeca010b3dd9b12535f7fcb6f06a4448beeda2140f779f663091d47a60d2c7b11": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    account: {
      data,
      isAdmin: (data && admins[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    },
  };
};
