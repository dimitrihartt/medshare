import '@walletconnect/react-native-compat';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { EthersAdapter } from '@reown/appkit-ethers-react-native';
import { createAppKit, type AppKitNetwork, type Storage } from '@reown/appkit-react-native';

const projectId = 'c5fd096e7a355a9723e0266357b72db1';

const ethereumMainnet: AppKitNetwork = {
  id: 1,
  name: 'Ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://cloudflare-eth.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:1',
};

const storage: Storage = {
  getKeys: async () => [...(await AsyncStorage.getAllKeys())],
  getEntries: async <T>() => {
    const keys = await AsyncStorage.getAllKeys();
    const entries = await AsyncStorage.multiGet(keys);

    return entries.flatMap(([key, value]) =>
      value === null ? [] : [[key, JSON.parse(value) as T]],
    );
  },
  getItem: async <T>(key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value === null ? undefined : (JSON.parse(value) as T);
  },
  setItem: async <T>(key: string, value: T) => {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) {
      throw new TypeError(`AppKit storage value for "${key}" is not serializable.`);
    }

    await AsyncStorage.setItem(key, serialized);
  },
  removeItem: (key) => AsyncStorage.removeItem(key),
};

export const appKit = createAppKit({
  projectId,
  metadata: {
    name: 'MedShare',
    description: 'MedShare mobile app',
    url: 'https://medshare.xyz',
    icons: [],
    redirect: {
      native: 'medshare://',
    },
  },
  adapters: [new EthersAdapter()],
  networks: [ethereumMainnet],
  defaultNetwork: ethereumMainnet,
  storage,
  themeMode: 'light',
});
