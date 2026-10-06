import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RadialGradient, Rect, Stop, Svg, Defs } from 'react-native-svg';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { WalletConnectButton } from './WalletConnectButton';

const features = [
  { icon: 'heart-pulse' as const, label: 'Care' },
  { icon: 'file-document-outline' as const, label: 'Records' },
  { icon: 'account-group-outline' as const, label: 'Share' },
];

export function WelcomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const titleSize = Math.min(68, Math.max(40, width * 0.085));

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Svg
        pointerEvents="none"
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}
        viewBox="0 0 100 100">
        <Defs>
          <RadialGradient id="bottomGlow" cx="50%" cy="86%" r="70%">
            <Stop offset="0" stopColor="#8d19ff" stopOpacity="0.88" />
            <Stop offset="0.5" stopColor="#4b137f" stopOpacity="0.54" />
            <Stop offset="1" stopColor="#09040d" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="topGlow" cx="100%" cy="4%" r="55%">
            <Stop offset="0" stopColor="#410b72" stopOpacity="0.5" />
            <Stop offset="1" stopColor="#09040d" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100" height="100" fill="#050407" />
        <Rect width="100" height="100" fill="url(#bottomGlow)" />
        <Rect width="100" height="100" fill="url(#topGlow)" />
      </Svg>

      <View style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <MaterialCommunityIcons name="plus" size={19} color="#6514a4" />
            </View>
            <Text style={styles.brandName}>MedShare</Text>
          </View>
          <View style={styles.moreButton} accessibilityElementsHidden>
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#ffffff" />
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleSize * 1.04 }]}>
            Your family&apos;s{'\n'}healthcare plan
          </Text>
          <Text style={styles.description}>
            MedShare is a healthcare platform based on consortium powered by Ethereum
          </Text>

          <View style={styles.features}>
            {features.map(({ icon, label }) => (
              <View key={label} style={styles.feature}>
                <View style={styles.featureIcon}>
                  <MaterialCommunityIcons name={icon} size={22} color="#ffffff" />
                </View>
                <Text style={styles.featureLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <WalletConnectButton />
          <Text style={styles.version}>v.1.1.1</Text>
        </View>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={styles.footerBrand}>
            <View style={styles.footerMark}>
              <MaterialCommunityIcons name="plus" size={18} color="#ffffff" />
            </View>
            <Text style={styles.footerName}>MedShare</Text>
          </View>
          <Text style={styles.footerCaption}>POWERED BY ETHEREUM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050407',
  },
  page: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  brandName: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  moreButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 32,
  },
  title: {
    maxWidth: 720,
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: -2.1,
  },
  description: {
    maxWidth: 680,
    marginTop: 28,
    color: '#a7a3ac',
    fontSize: 18,
    lineHeight: 27,
  },
  features: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 560,
    marginTop: 30,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  featureLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 18,
    paddingBottom: 30,
  },
  version: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: 'rgba(35,33,38,0.94)',
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  footerMark: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#851cff',
  },
  footerName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerCaption: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
});
