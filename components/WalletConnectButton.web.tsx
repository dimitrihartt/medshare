import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function WalletConnectButton() {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openWalletPicker = async () => {
    setConnecting(true);
    setError(null);

    try {
      const { getAppKit } = await import('../appKitConfig');
      const appKit = getAppKit();
      await appKit.open();
    } catch (cause) {
      console.error('Failed to open the web wallet picker.', cause);
      setError(cause instanceof Error ? cause.message : 'Unable to open the wallet picker.');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        disabled={connecting}
        onPress={() => void openWalletPicker()}
        style={styles.button}>
        <Text style={styles.buttonText}>
          {connecting ? 'Loading wallets...' : 'Connect Wallet'}
        </Text>
      </Pressable>
      {error ? <Text accessibilityRole="alert">{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 64,
    backgroundColor: '#ffffff',
    borderRadius: 36,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '600',
  },
});
