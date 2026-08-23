/**
 * Home Screen — Hero + Featured Products + Stats
 * Matches the website's homepage layout
 */
import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import {
  getProducts,
  getCategories,
  resolveImageUrl,
  type Product,
  type Category,
} from '@makhana-ghar/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing[4] * 3) / 2;

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts({ limit: 6 }),
        getCategories({ limit: 10 }),
      ]);
      setProducts(productsRes.docs);
      setCategories(categoriesRes.docs);
    } catch (err) {
      console.warn('Failed to fetch home data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading Makhana Ghar...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Hero Section ── */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/banner1.webp' }}
          style={styles.heroImage}
          contentFit="cover"
          transition={600}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>🌿 From Bihar to the World</Text>
          <Text style={styles.heroTitle}>PREMIUM{'\n'}MAKHANA</Text>
          <Text style={styles.heroBody}>
            Sourced directly from the farms of Bihar — pure, organic, premium quality fox nuts.
          </Text>
          <View style={styles.heroButtons}>
            <Pressable
              style={styles.heroCta}
              onPress={() => router.push('/products')}
            >
              <Text style={styles.heroCtaText}>View Products</Text>
            </Pressable>
            <Pressable
              style={styles.heroWhatsapp}
              onPress={() => Linking.openURL('https://wa.me/919876543210')}
            >
              <Text style={styles.heroWhatsappText}>💬 WhatsApp</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ── Featured Products ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTag}>✨ Our Best Sellers</Text>
        <Text style={styles.sectionTitle}>Premium Makhana Grades</Text>
        <Text style={styles.sectionSubtitle}>
          Handpicked, graded and packed with care for wholesale buyers
        </Text>

        <View style={styles.productGrid}>
          {products.map((product) => {
            const imageUrl = resolveImageUrl(
              product.mainImageUrl,
              product.mainImage,
              'https://www.makhanaghar.in',
            );

            return (
              <Pressable
                key={product.id}
                style={styles.productCard}
                onPress={() => router.push(`/product/${product.slug}` as never)}
              >
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.productImage}
                    contentFit="cover"
                    transition={300}
                  />
                )}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  {product.grade && (
                    <View style={styles.gradeBadge}>
                      <Text style={styles.gradeBadgeText}>{product.grade}</Text>
                    </View>
                  )}
                  {product.isOrganic && (
                    <Text style={styles.organicBadge}>🌿 Organic</Text>
                  )}
                  {product.rating !== undefined && (
                    <Text style={styles.rating}>
                      ⭐ {product.rating.toFixed(1)}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={styles.viewAllBtn}
          onPress={() => router.push('/products')}
        >
          <Text style={styles.viewAllText}>View All Products →</Text>
        </Pressable>
      </View>

      {/* ── Categories ── */}
      {categories.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
            {categories.map((cat) => (
              <Pressable
                key={cat.id}
                style={styles.categoryPill}
                onPress={() => router.push('/categories')}
              >
                <Text style={styles.categoryIcon}>{cat.icon || '📦'}</Text>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* ── CTA Section ── */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Order?</Text>
        <Text style={styles.ctaBody}>
          Get wholesale prices directly from the manufacturer
        </Text>
        <Pressable
          style={styles.ctaButton}
          onPress={() => router.push('/enquiry' as never)}
        >
          <Text style={styles.ctaButtonText}>Send Enquiry</Text>
        </Pressable>
      </View>

      {/* ── Footer spacing ── */}
      <View style={{ height: spacing[20] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing[16] },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  loadingText: { marginTop: spacing[3], fontSize: typography.sizes.md, color: colors.textMuted },

  // Hero
  hero: { height: 420, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(26,46,18,0.70)',
    justifyContent: 'flex-end',
    padding: spacing[6],
    paddingBottom: spacing[10],
  },
  heroTag: {
    fontSize: typography.sizes.lg,
    color: colors.accentWarm,
    fontWeight: typography.weights.bold,
    marginBottom: spacing[2],
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: typography.weights.black,
    color: colors.white,
    letterSpacing: typography.letterSpacing.widest,
    textTransform: 'uppercase',
    lineHeight: 42,
    marginBottom: spacing[3],
  },
  heroBody: {
    fontSize: typography.sizes.body,
    color: colors.textLight,
    lineHeight: 24,
    marginBottom: spacing[5],
    maxWidth: 320,
  },
  heroButtons: { flexDirection: 'row', gap: spacing[3] },
  heroCta: {
    backgroundColor: colors.accent,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: radii.full,
  },
  heroCtaText: { color: colors.textDark, fontWeight: typography.weights.bold, fontSize: typography.sizes.base },
  heroWhatsapp: {
    backgroundColor: colors.whatsapp,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: radii.full,
  },
  heroWhatsappText: { color: colors.white, fontWeight: typography.weights.bold, fontSize: typography.sizes.base },

  // Section
  section: { paddingHorizontal: spacing[4], paddingTop: spacing[8] },
  sectionTag: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  sectionTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.black,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  sectionSubtitle: {
    fontSize: typography.sizes.md,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: 22,
  },

  // Product grid
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    overflow: 'hidden',
    ...shadows.md.rn,
    marginBottom: spacing[2],
  },
  productImage: { width: '100%', height: CARD_WIDTH * 1.1 },
  productInfo: {
    padding: spacing[3],
    backgroundColor: 'rgba(26,46,18,0.92)',
  },
  productName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.white,
    marginBottom: spacing[1],
  },
  gradeBadge: {
    backgroundColor: 'rgba(245,200,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245,200,0,0.35)',
    borderRadius: radii['3xl'],
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: spacing[1],
  },
  gradeBadgeText: {
    fontSize: 9,
    fontWeight: typography.weights.semibold,
    color: colors.accent,
    letterSpacing: 0.3,
  },
  organicBadge: {
    fontSize: typography.sizes.xs,
    color: '#8bc34a',
    marginBottom: spacing[1],
  },
  rating: {
    fontSize: typography.sizes.xs,
    color: colors.accentWarm,
  },

  viewAllBtn: {
    marginTop: spacing[5],
    alignSelf: 'center',
    backgroundColor: colors.primaryDeep,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[8],
    borderRadius: radii.sm,
  },
  viewAllText: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.md,
  },

  // Categories
  categoriesRow: { paddingHorizontal: spacing[1], gap: spacing[3] },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: colors.surface,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm.rn,
  },
  categoryIcon: { fontSize: typography.sizes.lg },
  categoryName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.textDark,
  },

  // CTA
  ctaSection: {
    marginHorizontal: spacing[4],
    marginTop: spacing[10],
    backgroundColor: colors.primaryDeep,
    borderRadius: radii.xl,
    padding: spacing[8],
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.black,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  ctaBody: {
    fontSize: typography.sizes.md,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[10],
    borderRadius: radii.full,
  },
  ctaButtonText: {
    color: colors.textDark,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.body,
  },
});
