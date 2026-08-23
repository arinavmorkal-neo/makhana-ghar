/**
 * About Us Screen
 */
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getFounders, getSettings, resolveImageUrl, type Founder, type Settings } from '@makhana-ghar/core';

export default function AboutScreen() {
  const router = useRouter();
  const [founders, setFounders] = useState<Founder[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFounders(), getSettings()])
      .then(([fRes, sRes]) => { setFounders(fRes.docs); setSettings(sRes); })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>About Us</Text>
        <Text style={styles.headerSub}>{settings?.tagline || 'From Bihar to the World'}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.body}>
          Makhana Ghar is a premium Makhana manufacturer, wholesaler and exporter from Bihar, India.
          We source directly from the farmers of Bihar, ensuring the highest quality fox nuts for
          domestic and international markets.
        </Text>

        {founders.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: spacing[8] }]}>Our Founders</Text>
            {founders.map((founder) => {
              const imageUrl = resolveImageUrl(founder.imageUrl, founder.image, 'https://www.makhanaghar.in');
              return (
                <View key={founder.id} style={styles.founderCard}>
                  {imageUrl && (
                    <Image source={{ uri: imageUrl }} style={styles.founderImage} contentFit="cover" transition={300} />
                  )}
                  <View style={styles.founderInfo}>
                    <Text style={styles.founderName}>{founder.name}</Text>
                    {founder.title && <Text style={styles.founderTitle}>{founder.title}</Text>}
                    {founder.bio && <Text style={styles.founderBio}>{founder.bio}</Text>}
                  </View>
                </View>
              );
            })}
          </>
        )}
      </View>

      <View style={{ height: spacing[20] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  header: { backgroundColor: colors.primaryDeep, paddingTop: 54, paddingBottom: spacing[6], paddingHorizontal: spacing[5] },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing[3] },
  headerTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.white },
  headerSub: { fontSize: typography.sizes.md, color: colors.textLight, marginTop: spacing[1] },
  content: { padding: spacing[5] },
  sectionTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textDark, marginBottom: spacing[4] },
  body: { fontSize: typography.sizes.md, color: colors.textMuted, lineHeight: 24 },
  founderCard: { flexDirection: 'row', gap: spacing[4], backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing[4], ...shadows.sm.rn, marginBottom: spacing[4] },
  founderImage: { width: 80, height: 80, borderRadius: 40 },
  founderInfo: { flex: 1 },
  founderName: { fontSize: typography.sizes.body, fontWeight: typography.weights.bold, color: colors.textDark },
  founderTitle: { fontSize: typography.sizes.base, color: colors.primary, marginTop: 2 },
  founderBio: { fontSize: typography.sizes.base, color: colors.textMuted, marginTop: spacing[2], lineHeight: 20 },
});
