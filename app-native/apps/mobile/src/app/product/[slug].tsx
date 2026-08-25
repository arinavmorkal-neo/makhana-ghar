/**
 * ══════════════════════════════════════════════════════════════
 * Product Detail Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website /product/[slug] design:
 * - Top Hero banner with product name + Caveat tag
 * - Breadcrumb navigation
 * - Main image with zoom preview, organic badge, & thumbnail strip
 * - Rating & reviews
 * - Cylinder Tabbed Section (Specifications / Description)
 * - "Ask Latest Price" WhatsApp button
 * - Dual CTAs: "Send Enquiry" + "Get Callback"
 * - Share buttons (WhatsApp, Facebook, X)
 * - 4 Trust Badges (100% Organic, Fast Delivery, Quality Assured, Secure)
 * ══════════════════════════════════════════════════════════════
 */
import { useEffect, useState } from 'react';
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
  Check,
  Share2,
  Phone,
  ShoppingCart,
  MessageCircle,
  Truck,
  ShieldCheck,
  Lock,
  Sparkles,
} from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getProductBySlug, resolveImageUrl, type Product } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const fallbackProductsDict: Record<string, Product> = {
  '5-suta-medium-grade-makhana': {
    id: 'prod-5-suta',
    name: 'Premium 5+ Sutta Raw Makhana',
    slug: '5-suta-medium-grade-makhana',
    grade: '5+ Sutta',
    category: '5+ Sutta',
    isOrganic: true,
    rating: 4.9,
    reviews: 180,
    mainImageUrl: 'https://www.makhanaghar.in/5+.webp',
    tagline: 'Premium Size. Pure Raw Makhana.',
    description:
      'Medium grade 5+ Sutta Makhana with high puff count, ideal for snacking, roasting, and commercial food service. Sourced directly from certified organic wetlands of Mithila, Bihar.',
    specs: [
      { label: 'Grade', value: '5+ Sutta Medium' },
      { label: 'Flake Diameter', value: '15mm – 18mm' },
      { label: 'Moisture', value: 'Below 9%' },
      { label: 'Purity', value: '100% Organic & Chemical-Free' },
      { label: 'Packaging', value: '10kg, 25kg Airtight Moisture-Lock Bags' },
      { label: 'Origin', value: 'Katihar & Purnea, Bihar' },
      { label: 'Certification', value: 'FSSAI, APEDA Export Approved' },
    ],
    galleryImages: [
      { imageUrl: 'https://www.makhanaghar.in/5+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/4+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/kisan-b.webp' },
      { imageUrl: 'https://www.makhanaghar.in/new-section.webp' },
    ],
  },
  'premium-5-plus-sutta-raw-makhana': {
    id: 'prod-5-suta',
    name: 'Premium 5+ Sutta Raw Makhana',
    slug: 'premium-5-plus-sutta-raw-makhana',
    grade: '5+ Sutta',
    category: '5+ Sutta',
    isOrganic: true,
    rating: 4.9,
    reviews: 180,
    mainImageUrl: 'https://www.makhanaghar.in/5+.webp',
    tagline: 'Premium Size. Pure Raw Makhana.',
    description:
      'Medium grade 5+ Sutta Makhana with high puff count, ideal for snacking, roasting, and commercial food service. Sourced directly from certified organic wetlands of Mithila, Bihar.',
    specs: [
      { label: 'Grade', value: '5+ Sutta Medium' },
      { label: 'Flake Diameter', value: '15mm – 18mm' },
      { label: 'Moisture', value: 'Below 9%' },
      { label: 'Purity', value: '100% Organic & Chemical-Free' },
      { label: 'Packaging', value: '10kg, 25kg Airtight Moisture-Lock Bags' },
      { label: 'Origin', value: 'Katihar & Purnea, Bihar' },
      { label: 'Certification', value: 'FSSAI, APEDA Export Approved' },
    ],
    galleryImages: [
      { imageUrl: 'https://www.makhanaghar.in/5+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/4+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/kisan-b.webp' },
      { imageUrl: 'https://www.makhanaghar.in/new-section.webp' },
    ],
  },
  '6-suta-jumbo-grade-makhana': {
    id: 'prod-6-suta',
    name: 'Premium 6+ Sutta Jumbo Makhana',
    slug: '6-suta-jumbo-grade-makhana',
    grade: '6+ Sutta',
    category: '6+ Sutta',
    isOrganic: true,
    rating: 5.0,
    reviews: 340,
    mainImageUrl: 'https://www.makhanaghar.in/6+.webp',
    tagline: 'Supreme Jumbo Size. Pure Luxury Makhana.',
    description:
      'Supreme 6+ Sutta Jumbo Grade — largest diameter flakes for luxury retail, corporate gifting, and international export. Hand-selected for zero broken pieces and uniform roundness.',
    specs: [
      { label: 'Grade', value: '6+ Sutta Jumbo Supreme' },
      { label: 'Flake Diameter', value: '18mm – 22mm' },
      { label: 'Moisture', value: 'Below 8.5%' },
      { label: 'Purity', value: '100% Natural & Chemical-Free' },
      { label: 'Packaging', value: '10kg, 25kg Food-Grade Jute/Poly Bags' },
      { label: 'Origin', value: 'Mithila Region, Bihar, India' },
      { label: 'Certification', value: 'FSSAI, ISO 22000, APEDA' },
    ],
    galleryImages: [
      { imageUrl: 'https://www.makhanaghar.in/6+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/4+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/kisan-b.webp' },
      { imageUrl: 'https://www.makhanaghar.in/new-section.webp' },
    ],
  },
  'premium-6-plus-sutta-raw-makhana': {
    id: 'prod-6-suta',
    name: 'Premium 6+ Sutta Jumbo Makhana',
    slug: 'premium-6-plus-sutta-raw-makhana',
    grade: '6+ Sutta',
    category: '6+ Sutta',
    isOrganic: true,
    rating: 5.0,
    reviews: 340,
    mainImageUrl: 'https://www.makhanaghar.in/6+.webp',
    tagline: 'Supreme Jumbo Size. Pure Luxury Makhana.',
    description:
      'Supreme 6+ Sutta Jumbo Grade — largest diameter flakes for luxury retail, corporate gifting, and international export. Hand-selected for zero broken pieces and uniform roundness.',
    specs: [
      { label: 'Grade', value: '6+ Sutta Jumbo Supreme' },
      { label: 'Flake Diameter', value: '18mm – 22mm' },
      { label: 'Moisture', value: 'Below 8.5%' },
      { label: 'Purity', value: '100% Natural & Chemical-Free' },
      { label: 'Packaging', value: '10kg, 25kg Food-Grade Jute/Poly Bags' },
      { label: 'Origin', value: 'Mithila Region, Bihar, India' },
      { label: 'Certification', value: 'FSSAI, ISO 22000, APEDA' },
    ],
    galleryImages: [
      { imageUrl: 'https://www.makhanaghar.in/6+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/4+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/kisan-b.webp' },
      { imageUrl: 'https://www.makhanaghar.in/new-section.webp' },
    ],
  },
  '4-plus-suta-raw-makhana': {
    id: 'prod-4-plus',
    name: 'Premium 4+ Sutta Raw Makhana',
    slug: '4-plus-suta-raw-makhana',
    grade: '4+ Sutta',
    category: '4+ Sutta',
    isOrganic: true,
    rating: 4.9,
    reviews: 180,
    mainImageUrl: 'https://www.makhanaghar.in/4+.webp',
    tagline: 'Premium Size. Pure Raw Makhana.',
    description:
      'Carefully selected 4+ Sutta raw fox nuts with crisp texture and rich nutritional value. High protein, gluten-free, and antioxidant rich.',
    specs: [
      { label: 'Grade', value: '4+ Sutta Standard' },
      { label: 'Flake Diameter', value: '13mm – 15mm' },
      { label: 'Moisture', value: 'Below 10%' },
      { label: 'Purity', value: '100% Organic' },
      { label: 'Packaging', value: 'Bulk Bags / Custom Private Label' },
      { label: 'Origin', value: 'Bihar, India' },
    ],
    galleryImages: [
      { imageUrl: 'https://www.makhanaghar.in/4+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/5+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/kisan-b.webp' },
      { imageUrl: 'https://www.makhanaghar.in/new-section.webp' },
    ],
  },
  '4-suta-round-makhana-flake': {
    id: 'prod-4-suta',
    name: 'Premium 4 Sutta Raw Makhana',
    slug: '4-suta-round-makhana-flake',
    grade: '4 Sutta',
    category: '4 Sutta',
    isOrganic: true,
    rating: 4.8,
    reviews: 125,
    mainImageUrl: 'https://www.makhanaghar.in/4+.webp',
    tagline: 'Standard Grade. Natural Superfood.',
    description:
      'Standard round makhana flakes, ideal for daily snacks, culinary dishes, confectionery, and large scale food manufacturing.',
    specs: [
      { label: 'Grade', value: '4 Sutta' },
      { label: 'Flake Diameter', value: '11mm – 14mm' },
      { label: 'Moisture', value: 'Below 10%' },
      { label: 'Packaging', value: '10kg, 25kg Bags' },
      { label: 'Origin', value: 'Bihar, India' },
    ],
    galleryImages: [
      { imageUrl: 'https://www.makhanaghar.in/4+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/5+.webp' },
      { imageUrl: 'https://www.makhanaghar.in/kisan-b.webp' },
      { imageUrl: 'https://www.makhanaghar.in/new-section.webp' },
    ],
  },
};

