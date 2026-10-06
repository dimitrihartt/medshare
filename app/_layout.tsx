import '../global.css';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

type AppKitInstance = typeof import('../appKitConfig').appKit;
type AppKitComponent = React.ComponentType<Record<string, unknown>>;
type AppKitProviderComponent = React.ComponentType<{
  instance: AppKitInstance;
  children: React.ReactNode;
}>;

export default function RootLayout() {
  const isWeb = Platform.OS === 'web';
  const [appKit, setAppKit] = useState<AppKitInstance | null>(null);
  const [AppKit, setAppKitComponent] = useState<AppKitComponent | null>(null);
  const [AppKitProvider, setAppKitProviderComponent] =
    useState<AppKitProviderComponent | null>(null);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    if (isWeb) {
      return;
    }

    let cancelled = false;

    void Promise.all([
      import('@reown/appkit-react-native'),
      import('../appKitConfig'),
    ])
      .then(([appKitModule, { appKit: instance }]) => {
        if (cancelled) {
          return;
        }

        setAppKit(instance);
        setAppKitComponent(appKitModule.AppKit);
        setAppKitProviderComponent(appKitModule.AppKitProvider);
      })
      .catch((error: unknown) => {
        console.error('Failed to initialize Reown AppKit.', error);

        if (!cancelled) {
          setInitializationError(
            error instanceof Error ? error.message : 'An unknown initialization error occurred.'
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isWeb]);

  if (isWeb) {
    return (
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    );
  }

  if (initializationError) {
    return (
      <SafeAreaProvider>
        <View style={styles.root}>
          <Text>Failed to initialize the wallet connection: {initializationError}</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  if (!appKit || !AppKit || !AppKitProvider) {
    return (
      <View style={styles.root}>
        <Text>Loading wallet connection...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppKitProvider instance={appKit}>
        <View style={styles.root}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
            <AppKit />
          </View>
        </View>
      </AppKitProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
