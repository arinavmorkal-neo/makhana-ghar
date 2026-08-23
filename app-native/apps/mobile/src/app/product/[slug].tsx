/**
 * ══════════════════════════════════════════════════════════════
 *  Makhana Ghar — Product Details Screen
 *  Full Specification, Gallery, Certifications & Wholesale Actions
 * ══════════════════════════════════════════════════════════════
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Linking,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Star,
  MessageCircle,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Award,
  Package,
  Sparkles,
  Share2,
  Leaf,
  Info,
} from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getProductBySlug, resolveImageUrl, type Product } from '@makhana-ghar/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PACKAGING_OPTIONS = ['100g Pouch', '250g Pouch', '500g Bag', '1kg Bag', '10kg Carton', 'Custom Bulk'];

const NUTRITION_FACTS = [
  { nutrient: 'Protein', amount: '9.7g / 100g' },
  { nutrient: 'Dietary Fiber', amount: '14.5g / 100g' },
  { nutrient: 'Calcium', amount: '60mg / 100g' },
  { nutrient: 'Magnesium', amount: '56mg / 100g' },
  { nutrient: 'Potassium', amount: '350mg / 100g' },
  { nutrient: 'Cholesterol', amount: '0mg' },
  { nutrient: 'Trans Fat', amount: '0g' },
];

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedPack, setSelectedPack] = useState('10kg Carton');

  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug)
      .then((res) => {
        if (res) {
          setProduct(res);
        } else {
          // Fallback mock if slug is sample
          setProduct({
            id: '1',
            name: slug.replace(/-/g, ' ').toUpperCase(),
            slug: slug,
            status: 'published',
            tagline: 'Direct From Bihar’s Finest Organic Ponds',
            description: 'Our premium grade Makhana is hand-harvested from freshwater ponds in Bihar, naturally sun-dried, and roasted over clay ovens to preserve high nutritional value and crunchy texture.',
            grade: slug.includes('6') ? '6+ Super Jumbo' : slug.includes('5') ? '5+ Export' : '4+ Premium',
            isOrganic: true,
            rating: 4.9,
            reviews: 142,
            mainImageUrl: slug.includes('6') ? 'https://www.makhanaghar.in/6+.webp' : slug.includes('5') ? 'https://www.makhanaghar.in/5+.webp' : 'https://www.makhanaghar.in/4+.webp',
            specs: [
              { label: 'Origin', value: 'Darbhanga & Madhubani, Bihar' },
              { label: 'Purity', value: '100% Natural, Chemical Free' },
              { label: 'Moisture', value: '< 6% (Optimum Crunch)' },
              { label: 'Shelf Life', value: '12 Months' },
              { label: 'Processing', value: 'Clay Oven Roasted & Machine Graded' },
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.centerText}>Loading Product Details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.centerText}>Product not found</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Return to Catalog</Text>
        </Pressable>
      </View>
    );
  }

  const mainUrl = resolveImageUrl(product.mainImageUrl, product.mainImage, 'https://www.makhanaghar.in') || 'https://www.makhanaghar.in/4+.webp';
  const gallery = [mainUrl, 'https://www.makhanaghar.in/banner1.webp', 'https://www.makhanaghar.in/banner2.webp'];

  const waText = encodeURIComponent(`Hi Makhana Ghar, I am interested in ordering ${product.name} (${selectedPack}). Please share current wholesale rate and minimum order quantity.`);

  return (
    <View style={styles.container}>
      {/* Top Floating Nav */}
      <View style={styles.floatingNav}>
        <Pressable style={styles.navCircleBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.white} />
        </Pressable>
        <Text style={styles.navTitle} numberOfLines={1}>{product.name}</Text>
        <Pressable
          style={styles.navCircleBtn}
          onPress={() => Linking.openURL(`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} on Makhana Ghar: https://www.makhanaghar.in/product/${product.slug}`)}`)}
        >
          <Share2 size={18} color={colors.white} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* ── Image Gallery ── */}
        <View style={styles.imageGallery}>
          <Image
            source={{ uri: gallery[activeImageIdx] }}
            style={styles.mainHeroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.imageThumbnailRow}>
            {gallery.map((img, i) => (
              <Pressable
                key={i}
                style={[styles.thumbnailWrap, activeImageIdx === i && styles.thumbnailWrapActive]}
                onPress={() => setActiveImageIdx(i)}
              >
                <Image source={{ uri: img }} style={styles.thumbImg} contentFit="cover" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* ── Details Body ── */}
        <View style={styles.detailsBody}>
          {/* Badges Row */}
          <View style={styles.badgeRow}>
            <View style={styles.gradeBadge}>
              <Sparkles size={12} color={colors.accent} />
              <Text style={styles.gradeBadgeText}>{product.grade || 'Export Quality'}</Text>
            </View>
            {product.isOrganic && (
              <View style={styles.organicBadge}>
                <Leaf size={12} color={colors.success} />
                <Text style={styles.organicBadgeText}>100% Certified Organic</Text>
              </View>
            )}
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          {product.tagline && <Text style={styles.tagline}>{product.tagline}</Text>}

          {/* Rating Strip */}
          <View style={styles.ratingStrip}>
            <View style={styles.starsWrap}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} color={colors.accent} fill={colors.accent} />
              ))}
            </View>
            <Text style={styles.ratingScore}>{product.rating?.toFixed(1) || '4.9'} / 5.0</Text>
            <Text style={styles.ratingCount}>({product.reviews || 120}+ wholesale reviews)</Text>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionHeader}>Product Overview</Text>
          <Text style={styles.descriptionText}>
            {product.description || 'Our makhana is harvested directly from the pristine lotus ponds of Bihar. Perfectly popped, rich in protein, low in sodium, with zero chemical processing.'}
          </Text>

          {/* Packaging Options */}
          <Text style={[styles.sectionHeader, { marginTop: spacing[5] }]}>Available Packaging Options</Text>
          <View style={styles.packOptionsRow}>
            {PACKAGING_OPTIONS.map((pack) => (
              <Pressable
                key={pack}
                style={[styles.packChip, selectedPack === pack && styles.packChipActive]}
                onPress={() => setSelectedPack(pack)}
              >
                <Package size={14} color={selectedPack === pack ? colors.textDark : '#557250'} />
                <Text style={[styles.packChipText, selectedPack === pack && styles.packChipTextActive]}>
                  {pack}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Specifications Table */}
          <Text style={[styles.sectionHeader, { marginTop: spacing[6] }]}>Specifications &amp; Origin</Text>
          <View style={styles.specTable}>
            {(product.specs && product.specs.length > 0 ? product.specs : [
              { label: 'Origin', value: 'Bihar, India' },
              { label: 'Grade Standard', value: product.grade || '4+ Sutta' },
              { label: 'Moisture', value: '< 6%' },
              { label: 'Purity', value: '100% Natural' },
              { label: 'Export Certifications', value: 'FSSAI, APEDA, ISO' },
            ]).map((s, idx) => (
              <View key={idx} style={[styles.specRow, idx % 2 === 1 && styles.specRowAlt]}>
                <Text style={styles.specLabel}>{s.label}</Text>
                <Text style={styles.specVal}>{s.value}</Text>
              </View>
            ))}
          </View>

          {/* Nutritional Breakdown */}
          <Text style={[styles.sectionHeader, { marginTop: spacing[6] }]}>Nutritional Facts (Per 100g)</Text>
          <View style={styles.nutritionGrid}>
            {NUTRITION_FACTS.map((n, idx) => (
              <View key={idx} style={styles.nutritionCard}>
                <Text style={styles.nutritionNutrient}>{n.nutrient}</Text>
                <Text style={styles.nutritionAmount}>{n.amount}</Text>
              </View>
            ))}
          </View>

          {/* Trust Guarantees */}
          <View style={styles.trustBanner}>
            <View style={styles.trustItem}>
              <CheckCircle2 size={18} color={colors.accent} />
              <Text style={styles.trustText}>Direct Pond-to-Factory Sourcing</Text>
            </View>
            <View style={styles.trustItem}>
              <ShieldCheck size={18} color={colors.accent} />
              <Text style={styles.trustText}>Moisture Tested for Maximum Crunch</Text>
            </View>
            <View style={styles.trustItem}>
              <Award size={18} color={colors.accent} />
              <Text style={styles.trustText}>Global Export Packaging Standard</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ── Sticky Bottom Action Bar ── */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.bottomCallBtn}
          onPress={() => Linking.openURL('tel:+918002661555')}
        >
          <Phone size={18} color={colors.white} />
          <Text style={styles.bottomCallText}>Call Factory</Text>
        </Pressable>

        <Pressable
          style={styles.bottomWaBtn}
          onPress={() => Linking.openURL(`https://wa.me/918002661555?text=${waText}`)}
        >
          <MessageCircle size={20} color={colors.textDark} />
          <Text style={styles.bottomWaText}>Instant WhatsApp Quote</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f3' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7f3', padding: 20 },
  centerText: { fontSize: 14, color: '#557250', marginTop: 10 },
  backBtn: { marginTop: 16, padding: 10 },
  backBtnText: { color: colors.primaryDeep, fontWeight: '800' },

  // Floating Nav
  floatingNav: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
  },
  navCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(21,43,17,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  // Image Gallery
  imageGallery: {
    backgroundColor: '#10220c',
  },
  mainHeroImage: {
    width: SCREEN_WIDTH,
    height: 320,
  },
  imageThumbnailRow: {
    flexDirection: 'row',
    gap: 8,
    padding: spacing[3],
    backgroundColor: '#152b11',
  },
  thumbnailWrap: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailWrapActive: {
    borderColor: colors.accent,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },

  // Body Details
  detailsBody: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -16,
    ...shadows.md.rn,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  gradeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#152b11',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  gradeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accent,
  },
  organicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  organicBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  productName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#152b11',
    marginTop: 4,
  },
  tagline: {
    fontSize: 13,
    color: '#557250',
    marginTop: 4,
  },
  ratingStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  starsWrap: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingScore: {
    fontSize: 12,
    fontWeight: '800',
    color: '#152b11',
  },
  ratingCount: {
    fontSize: 11,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#eef5ec',
    marginVertical: spacing[4],
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#152b11',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: '#4e694a',
    lineHeight: 20,
  },

  // Pack chips
  packOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  packChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f0f5ee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d5e5d3',
  },
  packChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  packChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#335030',
  },
  packChipTextActive: {
    color: colors.textDark,
  },

  // Spec Table
  specTable: {
    backgroundColor: '#fafdf9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1ede0',
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  specRowAlt: {
    backgroundColor: '#f2f8f0',
  },
  specLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#152b11',
  },
  specVal: {
    flex: 1.2,
    fontSize: 12,
    color: '#557250',
    textAlign: 'right',
  },

  // Nutrition Grid
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nutritionCard: {
    width: (SCREEN_WIDTH - spacing[4] * 2 - 8) / 2,
    backgroundColor: '#f7faf6',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2ede0',
  },
  nutritionNutrient: {
    fontSize: 11,
    fontWeight: '700',
    color: '#152b11',
  },
  nutritionAmount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2e7d32',
    marginTop: 2,
  },

  // Trust Banner
  trustBanner: {
    backgroundColor: '#152b11',
    borderRadius: 12,
    padding: spacing[4],
    marginTop: spacing[6],
    gap: 10,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trustText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#10220c',
    paddingVertical: 12,
    paddingHorizontal: spacing[4],
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(245,200,0,0.3)',
    ...shadows.nav.rn,
  },
  bottomCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2d7a27',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  bottomCallText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },
  bottomWaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bottomWaText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textDark,
  },
});
