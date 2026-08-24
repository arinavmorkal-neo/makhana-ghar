import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

interface AppHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export function AppHeader({ showBack, onBack }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.cleanHeader}>
        <Pressable onPress={() => router.push('/')} style={styles.logoWrap}>
          <Image
            source={{ uri: 'https://www.makhanaghar.in/logo.webp' }}
            style={styles.cleanHeaderLogo}
            contentFit="contain"
            priority="high"
          />
        </Pressable>
      </View>

      {/* ══ DECORATIVE ROUGH PAPER EDGE — page-title-top.webp ══ */}
      <View style={styles.headerEdge} pointerEvents="none">
        <Image
          source={{ uri: 'https://www.makhanaghar.in/page-title-top.webp' }}
          style={styles.headerEdgeImg}
          contentFit="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    zIndex: 50,
    backgroundColor: '#ffffff',
  },
  cleanHeader: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 6 : 6,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cleanHeaderLogo: {
    width: 215,
    height: 70,
  },
  headerEdge: {
    width: '100%',
    height: 14,
    marginTop: -2,
    marginBottom: -6,
    zIndex: 20,
  },
  headerEdgeImg: {
    width: '100%',
    height: '100%',
  },
});
