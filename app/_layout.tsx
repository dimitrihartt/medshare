import '../global.css';
import { useEffect, useState } from 'react';
import { AppKit, AppKitProvider } from '@reown/appkit-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

type AppKitInstance = typeof import('../appKitConfig').appKit;

export default function RootLayout() {
  const [appKit, setAppKit] = useState<AppKitInstance | null>(null);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void import('../appKitConfig')
      .then(({ appKit: instance }) => {
        if (!cancelled) {
          setAppKit(instance);
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to initialize Reown AppKit.', error);

        if (!cancelled) {
          setInitializationError(
            error instanceof Error ? error.message : 'An unknown initialization error occurred.',
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (initializationError) {
    return (
      <SafeAreaProvider>
        <View style={styles.root}>
          <Text>Failed to initialize the wallet connection: {initializationError}</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  if (!appKit) {
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
