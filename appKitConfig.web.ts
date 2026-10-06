import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, sepolia } from '@reown/appkit/networks';

let appKitInstance: ReturnType<typeof createAppKit> | null = null;

const projectId = 'c5fd096e7a355a9723e0266357b72db1';

function initializeAppKit() {
  if (appKitInstance) {
    return appKitInstance;
  }

  appKitInstance = createAppKit({
    adapters: [new EthersAdapter()],
    networks: [mainnet, sepolia],
    defaultNetwork: mainnet,
    projectId,
    metadata: {
      name: 'MedShare',
      description: 'MedShare web app',
      url: 'https://medshare.xyz',
      icons: [],
    },
    themeMode: 'light',
  });

  return appKitInstance;
}

export function getAppKit() {
  return initializeAppKit();
}
