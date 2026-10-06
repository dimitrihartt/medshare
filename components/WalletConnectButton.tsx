import { useAppKit } from '@reown/appkit-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function WalletConnectButton() {
  const { open } = useAppKit();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openWalletPicker = async () => {
    setConnecting(true);
    setError(null);

    try {
      await open();
    } catch (cause) {
      console.error('Failed to open the mobile wallet picker.', cause);
      setError(cause instanceof Error ? cause.message : 'Unable to open the wallet picker.');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        disabled={connecting}
        onPress={() => void openWalletPicker()}
        style={styles.button}>
        <Text style={styles.buttonText}>
          {connecting ? 'Loading wallets...' : 'Connect Wallet'}
        </Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
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
  error: {
    marginTop: 8,
    color: '#ffb4ab',
    textAlign: 'center',
  },
});
