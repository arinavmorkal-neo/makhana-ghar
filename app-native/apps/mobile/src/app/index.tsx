/**
 * ══════════════════════════════════════════════════════════════
 *  Makhana Ghar — Mobile Home Screen
 *  100% Visual Parity with Next.js Website:
 *   1. Brand Top Bar + Header
 *   2. Hero Carousel (Auto-slide + animated dots + WhatsApp CTA)
 *   3. Golden Wavy Divider + "Our Products / Premium Makhana Grades"
 *   4. "Why Choose Makhana Ghar" + Video Card + 3 Dark Feature Cards
 *   5. "Product Categories Slider" with Grade Badges
 *   6. Impact Stats (10+ Countries, 128+ Districts, 35+ Categories, 3925+ Clients)
 *   7. "From Our Farms" Heritage Story
 *   8. "Get a Quote / Bulk Order" Quick Enquiry Form + 4 Trust Badges
 *   9. Direct WhatsApp & Call Floating Actions
 * ══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Pressable,
  Dimensions,
  TextInput,
  Linking,
  Animated,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Award,
  Truck,
  DollarSign,
  Globe,
  MapPin,
  Smile,
  LayoutGrid,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Play,
  Send,
  Leaf,
  Layers,
} from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import {
  getProducts,
  getCategories,
  resolveImageUrl,
  submitEnquiry,
  validateEnquiryForm,
  sanitize,
  type Product,
  type Category,
} from '@makhana-ghar/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing[4] * 3) / 2;

// ── Hero Slides matching website ──────────────────────────
const HERO_SLIDES = [
  {
    image: 'https://www.makhanaghar.in/banner1.webp',
    tag: '🌿 Superior Quality Makhana Wholesale Supply',
    heading: 'Premium Quality Makhana At\nAffordable Wholesale Prices',
    body: 'Trusted Supplier of High-Quality Makhana for Businesses, Retailers, and Wholesalers Worldwide.',
    cta: 'Get Enquiry',
  },
  {
    image: 'https://www.makhanaghar.in/banner2.webp',
    tag: '🌾 Farm Fresh & Naturally Processed',
    heading: 'Bulk Makhana Supply\nDirect From Source',
    body: "From Bihar's finest farms to your doorstep. Consistent quality, competitive pricing, and reliable delivery.",
    cta: 'Get Quote',
  },
];

// ── Static Why Choose Cards matching website ──────────────
const WHY_CHOOSE_CARDS = [
  {
    id: 1,
    title: 'Best Makhana Supplier',
    description: 'Trusted supplier & exporter providing premium quality fox nuts worldwide with guaranteed freshness.',
    grade: 'Export Grade',
    image: 'https://www.makhanaghar.in/4+.webp',
  },
  {
    id: 2,
    title: '4+ Sutta Round Flakes',
    description: 'The best blend of health & taste. 100% organic, gluten-free, and low-calorie round Makhana.',
    grade: '4+ Sutta',
    image: 'https://www.makhanaghar.in/5+.webp',
  },
  {
    id: 3,
    title: 'White Plain Makhana Flake',
    description: 'Wholesome snack with protein-rich goodness. Perfect for FMCG brands and healthy snacking.',
    grade: '6+ Sutta Premium',
    image: 'https://www.makhanaghar.in/6+.webp',
  },
];

// ── Impact Stats matching website ─────────────────────────
const STATS = [
  { icon: Globe, value: '10+', label: 'Countries Exported' },
  { icon: MapPin, value: '128+', label: 'Districts Covered' },
  { icon: LayoutGrid, value: '35+', label: 'Product Grades' },
  { icon: Smile, value: '3,925+', label: 'Happy Clients' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Hero carousel state
  const [heroIndex, setHeroIndex] = useState(0);
  const heroFade = useRef(new Animated.Value(1)).current;

  // Inline Enquiry Form State
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    contact: '',
    email: '',
    product: 'makhana-4',
    message: '',
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // ── Fetch Data ──────────────────────────────────────────
  const loadData = useCallback(async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        getProducts({ limit: 8 }),
        getCategories({ limit: 10 }),
      ]);
      setProducts(pRes.docs);
      setCategories(cRes.docs);
    } catch (err) {
      console.warn('Home data load error:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── Auto-slide Hero ─────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(heroFade, { toValue: 0.2, duration: 250, useNativeDriver: true }),
        Animated.timing(heroFade, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]).start();
      setHeroIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [heroFade]);

  // ── Quick Quote Submit ──────────────────────────────────
  const handleQuoteSubmit = async () => {
    const errs = validateEnquiryForm({
      name: quoteForm.name,
      contact: quoteForm.contact,
      email: quoteForm.email || undefined,
    });

    if (Object.keys(errs).length > 0) {
      Alert.alert('Validation Error', Object.values(errs)[0]);
      return;
    }

    setQuoteSubmitting(true);
    try {
      await submitEnquiry({
        name: sanitize(quoteForm.name),
        contact: sanitize(quoteForm.contact),
        email: quoteForm.email ? sanitize(quoteForm.email) : undefined,
        product: quoteForm.product as any,
        message: quoteForm.message ? sanitize(quoteForm.message) : undefined,
        source: 'mobile-home-quote',
      });
      setQuoteSuccess(true);
      setQuoteForm({ name: '', contact: '', email: '', product: 'makhana-4', message: '' });
      setTimeout(() => setQuoteSuccess(false), 5000);
    } catch {
      Alert.alert('Submission Failed', 'Please try again or contact us directly on WhatsApp.');
    } finally {
      setQuoteSubmitting(false);
    }
  };

  const currentSlide = HERO_SLIDES[heroIndex] ?? HERO_SLIDES[0]!;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} tintColor={colors.accent} />}
      showsVerticalScrollIndicator={false}
    >
      {/* ── TOP BRAND HEADER ── */}
      <View style={styles.topHeader}>
        <View style={styles.topHeaderContent}>
          <View>
            <Text style={styles.brandTitle}>MAKHANA GHAR</Text>
            <Text style={styles.brandSub}>Bihar&apos;s Premium Wholesale Exporter</Text>
          </View>
          <View style={styles.topActions}>
            <Pressable
              style={styles.topCallBtn}
              onPress={() => Linking.openURL('tel:+918002661555')}
            >
              <Phone size={16} color={colors.white} />
            </Pressable>
            <Pressable
              style={styles.topWaBtn}
              onPress={() => Linking.openURL('https://wa.me/918002661555?text=Hi%20Makhana%20Ghar,%20I%20want%20wholesale%20makhana%20rates')}
            >
              <MessageCircle size={16} color={colors.white} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* ── 1. HERO CAROUSEL ── */}
      <View style={styles.heroWrapper}>
        <Image
          source={{ uri: currentSlide.image }}
          style={styles.heroBgImage}
          contentFit="cover"
          transition={500}
        />
        <View style={styles.heroOverlay} />

        <Animated.View style={[styles.heroContent, { opacity: heroFade }]}>
          <View style={styles.heroTagBadge}>
            <Text style={styles.heroTagText}>{currentSlide.tag}</Text>
          </View>

          <Text style={styles.heroHeading}>{currentSlide.heading}</Text>
          <View style={styles.heroGoldLine} />
          <Text style={styles.heroBody}>{currentSlide.body}</Text>

          <View style={styles.heroBtnRow}>
            <Pressable
              style={styles.heroCtaPrimary}
              onPress={() => Linking.openURL('https://wa.me/918002661555?text=I%27m%20interested%20in%20buying%20makhana%20in%20bulk.%20Please%20share%20your%20best%20wholesale%20quote.')}
            >
              <MessageCircle size={18} color={colors.textDark} />
              <Text style={styles.heroCtaPrimaryText}>{currentSlide.cta}</Text>
              <ArrowRight size={16} color={colors.textDark} />
            </Pressable>

            <Pressable
              style={styles.heroCtaSecondary}
              onPress={() => router.push('/products')}
            >
              <Text style={styles.heroCtaSecondaryText}>View Catalog</Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Carousel Indicators */}
        <View style={styles.heroDots}>
          {HERO_SLIDES.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => setHeroIndex(i)}
              style={[styles.heroDot, heroIndex === i && styles.heroDotActive]}
            />
          ))}
        </View>
      </View>

      {/* ── 2. GOLDEN BANNER & OUR PRODUCTS ── */}
      <View style={styles.productsSectionHeader}>
        <View style={styles.goldPill}>
          <Sparkles size={14} color={colors.primaryDeep} />
          <Text style={styles.goldPillText}>OUR SELECTION</Text>
        </View>
        <Text style={styles.sectionMainTitle}>Premium Makhana Grades</Text>
        <Text style={styles.sectionSubTitle}>
          Sourced directly from Bihar&apos;s finest farms — graded, sorted, and packed for wholesale quality.
        </Text>
      </View>

      {/* Products Grid with website card style */}
      <View style={styles.productGrid}>
        {(products.length > 0 ? products : [
          { id: '1', name: 'Makhana 4+ Sutta', slug: 'makhana-4-sutta', grade: '4+ Sutta', isOrganic: true, rating: 4.9, mainImageUrl: 'https://www.makhanaghar.in/4+.webp' },
          { id: '2', name: 'Makhana 5+ Sutta', slug: 'makhana-5-sutta', grade: '5+ Sutta', isOrganic: true, rating: 4.8, mainImageUrl: 'https://www.makhanaghar.in/5+.webp' },
          { id: '3', name: 'Makhana 6+ Sutta (Jumbo)', slug: 'makhana-6-sutta', grade: '6+ Jumbo', isOrganic: true, rating: 5.0, mainImageUrl: 'https://www.makhanaghar.in/6+.webp' },
          { id: '4', name: 'Phool Makhana Lite', slug: 'phool-makhana-lite', grade: 'Lite Grade', isOrganic: true, rating: 4.7, mainImageUrl: 'https://www.makhanaghar.in/4+.webp' },
        ]).map((item: any) => {
          const img = resolveImageUrl(item.mainImageUrl, item.mainImage, 'https://www.makhanaghar.in') || 'https://www.makhanaghar.in/4+.webp';
          return (
            <Pressable
              key={item.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${item.slug || 'makhana-4-sutta'}` as never)}
            >
              <View style={styles.productCardImageWrapper}>
                <Image source={{ uri: img }} style={styles.productCardImg} contentFit="cover" transition={200} />
                <View style={styles.gradeBadge}>
                  <Text style={styles.gradeBadgeText}>{item.grade || 'Export Grade'}</Text>
                </View>
                {item.isOrganic && (
                  <View style={styles.organicPill}>
                    <Leaf size={10} color={colors.success} />
                    <Text style={styles.organicPillText}>Organic</Text>
                  </View>
                )}
              </View>
              <View style={styles.productCardBody}>
                <Text style={styles.productCardTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productCardOrigin}>Origin: Mithila, Bihar</Text>
                <View style={styles.productCardFooter}>
                  <Text style={styles.productCardPrice}>Wholesale Rate</Text>
                  <View style={styles.productCardBtn}>
                    <Text style={styles.productCardBtnText}>Enquire</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.fullCatalogBtn} onPress={() => router.push('/products')}>
        <Text style={styles.fullCatalogText}>View Complete Product Catalog</Text>
        <ArrowRight size={16} color={colors.white} />
      </Pressable>

      {/* ── 3. WHY CHOOSE MAKHANA GHAR ── */}
      <View style={styles.whyChooseContainer}>
        <View style={styles.whyEyebrowRow}>
          <View style={styles.greenLine} />
          <Text style={styles.whyEyebrowText}>Why Choose Makhana Ghar?</Text>
        </View>
        <Text style={styles.whyMainHeading}>We are a Trusted Makhana Manufacturer &amp; Supplier</Text>
        <Text style={styles.whyBodyText}>
          At Makhana Ghar, we deliver 100% natural, freshly harvested fox nuts straight from the ponds of Bihar. Rich in protein, magnesium, and essential minerals with zero chemical processing.
        </Text>

        {/* Video Banner Card */}
        <Pressable
          style={styles.storyVideoCard}
          onPress={() => Linking.openURL('https://www.youtube.com/watch?v=dKDRhqPcpts')}
        >
          <Image
            source={{ uri: 'https://www.makhanaghar.in/banner1.webp' }}
            style={styles.storyVideoImg}
            contentFit="cover"
          />
          <View style={styles.storyVideoOverlay}>
            <View style={styles.playCircle}>
              <Play size={22} color={colors.textDark} fill={colors.textDark} />
            </View>
            <Text style={styles.storyVideoTitle}>Watch Our Harvest &amp; Processing Story</Text>
            <Text style={styles.storyVideoSub}>Direct From Mithila Ponds to Global Markets</Text>
          </View>
        </Pressable>

        {/* 3 Why Choose Cards on dark background */}
        <View style={styles.whyCardsList}>
          {WHY_CHOOSE_CARDS.map((card) => (
            <View key={card.id} style={styles.whyCardItem}>
              <Image source={{ uri: card.image }} style={styles.whyCardImg} contentFit="cover" />
              <View style={styles.whyCardContent}>
                <View style={styles.whyCheckRow}>
                  <CheckCircle2 size={16} color={colors.accent} />
                  <Text style={styles.whyCardGrade}>{card.grade}</Text>
                </View>
                <Text style={styles.whyCardTitle}>{card.title}</Text>
                <Text style={styles.whyCardDesc}>{card.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ── 4. IMPACT STATS SECTION ── */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTagline}>GLOBAL EXPORT EXCELLENCE</Text>
        <Text style={styles.statsTitle}>Supplying Purity at Scale</Text>

        <View style={styles.statsGrid}>
          {STATS.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <View key={i} style={styles.statCard}>
                <View style={styles.statIconWrap}>
                  <IconComp size={24} color={colors.accent} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── 5. FARM HERITAGE & PROCESS ── */}
      <View style={styles.farmStorySection}>
        <Text style={styles.farmTag}>FROM OUR FARMS</Text>
        <Text style={styles.farmHeading}>Straight From Bihar&apos;s Fields To Your Table</Text>
        <Text style={styles.farmDesc}>
          Every makhana seed is hand-harvested from natural freshwater ponds in Darbhanga &amp; Madhubani, sun-dried, and popped over clay ovens for maximum crunch and nutritional integrity.
        </Text>

        <View style={styles.processSteps}>
          {[
            { step: '01', title: 'Pond Harvest', desc: 'Hand-collected by skilled farmers' },
            { step: '02', title: 'Sun Drying', desc: 'Naturally dried under direct sunlight' },
            { step: '03', title: 'Clay Roasting', desc: 'Popped at optimal temperature' },
            { step: '04', title: 'Grade Sorting', desc: 'Precision machine + hand grading' },
          ].map((p, idx) => (
            <View key={idx} style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNum}>{p.step}</Text>
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>{p.title}</Text>
                <Text style={styles.stepSub}>{p.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ── 6. GET A QUOTE / QUICK BULK ENQUIRY FORM ── */}
      <View style={styles.quoteSection}>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteCardTitle}>Get Wholesale Quote</Text>
          <Text style={styles.quoteCardSub}>Direct Factory Pricing for Bulk Buyers &amp; Retailers</Text>

          {/* 4 Trust Badges */}
          <View style={styles.trustBadgesRow}>
            <View style={styles.trustBadgeItem}>
              <Leaf size={14} color={colors.success} />
              <Text style={styles.trustBadgeText}>100% Natural</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <Award size={14} color={colors.success} />
              <Text style={styles.trustBadgeText}>FSSAI Certified</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <Truck size={14} color={colors.success} />
              <Text style={styles.trustBadgeText}>Pan-India Bulk</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <DollarSign size={14} color={colors.success} />
              <Text style={styles.trustBadgeText}>Factory Rates</Text>
            </View>
          </View>

          {quoteSuccess ? (
            <View style={styles.quoteSuccessBox}>
              <CheckCircle2 size={32} color={colors.success} />
              <Text style={styles.quoteSuccessTitle}>Enquiry Received!</Text>
              <Text style={styles.quoteSuccessBody}>Our wholesale manager will call you within 2 hours with our best price list.</Text>
            </View>
          ) : (
            <View style={styles.quoteFormFields}>
              <TextInput
                style={styles.quoteInput}
                placeholder="Your Full Name *"
                placeholderTextColor="#888"
                value={quoteForm.name}
                onChangeText={(v) => setQuoteForm({ ...quoteForm, name: v })}
              />
              <TextInput
                style={styles.quoteInput}
                placeholder="Phone / WhatsApp Number *"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                value={quoteForm.contact}
                onChangeText={(v) => setQuoteForm({ ...quoteForm, contact: v })}
              />
              <TextInput
                style={styles.quoteInput}
                placeholder="Email Address (Optional)"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={quoteForm.email}
                onChangeText={(v) => setQuoteForm({ ...quoteForm, email: v })}
              />
              <TextInput
                style={[styles.quoteInput, styles.quoteTextarea]}
                placeholder="Quantity Required (e.g. 50kg, 500kg, 1 Tonne) & Grade"
                placeholderTextColor="#888"
                multiline
                numberOfLines={3}
                value={quoteForm.message}
                onChangeText={(v) => setQuoteForm({ ...quoteForm, message: v })}
              />

              <Pressable
                style={[styles.quoteSubmitBtn, quoteSubmitting && { opacity: 0.7 }]}
                onPress={handleQuoteSubmit}
                disabled={quoteSubmitting}
              >
                <Send size={18} color={colors.white} />
                <Text style={styles.quoteSubmitText}>
                  {quoteSubmitting ? 'Submitting...' : 'Submit & Get Callback'}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {/* ── 7. FOOTER BRAND STRIP ── */}
      <View style={styles.footerStrip}>
        <Text style={styles.footerBrand}>MAKHANA GHAR</Text>
        <Text style={styles.footerTagline}>Bihar • India • Global Export</Text>
        <Text style={styles.footerCopy}>© 2026 Makhana Ghar. All rights reserved.</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f3' },
  content: { paddingBottom: spacing[12] },

  // ── Top Brand Header ──
  topHeader: {
    backgroundColor: '#152b11',
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245,200,0,0.2)',
  },
  topHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.accent,
    letterSpacing: 1.5,
  },
  brandSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  topCallBtn: {
    backgroundColor: '#2d7a27',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWaBtn: {
    backgroundColor: '#25D366',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Hero Carousel ──
  heroWrapper: {
    height: 480,
    position: 'relative',
    justifyContent: 'flex-end',
    backgroundColor: '#10220c',
  },
  heroBgImage: {
    ...StyleSheet.absoluteFill,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(16,34,12,0.72)',
  },
  heroContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[8],
  },
  heroTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245,200,0,0.18)',
    borderColor: colors.accent,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    marginBottom: spacing[2],
  },
  heroTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 0.5,
  },
  heroHeading: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.white,
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  heroGoldLine: {
    width: 60,
    height: 3,
    backgroundColor: colors.accent,
    marginVertical: 10,
    borderRadius: 2,
  },
  heroBody: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 19,
    marginBottom: spacing[4],
  },
  heroBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  heroCtaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: radii.full,
    ...shadows.md.rn,
  },
  heroCtaPrimaryText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textDark,
  },
  heroCtaSecondary: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
  },
  heroCtaSecondaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  heroDots: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  heroDotActive: {
    width: 24,
    backgroundColor: colors.accent,
  },

  // ── Products Header ──
  productsSectionHeader: {
    paddingTop: spacing[8],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
  },
  goldPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5C800',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.full,
    marginBottom: 8,
  },
  goldPillText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#152b11',
    letterSpacing: 1,
  },
  sectionMainTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#152b11',
    textAlign: 'center',
  },
  sectionSubTitle: {
    fontSize: 12,
    color: '#557250',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
    paddingHorizontal: spacing[2],
  },

  // ── Product Grid ──
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    marginTop: spacing[5],
    gap: spacing[3],
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e1ede0',
    ...shadows.sm.rn,
  },
  productCardImageWrapper: {
    height: CARD_WIDTH * 0.95,
    position: 'relative',
    backgroundColor: '#eef5ec',
  },
  productCardImg: {
    width: '100%',
    height: '100%',
  },
  gradeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(21,43,17,0.85)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  gradeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accent,
  },
  organicPill: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.full,
  },
  organicPillText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.success,
  },
  productCardBody: {
    padding: 10,
    backgroundColor: '#fafdf9',
  },
  productCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#152b11',
  },
  productCardOrigin: {
    fontSize: 10,
    color: '#6e8c69',
    marginTop: 2,
  },
  productCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#eef5ec',
  },
  productCardPrice: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2e7d32',
  },
  productCardBtn: {
    backgroundColor: '#152b11',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  productCardBtnText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accent,
  },
  fullCatalogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#152b11',
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    paddingVertical: 13,
    borderRadius: radii.md,
  },
  fullCatalogText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },

  // ── Why Choose Section ──
  whyChooseContainer: {
    backgroundColor: '#12260f',
    marginTop: spacing[10],
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[4],
  },
  whyEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenLine: {
    width: 24,
    height: 3,
    backgroundColor: colors.accent,
  },
  whyEyebrowText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: 0.5,
  },
  whyMainHeading: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    marginTop: 8,
    lineHeight: 26,
  },
  whyBodyText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 8,
    lineHeight: 18,
  },
  storyVideoCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: spacing[5],
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(245,200,0,0.3)',
  },
  storyVideoImg: {
    ...StyleSheet.absoluteFill,
  },
  storyVideoOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(18,38,15,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[3],
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...shadows.md.rn,
  },
  storyVideoTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
  },
  storyVideoSub: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    textAlign: 'center',
  },
  whyCardsList: {
    marginTop: spacing[6],
    gap: 12,
  },
  whyCardItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    gap: 12,
  },
  whyCardImg: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  whyCardContent: {
    flex: 1,
  },
  whyCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  whyCardGrade: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accent,
  },
  whyCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
    marginTop: 2,
  },
  whyCardDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    lineHeight: 15,
  },

  // ── Impact Stats ──
  statsContainer: {
    backgroundColor: '#0d1e0a',
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[4],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(245,200,0,0.2)',
  },
  statsTagline: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accent,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing[5],
    gap: 10,
  },
  statCard: {
    width: (SCREEN_WIDTH - spacing[4] * 2 - 10) / 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,200,0,0.2)',
  },
  statIconWrap: {
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.accent,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    textAlign: 'center',
  },

  // ── Farm Story ──
  farmStorySection: {
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[4],
    backgroundColor: '#ffffff',
  },
  farmTag: {
    fontSize: 10,
    fontWeight: '900',
    color: '#2e7d32',
    letterSpacing: 1,
  },
  farmHeading: {
    fontSize: 19,
    fontWeight: '900',
    color: '#152b11',
    marginTop: 4,
    lineHeight: 25,
  },
  farmDesc: {
    fontSize: 12,
    color: '#557250',
    marginTop: 6,
    lineHeight: 18,
  },
  processSteps: {
    marginTop: spacing[5],
    gap: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f7faf6',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2ede0',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#152b11',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.accent,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#152b11',
  },
  stepSub: {
    fontSize: 11,
    color: '#658260',
    marginTop: 1,
  },

  // ── Quote Section ──
  quoteSection: {
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
    backgroundColor: '#f4f7f3',
  },
  quoteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: spacing[5],
    borderWidth: 1.5,
    borderColor: '#dce8da',
    ...shadows.md.rn,
  },
  quoteCardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#152b11',
  },
  quoteCardSub: {
    fontSize: 12,
    color: '#668461',
    marginTop: 3,
  },
  trustBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: spacing[4],
  },
  trustBadgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trustBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1b5e20',
  },
  quoteFormFields: {
    gap: 10,
  },
  quoteInput: {
    backgroundColor: '#fafdf9',
    borderWidth: 1.5,
    borderColor: '#dce8da',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#152b11',
  },
  quoteTextarea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  quoteSubmitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#152b11',
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 6,
  },
  quoteSubmitText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
  },
  quoteSuccessBox: {
    paddingVertical: spacing[6],
    alignItems: 'center',
    gap: 8,
  },
  quoteSuccessTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.success,
  },
  quoteSuccessBody: {
    fontSize: 12,
    color: '#557250',
    textAlign: 'center',
    lineHeight: 18,
  },

  // ── Footer ──
  footerStrip: {
    backgroundColor: '#0f200c',
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
    marginTop: spacing[4],
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.accent,
    letterSpacing: 2,
  },
  footerTagline: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  footerCopy: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 12,
  },
});
