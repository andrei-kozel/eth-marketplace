import { handler as createUseAccountHook } from "./useAccount";
import { handler as createNetorkHook } from "./useNetwork";

export const setupHooks = (...deps) => {
  return {
    useAccount: createUseAccountHook(...deps),
    useNetwork: createNetorkHook(...deps),
  };
};
