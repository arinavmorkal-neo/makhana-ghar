/**
 * ══════════════════════════════════════════════════════════════
 * Categories Screen — Makhana Varieties
 * ══════════════════════════════════════════════════════════════
 * Matches the website's brand aesthetics with hero banner & grade cards
 * ══════════════════════════════════════════════════════════════
 */
import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowRight, Sparkles } from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getCategories, resolveImageUrl, type Category } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const fallbackCategories = [
  {
    id: '1',
    name: '6+ Suta Jumbo Grade',
    slug: '6-suta-jumbo',
    icon: '👑',
    imageUrl: 'https://www.makhanaghar.in/6+.webp',
    description: 'Largest, flakiest premium grade for high-end retail, gifting and export.',
  },
  {
    id: '2',
    name: '5+ Suta Medium Grade',
    slug: '5-suta-medium',
    icon: '✨',
    imageUrl: 'https://www.makhanaghar.in/5+.webp',
    description: 'Popular choice for daily snacking, roasting, and commercial food service.',
  },
  {
    id: '3',
    name: '4+ Suta Standard Grade',
    slug: '4-suta-standard',
    icon: '🌿',
    imageUrl: 'https://www.makhanaghar.in/4+.webp',
    description: 'Crisp and nutritious round flakes, ideal for bulk processing & confectionery.',
  },
  {
    id: '4',
    name: 'Raw Makhana Flakes',
    slug: 'raw-flakes',
    icon: '📦',
    imageUrl: 'https://www.makhanaghar.in/banner2.webp',
    description: 'Wholesale raw flakes for industrial packaging and snack brands.',
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await getCategories({ limit: 50 });
      if (res.docs && res.docs.length > 0) {
        setCategories(res.docs);
      } else {
        setCategories(fallbackCategories as any);
      }
    } catch (e) {
      console.warn('Failed to load categories:', e);
      setCategories(fallbackCategories as any);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchData();
          }}
          tintColor={colors.primary}
        />
      }
    >
      <AppHeader showBack={true} />

      {/* ── HERO BANNER ── */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/banner1.webp' }}
          style={styles.heroBg}
          contentFit="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>Product Classification</Text>
          <Text style={styles.heroTitle}>CATEGORIES &amp; GRADES</Text>
          <View style={styles.heroRule} />
          <Text style={styles.heroBody}>
            Discover each distinct grade of Makhana produced and graded at
            Makhana Ghar with strict international standards.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          Makhana <Text style={styles.sectionTitleAccent}>Varieties</Text>
        </Text>
        <Text style={styles.sectionSub}>
          Click on any category to view all available products and grades
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View style={styles.grid}>
            {categories.map((cat: any) => {
              const imageUrl =
                resolveImageUrl(cat.imageUrl, cat.image, 'https://www.makhanaghar.in') ||
                'https://www.makhanaghar.in/4+.webp';

              return (
                <Pressable
                  key={cat.id}
                  style={styles.card}
                  onPress={() => router.push('/products')}
                >
                  <View style={styles.cardImageWrap}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.cardImage}
                      contentFit="cover"
                      transition={300}
                    />
                    <View style={styles.cardBadge}>
                      <Text style={styles.cardBadgeText}>{cat.icon || '🌿'}</Text>
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardName}>{cat.name}</Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>
                      {cat.description || 'Premium graded Makhana direct from Bihar.'}
                    </Text>

                    <View style={styles.cardActionRow}>
                      <Text style={styles.cardActionText}>Explore Products</Text>
                      <ArrowRight size={14} color="#2e7d32" />
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {/* Reusable Verified AppFooter */}
      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  // Hero
  heroSection: { height: 260, position: 'relative' },
  heroBg: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(26,46,18,0.88)',
    justifyContent: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: 36,
  },
  heroTag: { fontFamily: fonts.caveat, fontSize: 24, color: '#f5c842' },
  heroTitle: {
    fontFamily: fonts.bebas,
    fontSize: 28,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroRule: {
    width: 100,
    height: 3,
    backgroundColor: colors.accent,
    marginVertical: 6,
    borderRadius: 2,
  },
  heroBody: { fontFamily: fonts.dmSans, fontSize: 12, color: colors.textLight, lineHeight: 17 },

  content: { padding: spacing[4] },
  sectionTitle: { fontFamily: fonts.poppinsExtraBold, fontSize: 22, color: '#1a2e12' },
  sectionTitleAccent: { color: '#2e7d32' },
  sectionSub: { fontFamily: fonts.dmSans, fontSize: 12, color: '#777', marginTop: 2, marginBottom: spacing[4] },

  grid: { gap: spacing[4] },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm.rn,
  },
  cardImageWrap: {
    width: '100%',
    height: 160,
    position: 'relative',
    backgroundColor: '#fafdf9',
  },
  cardImage: { width: '100%', height: '100%' },
  cardBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(26,46,18,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBadgeText: { fontSize: 16 },

  cardBody: { padding: spacing[4] },
  cardName: { fontFamily: fonts.poppinsBold, fontSize: 16, color: '#1a2e12', marginBottom: 4 },
  cardDesc: { fontFamily: fonts.dmSans, fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 10 },
  cardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#f0ebe3',
    paddingTop: 8,
  },
  cardActionText: { fontFamily: fonts.poppinsBold, fontSize: 12, color: '#2e7d32' },
});