const getFallbackProduct = (slugParam?: string | string[]): Product => {
  const cleanSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  if (!cleanSlug) return fallbackProductsDict['5-suta-medium-grade-makhana']!;
  const clean = cleanSlug.toLowerCase();
  if (fallbackProductsDict[clean]) return fallbackProductsDict[clean]!;
  if (clean.includes('6')) return fallbackProductsDict['6-suta-jumbo-grade-makhana']!;
  if (clean.includes('5')) return fallbackProductsDict['5-suta-medium-grade-makhana']!;
  if (clean.includes('4+') || clean.includes('4-plus') || clean.includes('plus'))
    return fallbackProductsDict['4-plus-suta-raw-makhana']!;
  if (clean.includes('4')) return fallbackProductsDict['4-suta-round-makhana-flake']!;
  return fallbackProductsDict['5-suta-medium-grade-makhana']!;
};

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(() => getFallbackProduct(slug));
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc'>('specs');

  useEffect(() => {
    const cleanSlug = Array.isArray(slug) ? slug[0] : slug;
    if (!cleanSlug) return;

    // Immediately set the correct fallback for this slug
    // (useState initializer only runs on first mount, not on slug change)
    const fallback = getFallbackProduct(cleanSlug);
    setProduct(fallback);
    setActiveImgIndex(0);
    setActiveTab('specs');

    // Then try the backend API for richer data
    getProductBySlug(cleanSlug)
      .then((res) => {
        if (res) setProduct(res);
      })
      .catch((e) => {
        console.warn('Using fallback product data for slug:', cleanSlug, e);
      });
  }, [slug]);

  const currentProduct = product || getFallbackProduct(slug);

  // Collect all images (main + gallery)
  const images: string[] = [];
  const mainUrl = resolveImageUrl(
    currentProduct.mainImageUrl,
    currentProduct.mainImage,
    'https://www.makhanaghar.in'
  );
  if (mainUrl) images.push(mainUrl);

  if (currentProduct.galleryImages && currentProduct.galleryImages.length > 0) {
    for (const gi of currentProduct.galleryImages) {
      const gUrl = resolveImageUrl(
        gi.imageUrl,
        gi.image,
        'https://www.makhanaghar.in'
      );
      if (gUrl && !images.includes(gUrl)) images.push(gUrl);
    }
  }

  if (images.length === 0) {
    images.push('https://www.makhanaghar.in/5+.webp');
  }

  // Ensure 4 distinct images matching website & user screenshot
  const defaultExtras = [
    'https://www.makhanaghar.in/4+.webp',
    'https://www.makhanaghar.in/kisan-b.webp',
    'https://www.makhanaghar.in/new-section.webp',
    'https://www.makhanaghar.in/5+.webp',
    'https://www.makhanaghar.in/6+.webp',
  ];
  for (const extra of defaultExtras) {
    if (!images.includes(extra) && images.length < 4) {
      images.push(extra);
    }
  }

  const currentImage = images[activeImgIndex] || images[0]!;
  // 3 Thumbnails below main image (images 1, 2, 3)
  const thumbnails = images.length > 1 ? images.slice(1, 4) : [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppHeader showBack={true} />

      {/* ── HERO BANNER (Matching User Screenshot) ── */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/banner1.webp' }}
          style={styles.heroBg}
          contentFit="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>Our Products</Text>
          <Text style={styles.heroTitle}>{currentProduct.name}</Text>
          <Image
            source={{ uri: 'https://www.makhanaghar.in/line-throw-title.webp' }}
            style={styles.heroRule}
            contentFit="contain"
          />
          <Text style={styles.heroBody}>
            {currentProduct.tagline || 'Premium Size. Pure Raw Makhana.'}
          </Text>
        </View>

        {/* Decorative White Grass Edge Image at bottom of Banner */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grassnew-white.png' }}
          style={styles.heroGrass}
          contentFit="cover"
        />
      </View>

      {/* ── BREADCRUMB (Matching User Screenshot) ── */}
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbLink} onPress={() => router.push('/')}>
          Home
        </Text>
        <Text style={styles.breadcrumbSep}>›</Text>
        <Text
          style={styles.breadcrumbLink}
          onPress={() => router.push('/products')}
        >
          Makhana
        </Text>
        <Text style={styles.breadcrumbSep}>›</Text>
        <Text style={styles.breadcrumbCurrent} numberOfLines={1}>
          {currentProduct.name}
        </Text>
      </View>

      {/* ── PRODUCT CONTENT ── */}
      <View style={styles.content}>
        {/* ── MAIN IMAGE SHOWCASE CARD ── */}
        <View style={styles.mainImageWrap}>
          <Image
            source={{ uri: currentImage }}
            style={styles.mainImage}
            contentFit="cover"
            transition={200}
          />
          {currentProduct.isOrganic && (
            <View style={styles.organicBadge}>
              <Text style={styles.organicBadgeText}>ORGANIC</Text>
            </View>
          )}
        </View>

        {/* ── 3-THUMBNAIL GALLERY GRID ── */}
        {thumbnails.length > 0 && (
          <View style={styles.thumbnailGrid}>
            {thumbnails.map((img, i) => {
              const isSelected = activeImgIndex === i + 1;
              return (
                <Pressable
                  key={i}
                  style={[
                    styles.thumbnail,
                    isSelected && styles.thumbnailActive,
                  ]}
                  onPress={() => setActiveImgIndex(i + 1)}
                >
                  <Image
                    source={{ uri: img }}
                    style={styles.thumbnailImg}
                    contentFit="cover"
                  />
                </Pressable>
              );
            })}
          </View>
        )}

        {/* ── DOT INDICATORS (Matching User Screenshot) ── */}
        {images.length > 1 && (
          <View style={styles.dotIndicators}>
            {images.map((_, i) => (
              <Pressable
                key={i}
                style={[
                  styles.dot,
                  activeImgIndex === i && styles.dotActive,
                ]}
                onPress={() => setActiveImgIndex(i)}
              />
            ))}
          </View>
        )}

        {/* ── STACKED FULL-WIDTH ACTION BUTTONS (Matching User Screenshot) ── */}
        <View style={styles.ctaStack}>
          <Pressable
            style={styles.ctaEnquiry}
            onPress={() => router.push('/enquiry' as never)}
          >
            <ShoppingCart size={18} color={colors.white} />
            <Text style={styles.ctaEnquiryText}>Send Enquiry</Text>
          </Pressable>

          <Pressable
            style={styles.ctaCallback}
            onPress={() =>
              Linking.openURL(
                `https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list%20and%20available%20varieties%20for%20${encodeURIComponent(
                  currentProduct.name
                )}.`
              )
            }
          >
            <Phone size={18} color="#d63384" />
            <Text style={styles.ctaCallbackText}>Get Callback</Text>
          </Pressable>
        </View>

        {/* ── PRODUCT TITLE & DETAILS ── */}
        <Text style={styles.productTitle}>{currentProduct.name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={15} color="#f5a623" fill="#f5a623" />
            ))}
          </View>
          <Text style={styles.ratingText}>
            {(currentProduct.rating || 4.9).toFixed(1)} ({currentProduct.reviews || 180} reviews)
          </Text>
        </View>

        {currentProduct.tagline && (
          <Text style={styles.tagline}>{currentProduct.tagline}</Text>
        )}

        {currentProduct.description && (
          <Text style={styles.description}>{currentProduct.description}</Text>
        )}

        {/* ── CYLINDER TABBED SECTION ── */}
        <View style={styles.tabbedSection}>
          <View style={styles.cylinderTabs}>
            <View style={styles.tabsGroup}>
              <Pressable
                style={[
                  styles.cylinderTab,
                  activeTab === 'specs' && styles.cylinderTabActive,
                ]}
                onPress={() => setActiveTab('specs')}
              >
                <Text
                  style={[
                    styles.cylinderTabText,
                    activeTab === 'specs' && styles.cylinderTabTextActive,
                  ]}
                >
                  Specifications
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.cylinderTab,
                  activeTab === 'desc' && styles.cylinderTabActive,
                ]}
                onPress={() => setActiveTab('desc')}
              >
                <Text
                  style={[
                    styles.cylinderTabText,
                    activeTab === 'desc' && styles.cylinderTabTextActive,
                  ]}
                >
                  Description
                </Text>
              </Pressable>
            </View>

            {/* Ask Price WhatsApp Button attached to tabs */}
            <Pressable
              style={styles.askPriceBtn}
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list%20for%20${encodeURIComponent(
                    currentProduct.name
                  )}`
                )
              }
            >
              <MessageCircle size={14} color="#2e7d32" />
              <Text style={styles.askPriceText}>Ask Latest Price</Text>
            </Pressable>
          </View>

          {/* Tab Content Card */}
          <View style={styles.tabContentCard}>
            {activeTab === 'specs' ? (
              <View style={styles.specsTable}>
                {currentProduct.specs && currentProduct.specs.length > 0 ? (
                  currentProduct.specs.map((spec, i) => (
                    <View
                      key={i}
                      style={[
                        styles.specRow,
                        i % 2 === 0 && styles.specRowEven,
                      ]}
                    >
                      <Text style={styles.specLabel}>{spec.label}</Text>
                      <Text style={styles.specValue}>{spec.value}</Text>
                    </View>
                  ))
                ) : (
                  <>
                    <View style={[styles.specRow, styles.specRowEven]}>
                      <Text style={styles.specLabel}>Grade</Text>
                      <Text style={styles.specValue}>
                        {currentProduct.grade || 'Premium Grade'}
                      </Text>
                    </View>
                    <View style={styles.specRow}>
                      <Text style={styles.specLabel}>Moisture</Text>
                      <Text style={styles.specValue}>Below 10%</Text>
                    </View>
                    <View style={[styles.specRow, styles.specRowEven]}>
                      <Text style={styles.specLabel}>Packaging</Text>
                      <Text style={styles.specValue}>Bulk / 10kg, 25kg Bags</Text>
                    </View>
                    <View style={styles.specRow}>
                      <Text style={styles.specLabel}>Origin</Text>
                      <Text style={styles.specValue}>Bihar, India</Text>
                    </View>
                  </>
                )}
              </View>
            ) : (
              <Text style={styles.tabContentText}>
                {currentProduct.aboutUs || currentProduct.description || 'Premium quality export-grade makhana from Bihar.'}
              </Text>
            )}
          </View>
        </View>

        {/* ── SHARE BUTTONS ── */}
        <View style={styles.shareRow}>
          <Text style={styles.shareLabel}>Share:</Text>
          <Pressable
            style={[styles.shareBtn, { borderColor: '#25D366' }]}
            onPress={() =>
              Linking.openURL(
                `https://wa.me/?text=Check%20out%20${encodeURIComponent(
                  currentProduct.name
                )}%20from%20Makhana%20Ghar!%20https://www.makhanaghar.in/product/${currentProduct.slug}`
              )
            }
          >
            <Text style={{ color: '#25D366', fontWeight: 'bold' }}>💬</Text>
          </Pressable>
          <Pressable
            style={[styles.shareBtn, { borderColor: '#1877F2' }]}
            onPress={() =>
              Linking.openURL('https://www.facebook.com/profile.php?id=61590384691167')
            }
          >
            <Text style={{ color: '#1877F2', fontWeight: 'bold' }}>f</Text>
          </Pressable>
        </View>

        {/* ── 4 TRUST BADGES ── */}
        <View style={styles.trustBadges}>
          <View style={styles.trustBadge}>
            <Sparkles size={14} color="#2e7d32" />
            <Text style={styles.trustBadgeText}>100% Organic</Text>
          </View>
          <View style={styles.trustBadge}>
            <Truck size={14} color="#2e7d32" />
            <Text style={styles.trustBadgeText}>Fast Delivery</Text>
          </View>
          <View style={styles.trustBadge}>
            <ShieldCheck size={14} color="#2e7d32" />
            <Text style={styles.trustBadgeText}>Quality Assured</Text>
          </View>
          <View style={styles.trustBadge}>
            <Lock size={14} color="#2e7d32" />
            <Text style={styles.trustBadgeText}>Secure Payments</Text>
          </View>
        </View>
      </View>

      {/* Reusable Verified AppFooter */}
      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    padding: spacing[5],
  },
  loadingText: { marginTop: spacing[3], fontSize: 13, color: colors.textMuted },
  errorTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textDark },
  errorSub: { fontSize: 13, color: '#888', marginTop: 4, marginBottom: 16 },
  backBtn: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radii.full,
  },
  backBtnText: { color: colors.white, fontWeight: '700', fontSize: 13 },

  // Hero
  heroSection: { height: 260, position: 'relative' },
  heroBg: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(26,46,18,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: 12,
    paddingBottom: 16,
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
  heroTag: {
    fontFamily: fonts.caveat,
    fontSize: 26,
    color: '#f5c842',
    marginBottom: 2,
    textAlign: 'center',
  },
  heroTitle: {
    fontFamily: fonts.little,
    fontSize: 32,
    lineHeight: 38,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  heroRule: {
    width: 140,
    height: 8,
    marginVertical: 6,
    alignSelf: 'center',
  },
  heroBody: {
    fontFamily: fonts.dmSans,
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 19,
    textAlign: 'center',
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe3',
  },
  breadcrumbLink: { fontFamily: fonts.dmSans, fontSize: 12.5, color: '#999' },
  breadcrumbSep: { marginHorizontal: 6, color: '#ccc', fontSize: 12.5 },
  breadcrumbCurrent: { fontFamily: fonts.poppinsSemiBold, fontSize: 12.5, color: '#1a3a1a', flex: 1 },

  // Content
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#ffffff',
  },
  mainImageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dce8da',
    backgroundColor: '#ffffff',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  mainImage: { width: '100%', height: '100%' },
  organicBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#2e7d32',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  organicBadgeText: {
    fontFamily: fonts.poppinsBold,
    color: '#ffffff',
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },

  // Thumbnails Grid (3-column)
  thumbnailGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#dce8da',
    backgroundColor: '#ffffff',
  },
  thumbnailActive: {
    borderColor: '#2e7d32',
    borderWidth: 2.5,
  },
  thumbnailImg: { width: '100%', height: '100%' },

  // Dot Indicators
  dotIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d0d0d0',
  },
  dotActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2e7d32',
  },

  // Action Buttons Stack
  ctaStack: {
    width: '100%',
    gap: 10,
    marginBottom: 20,
  },
  ctaEnquiry: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1b381b',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#1b381b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaEnquiryText: {
    fontFamily: fonts.poppinsBold,
    color: '#ffffff',
    fontSize: 15,
  },
  ctaCallback: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f5c842',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#f5c842',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaCallbackText: {
    fontFamily: fonts.poppinsBold,
    color: '#1a3a1a',
    fontSize: 15,
  },

  productTitle: {
    fontFamily: fonts.poppinsExtraBold,
    fontSize: 22,
    color: '#1a3a1a',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  starsRow: { flexDirection: 'row', gap: 2 },
  ratingText: { fontFamily: fonts.dmSans, fontSize: 12, color: '#888' },
  tagline: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 13,
    color: '#2e7d32',
    marginBottom: 6,
  },
  description: {
    fontFamily: fonts.dmSans,
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: spacing[5],
  },

  // Cylinder Tabs
  tabbedSection: { marginBottom: spacing[5] },
  cylinderTabs: {
    gap: 8,
    marginBottom: 10,
  },
  tabsGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  cylinderTab: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: '#dce8da',
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  cylinderTabActive: {
    backgroundColor: '#1a3a1a',
    borderColor: '#1a3a1a',
  },
  cylinderTabText: {
    fontFamily: fonts.poppinsBold,
    fontSize: 12,
    color: '#5a7a58',
  },
  cylinderTabTextActive: {
    color: colors.accentWarm,
  },
  askPriceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#f0f9f1',
    borderWidth: 1,
    borderColor: '#b5d9bb',
    paddingVertical: 8,
    borderRadius: 8,
  },
  askPriceText: {
    fontFamily: fonts.poppinsBold,
    fontSize: 12,
    color: '#2e7d32',
  },

  tabContentCard: {
    borderWidth: 1.5,
    borderColor: '#dce8da',
    borderRadius: 14,
    padding: spacing[4],
    backgroundColor: '#fafdf9',
  },
  tabContentText: { fontFamily: fonts.dmSans, fontSize: 13, color: '#555', lineHeight: 20 },
  specsTable: { gap: 0 },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe3',
  },
  specRowEven: { backgroundColor: '#f5faf5' },
  specLabel: { fontFamily: fonts.dmSans, width: '40%', fontSize: 12, color: '#888' },
  specValue: { fontFamily: fonts.poppinsBold, flex: 1, fontSize: 12, color: '#1a3a1a' },

  // Share
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing[5],
  },
  shareLabel: { fontFamily: fonts.dmSans, fontSize: 12, color: '#888' },
  shareBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  // Trust Badges
  trustBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f5faf5',
    borderWidth: 1,
    borderColor: '#e8f0e8',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  trustBadgeText: { fontFamily: fonts.dmSansMedium, fontSize: 11, color: '#555' },
});
