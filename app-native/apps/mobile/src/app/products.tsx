/**
 * ══════════════════════════════════════════════════════════════
 * Products / Categories Catalog Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website /categories page:
 * - Hero banner with Caveat tag + title underline
 * - Dynamic Category Filter Pills ("All Products", "4+ Suta", "5+ Suta", "6+ Suta")
 * - Product cards with Grade badge, star rating, and View Details arrow
 * - Custom grades & bulk orders bottom banner
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
import { ArrowRight, Phone, Star } from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getProducts, resolveImageUrl, type Product } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_CARD_WIDTH = (SCREEN_WIDTH - 44) / 2;

const fallbackProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium 4 Sutta Raw Makhana',
    slug: '4-suta-round-makhana-flake',
    grade: '4 SUTTA',
    category: '4 Sutta',
    isOrganic: true,
    rating: 4.8,
    reviews: 125,
    mainImageUrl: 'https://www.makhanaghar.in/4+.webp',
    description: '4 Sutta Raw Makhana Makhana Ghar 4 Sutta Raw Makhana is...',
  },
  {
    id: 'prod-2',
    name: 'Premium 4+ Sutta Raw Makhana',
    slug: '4-plus-suta-raw-makhana',
    grade: '4+ SUTTA',
    category: '4+ Sutta',
    isOrganic: true,
    rating: 4.9,
    reviews: 180,
    mainImageUrl: 'https://www.makhanaghar.in/4+.webp',
    description: 'Premium 4+ Sutta Raw Makhana, carefully selected for...',
  },
  {
    id: 'prod-3',
    name: 'Premium 5+ Sutta Raw Makhana',
    slug: '5-suta-medium-grade-makhana',
    grade: '5+ SUTTA',
    category: '5+ Sutta',
    isOrganic: true,
    rating: 4.9,
    reviews: 210,
    mainImageUrl: 'https://www.makhanaghar.in/5+.webp',
    description: 'Medium grade 5+ Sutta Makhana with high puff count...',
  },
  {
    id: 'prod-4',
    name: 'Premium 6+ Sutta Jumbo Makhana',
    slug: '6-suta-jumbo-grade-makhana',
    grade: '6+ SUTTA',
    category: '6+ Sutta',
    isOrganic: true,
    rating: 5.0,
    reviews: 340,
    mainImageUrl: 'https://www.makhanaghar.in/6+.webp',
    description: 'Supreme 6+ Sutta Jumbo Grade — largest diameter flakes...',
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await getProducts({ limit: 50 });
      if (res && res.docs && res.docs.length > 0) {
        setProducts(res.docs);
      } else {
        setProducts(fallbackProducts);
      }
    } catch (e) {
      console.warn('Failed to load products, using fallback:', e);
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Standard categories matching user screenshot
  const categories = [
    { key: 'all', label: 'All Products' },
    { key: '4-sutta', label: '4 Sutta', filterVal: '4' },
    { key: '4-plus-sutta', label: '4+ Sutta', filterVal: '4+' },
    { key: '5-plus-sutta', label: '5+ Sutta', filterVal: '5+' },
    { key: '6-plus-sutta', label: '6+ Sutta', filterVal: '6+' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => {
          const matchCat = categories.find((c) => c.key === activeCategory);
          const filter = matchCat?.filterVal || activeCategory;
          const grade = (p.grade || '').toLowerCase();
          const name = (p.name || '').toLowerCase();
          return (
            grade.includes(filter.toLowerCase()) ||
            name.includes(filter.toLowerCase())
          );
        });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
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
      showsVerticalScrollIndicator={false}
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
          <Text style={styles.heroTag}>Explore</Text>
          <Text style={styles.heroTitle}>OUR PRODUCTS</Text>
          <View style={styles.heroRule} />
          <Text style={styles.heroBody}>
            Browse our curated collection of premium Makhana — sourced directly
            from the farms of Bihar, hand-sorted for quality, and packed with
            freshness.
          </Text>
        </View>

        {/* Decorative White Grass Edge Image */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grassnew-white.png' }}
          style={styles.heroGrass}
          contentFit="cover"
        />
      </View>

      {/* ── BROWSE BY CATEGORY HEADER (Matching User Screenshot) ── */}
      <View style={styles.catalogHeader}>
        <Text style={styles.catalogTitle}>Browse by Category</Text>
        <Text style={styles.catalogSubtitle}>
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'} found
        </Text>
      </View>

      {/* ── CATEGORY FILTER PILLS ── */}
      <View style={styles.filtersWrap}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <Pressable
              key={cat.key}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              onPress={() => setActiveCategory(cat.key)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  isActive && styles.filterPillTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* ── PRODUCT CARDS (2-Column Grid Matching User Screenshot) ── */}
      <View style={styles.productList}>
        {filteredProducts.map((product) => {
          const imageUrl =
            resolveImageUrl(
              product.mainImageUrl,
              product.mainImage,
              'https://www.makhanaghar.in'
            ) || 'https://www.makhanaghar.in/4+.webp';

          // Extract size tag from grade or name (e.g. "4 size", "4+ size", "5+ size", "6+ size")
          const sizeTag = product.grade
            ? `${product.grade.replace(/sutta|suta/gi, '').trim().toLowerCase()} size`
            : '4+ size';

          return (
            <View key={product.id} style={styles.card}>
              {/* Image & Grade Badges */}
              <Pressable
                style={styles.cardImageWrap}
                onPress={() => router.push(`/product/${product.slug}` as never)}
              >
                {product.grade && (
                  <View style={styles.gradeBadge}>
                    <Text style={styles.gradeBadgeText}>{product.grade}</Text>
                  </View>
                )}
                <Text style={styles.topSizeText}>{sizeTag}</Text>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.cardImage}
                  contentFit="contain"
                  transition={300}
                />
              </Pressable>

              {/* Card Body */}
              <View style={styles.cardBody}>
                <View style={styles.organicPill}>
                  <Text style={styles.organicText}>Organic</Text>
                </View>

                <Pressable
                  onPress={() =>
                    router.push(`/product/${product.slug}` as never)
                  }
                >
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {product.name}
                  </Text>
                </Pressable>

                {product.description && (
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {product.description}
                  </Text>
                )}

                {/* Rating with 5 Gold Stars */}
                <View style={styles.ratingRow}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={10}
                        color="#f5a623"
                        fill="#f5a623"
                      />
                    ))}
                  </View>
                  <Text style={styles.ratingText}>
                    {(product.rating || 4.8).toFixed(1)} ({product.reviews || 125}{' '}
                    reviews)
                  </Text>
                </View>

                {/* Bottom Actions: View Details + Send Enquiry Button */}
                <View style={styles.cardActionRow}>
                  <Pressable
                    style={styles.viewDetailsBtn}
                    onPress={() =>
                      router.push(`/product/${product.slug}` as never)
                    }
                  >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                    <ArrowRight size={11} color="#2e7d32" strokeWidth={2.5} />
                  </Pressable>

                  <Pressable
                    style={styles.sendEnquiryBtn}
                    onPress={() => router.push('/enquiry' as never)}
                  >
                    <Text style={styles.sendEnquiryText}>Send Enquiry</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* ── BOTTOM BULK ORDERS CTA (Matching User Screenshot) ── */}
      <View style={styles.bulkCta}>
        <Text style={styles.bulkCtaTitle}>
          Looking for custom grades or{'\n'}bulk orders?
        </Text>
        <Text style={styles.bulkCtaBody}>
          We supply all grades from 4 Suta to 6+ Suta Premium. Contact us for
          wholesale pricing, custom packaging, and export support.
        </Text>
        <Pressable
          style={styles.bulkCtaBtn}
          onPress={() => router.push('/contact' as never)}
        >
          <Phone size={15} color="#d81b60" fill="#d81b60" />
          <Text style={styles.bulkCtaBtnText}>Get in Touch</Text>
        </Pressable>
      </View>

      {/* Reusable Verified AppFooter */}
      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: {},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: spacing[3],
    fontSize: typography.sizes.md,
    color: colors.textMuted,
  },

  // Hero
  heroSection: { height: 260, position: 'relative' },
  heroBg: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(26,46,18,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: 12,
    paddingBottom: 16,
  },
  heroTag: {
    fontFamily: fonts.caveat,
    fontSize: 26,
    color: '#f5c842',
    marginBottom: 2,
    textAlign: 'center',
  },
  heroTitle: {
    fontFamily: fonts.bebas,
    fontSize: 32,
    color: colors.white,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  heroGrass: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    width: '100%',
    height: 14,
    zIndex: 10,
  },
  heroBody: {
    fontFamily: fonts.dmSans,
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    textAlign: 'center',
  },

  // Catalog Header
  catalogHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  catalogTitle: {
    fontFamily: fonts.caveat,
    fontSize: 32,
    color: '#1a3a1a',
    lineHeight: 36,
  },
  catalogSubtitle: {
    fontFamily: fonts.poppins,
    fontSize: 12.5,
    color: '#666666',
    marginTop: 4,
  },

  // Filter Pills (Wrapping container)
  filtersWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: radii.full,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d7e8d7',
  },
  filterPillActive: {
    backgroundColor: '#1b381b',
    borderColor: '#1b381b',
  },
  filterPillText: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 12,
    color: '#1b381b',
  },
  filterPillTextActive: {
    color: '#f5c842',
  },

  // 2-Column Products Grid
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    rowGap: 14,
    marginTop: 6,
  },
  card: {
    width: GRID_CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#edf4ed',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    paddingBottom: 10,
  },
  cardImageWrap: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  gradeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#1b381b',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  gradeBadgeText: {
    fontFamily: fonts.poppinsBold,
    color: '#ffffff',
    fontSize: 9,
    textTransform: 'uppercase',
  },
  topSizeText: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontFamily: fonts.poppins,
    fontSize: 9,
    color: '#888888',
  },
  cardBody: {
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 2,
  },
  organicPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#edf7ee',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  organicText: {
    fontFamily: fonts.poppinsMedium,
    fontSize: 9,
    color: '#2e7d32',
  },
  cardTitle: {
    fontFamily: fonts.poppinsBold,
    fontSize: 12.5,
    color: '#111111',
    lineHeight: 16,
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: fonts.poppins,
    fontSize: 10,
    color: '#777777',
    lineHeight: 14,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1.5,
  },
  ratingText: {
    fontFamily: fonts.dmSans,
    fontSize: 9.5,
    color: '#777777',
  },
  cardActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewDetailsText: {
    fontFamily: fonts.poppinsBold,
    fontSize: 10,
    color: '#2e7d32',
  },
  sendEnquiryBtn: {
    backgroundColor: '#f0f7f0',
    borderWidth: 1,
    borderColor: '#d7e8d7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendEnquiryText: {
    fontFamily: fonts.poppinsMedium,
    fontSize: 9,
    color: '#2e7d32',
  },

  // Bulk CTA (Matching User Screenshot)
  bulkCta: {
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#1b381b',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 4,
  },
  bulkCtaTitle: {
    fontFamily: fonts.poppinsBold,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 10,
  },
  bulkCtaBody: {
    fontFamily: fonts.poppins,
    fontSize: 12,
    color: '#d4ebd4',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 10,
  },
  bulkCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f5c242',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bulkCtaBtnText: {
    fontFamily: fonts.poppinsBold,
    fontSize: 13.5,
    color: '#0d2d1a',
  },
});
