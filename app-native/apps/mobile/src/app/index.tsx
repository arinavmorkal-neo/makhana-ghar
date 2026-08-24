/**
 * ══════════════════════════════════════════════════════════════
 * Makhana Ghar Mobile App — Home Screen
 * ══════════════════════════════════════════════════════════════
 * 1:1 Pixel-Perfect Recreation of Makhana Ghar Mobile Experience:
 * 1. Clean White Header with centered Makhana Ghar Logo
 * 2. Hero Section:
 *    - Caveat cursive yellow tag: "Superior Quality Makhana Wholesale Supply"
 *    - Little display font title: "PREMIUM QUALITY MAKHANA AT AFFORDABLE WHOLESALE PRICES"
 *    - Yellow brush stroke underline (/line-throw-title.webp)
 *    - Clean white body: "Trusted Supplier of High-Quality Makhana for Businesses, Retailers, and Wholesalers. Health-Conscious Businesses and Food Retailers Worldwide."
 *    - Green pill CTA: "Get Enquiry" + dark green WhatsApp circle icon
 *    - Dual slide dots (solid yellow + hollow white)
 *    - Bottom jagged grass divider (/grass-4.webp)
 * 3. Yellow Two-Tone Product Section with Kisan Character Badge & Cards
 * 4. Why Choose Us Section with video preview card & 3 dark cards (#2E1A0E)
 * 5. Product Category Slider with horizontal carousel & "View All Products"
 * 6. Stats Section (#2E1A0E) with 4 stats counters
 * 7. Farm Section ("Straight From Bihar's Finest Fields")
 * 8. Get a Quote Section with feature tiles & interactive form
 * 9. Dark Green Footer (#0d2d1a) with brand pill, contacts, and quick enquiry
 * ══════════════════════════════════════════════════════════════
 */
import { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Pressable,
  Dimensions,
  Linking,
  TextInput,
  Modal,
  Animated,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect, Line, Circle } from 'react-native-svg';
import {
  Phone,
  Mail,
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  DollarSign,
  Leaf,
  Globe,
  MapPin,
  Map,
  Clock,
  Smile,
  LayoutGrid,
  Send,
  Play,
  X,
  User,
  MessageSquare,
  ChevronRight,
} from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import {
  getProducts,
  submitEnquiry,
  resolveImageUrl,
} from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

/* ── Main App Layout Constants ── */
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (SCREEN_WIDTH - spacing[4] * 3) / 2;
const SLIDER_CARD_WIDTH = SCREEN_WIDTH * 0.72;

// WhatsApp icon SVG component
const WhatsAppIcon = ({ size = 16, color = '#ffffff' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
      fill={color}
    />
  </Svg>
);

// Default Hero Slides matching Next.js website
const heroSlides = [
  {
    image: 'https://www.makhanaghar.in/banner1.webp',
    tag: 'Superior Quality Makhana Wholesale Supply',
    heading: 'PREMIUM QUALITY MAKHANA AT AFFORDABLE WHOLESALE PRICES',
    body: 'Trusted Supplier of High-Quality Makhana for Businesses, Retailers, and Wholesalers. Health-Conscious Businesses and Food Retailers Worldwide.',
  },
  {
    image: 'https://www.makhanaghar.in/banner2.webp',
    tag: 'Farm Fresh & Naturally Processed',
    heading: 'BULK MAKHANA SUPPLY DIRECT FROM SOURCE',
    body: "From Bihar's finest farms to your doorstep. Consistent quality, competitive pricing, and reliable delivery.",
  },
];

// Rich default products matching user reference
const fallbackProducts = [
  {
    id: 'prod-4',
    slug: '4-suta-round-makhana-flake',
    name: 'Makhana 4+ Sutta',
    scriptBadge: '4+ suta',
    grade: '4+ Suta',
    image: 'https://www.makhanaghar.in/4+.webp',
  },
  {
    id: 'prod-5',
    slug: '5-suta-medium-grade-makhana',
    name: 'Makhana 5+ Sutta',
    scriptBadge: '5+ suta',
    grade: '5+ Suta',
    image: 'https://www.makhanaghar.in/5+.webp',
  },
  {
    id: 'prod-6',
    slug: '6-suta-jumbo-grade-makhana',
    name: 'Makhana 6+ Sutta',
    scriptBadge: '6+ suta',
    grade: '6+ Suta',
    image: 'https://www.makhanaghar.in/6+.webp',
  },
  {
    id: 'prod-lite',
    slug: 'phool-makhana-lite',
    name: 'Phool Makhana Lite',
    scriptBadge: '4+ suta',
    grade: 'Lite Grade',
    image: 'https://www.makhanaghar.in/4+.webp',
  },
];

// Product Category Slider items matching user reference image
const sliderCategories = [
  {
    id: 'sc-1',
    name: 'MAKHANA 5+ SUTTA',
    slug: '5-suta-medium-grade-makhana',
    category: 'EXPORT GRADE',
    badge: 'POPULAR',
    logoBadge: 'Makhana Ghar',
    image: 'https://www.makhanaghar.in/5+.webp',
  },
  {
    id: 'sc-2',
    name: 'MAKHANA 6+ SUTTA',
    slug: '6-suta-jumbo-grade-makhana',
    category: 'SUPREME GRADE',
    badge: 'SUPREME',
    logoBadge: 'Makhana Ghar',
    image: 'https://www.makhanaghar.in/6+.webp',
  },
  {
    id: 'sc-3',
    name: 'MAKHANA 4+ SUTTA',
    slug: '4-suta-round-makhana-flake',
    category: 'PREMIUM GRADE',
    badge: 'POPULAR',
    logoBadge: 'Makhana Ghar',
    image: 'https://www.makhanaghar.in/4+.webp',
  },
  {
    id: 'sc-4',
    name: 'PHOOL MAKHANA LITE',
    slug: 'phool-makhana-lite',
    category: 'RAW PACK',
    badge: 'NEW',
    logoBadge: 'Makhana Ghar',
    image: 'https://www.makhanaghar.in/4+.webp',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>(fallbackProducts);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Fifth section infinite auto-scroll carousel state & ref
  const sliderScrollRef = useRef<ScrollView>(null);
  const [sliderActiveIndex, setSliderActiveIndex] = useState(0);
  const SLIDER_ITEM_WIDTH = SCREEN_WIDTH * 0.72 + 16;

  // Auto-slide animation for fifth section carousel
  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setSliderActiveIndex((prev) => {
        const next = (prev + 1) % sliderCategories.length;
        sliderScrollRef.current?.scrollTo({
          x: next * SLIDER_ITEM_WIDTH,
          animated: true,
        });
        return next;
      });
    }, 3200);
    return () => clearInterval(sliderTimer);
  }, [SLIDER_ITEM_WIDTH]);

  // Quick Quote Form State (ThirdSection)
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteProduct, setQuoteProduct] = useState('makhana-6');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const productsRes = await getProducts({ limit: 10 });
      if (productsRes.docs && productsRes.docs.length > 0) {
        const enriched = productsRes.docs.map((doc: any) => ({
          ...doc,
          image: resolveImageUrl(doc.mainImageUrl, doc.mainImage, 'https://www.makhanaghar.in') || 'https://www.makhanaghar.in/4+.webp',
          bg: doc.bg || 'linear-gradient(160deg, #e8f5e9 0%, #2e7d32 100%)',
        }));
        setProducts(enriched);
      }
    } catch (err) {
      console.warn('Using fallback home products:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleQuoteSubmit = async () => {
    setQuoteError(null);
    if (!quoteName.trim()) {
      setQuoteError('Please enter your name');
      return;
    }
    if (!quotePhone.trim()) {
      setQuoteError('Please enter your contact number');
      return;
    }
    if (!quoteEmail.trim() || !quoteEmail.includes('@')) {
      setQuoteError('Please enter a valid email address containing @');
      return;
    }

    setQuoteLoading(true);
    try {
      await submitEnquiry({
        name: quoteName.trim(),
        countryCode: '+91',
        contact: quotePhone.trim(),
        email: quoteEmail.trim(),
        product: quoteProduct,
        message: quoteMessage.trim() || 'App Quick Quote',
        sourceComponent: 'Mobile App Get a Quote',
      });
      setQuoteSuccess(true);
      setQuoteName('');
      setQuotePhone('');
      setQuoteEmail('');
      setQuoteMessage('');
      setTimeout(() => setQuoteSuccess(false), 5000);
    } catch (e: any) {
      setQuoteError(e.message || 'Failed to submit quote request.');
    } finally {
      setQuoteLoading(false);
    }
  };

  const currentSlide = heroSlides[activeSlide] ?? heroSlides[0]!;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [farmLayoutY, setFarmLayoutY] = useState(2500);

  return (
    <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
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
      {/* ══════════════════════════════════════════════════════
          1. CLEAN WHITE HEADER WITH CENTERED LOGO
      ═══════════════════════════════════════════════════════ */}
      <AppHeader />

      {/* ══════════════════════════════════════════════════════
          2. HERO SLIDER SECTION (Matching User Image Exact Style)
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: currentSlide.image }}
          style={styles.heroBg}
          contentFit="cover"
          transition={500}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>{currentSlide.tag}</Text>
          <Text style={styles.heroTitle}>{currentSlide.heading}</Text>
          
          {/* Yellow Brush Underline graphic */}
          <Image
            source={{ uri: 'https://www.makhanaghar.in/line-throw-title.webp' }}
            style={styles.heroRuleImg}
            contentFit="contain"
          />

          <Text style={styles.heroBody}>{currentSlide.body}</Text>

          {/* Green Pill "Get Enquiry" + WhatsApp Icon Button */}
          <Pressable
            style={styles.heroGetEnquiryBtn}
            onPress={() =>
              Linking.openURL(
                "https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20buying%20makhana%20in%20bulk.%20Please%20share%20your%20best%20wholesale%20quote."
              )
            }
          >
            <Text style={styles.heroGetEnquiryText}>Get Enquiry</Text>
            <View style={styles.heroWhatsappCircle}>
              <WhatsAppIcon size={16} color="#ffffff" />
            </View>
          </Pressable>

          {/* Dual Slide Dots at bottom: Solid Yellow + Hollow White */}
          <View style={styles.heroDotsContainer}>
            {heroSlides.map((_, i) => (
              <Pressable
                key={i}
                style={[
                  styles.heroDotCircle,
                  i === activeSlide ? styles.heroDotActiveCircle : styles.heroDotInactiveCircle,
                ]}
                onPress={() => setActiveSlide(i)}
              />
            ))}
          </View>
        </View>

        {/* Grass edge decoration at the bottom (zoomed out fine grass) */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grass-4.webp' }}
          style={styles.grassEdge}
          contentFit="fill"
        />
      </View>

      {/* ══════════════════════════════════════════════════════
          3. PRODUCT SECTION (40% Yellow Top Background, White Bottom)
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.productSection}>
        <View style={styles.yellowBackgroundTop} />

        <View style={styles.productHeader}>
          <Text style={styles.productSectionTag}>Our Products</Text>
          <Text style={styles.productSectionTitle}>Premium Makhana Grades</Text>
          <Text style={styles.productSectionSubtitle}>
            Sourced directly from Bihar&apos;s finest farms — graded, sorted, and
            packed for quality.
          </Text>
        </View>

        <View style={styles.productGrid}>
          {products.map((product) => {
            const imageUrl =
              product.image ||
              resolveImageUrl(
                product.mainImageUrl,
                product.mainImage,
                'https://www.makhanaghar.in'
              ) ||
              'https://www.makhanaghar.in/4+.webp';

            return (
              <Pressable
                key={product.id}
                style={styles.productCard}
                onPress={() => router.push(`/product/${product.slug}` as never)}
              >
                <View style={styles.productImageContainer}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.productCardImage}
                    contentFit="cover"
                    transition={300}
                  />
                  {/* Script Tag in top right (e.g. 4+ suta, 5+ suta, 6+ suta) */}
                  <Text style={styles.productScriptBadge}>
                    {product.scriptBadge || product.grade || '4+ suta'}
                  </Text>
                </View>

                {/* Mobile Bottom Bar: Name on left, Yellow 'Get Now' on right */}
                <View style={styles.productMobileBottom}>
                  <Text style={styles.productMobileName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Pressable
                    style={styles.productMobileBtn}
                    onPress={() =>
                      router.push(`/product/${product.slug}` as never)
                    }
                  >
                    <Text style={styles.productMobileBtnText}>Get Now</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* ══════════════════════════════════════════════════════
          4. WHY CHOOSE US (Matching User Reference Image Exact Style)
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.whySection}>
        {/* Main Farmer Image with floating video thumbnail card */}
        <View style={styles.whyImageContainer}>
          <Image
            source={{ uri: 'https://www.makhanaghar.in/new-section.webp' }}
            style={styles.whyMainFarmerImage}
            contentFit="cover"
          />

          {/* Floating Video Thumbnail in top-left */}
          <Pressable
            style={styles.floatingVideoCard}
            onPress={() => setVideoModalOpen(true)}
          >
            <Image
              source={{ uri: 'https://www.makhanaghar.in/banner1.webp' }}
              style={styles.floatingVideoBg}
              contentFit="cover"
            />
            <View style={styles.floatingVideoPlayBtn}>
              <Play size={16} color={colors.white} fill={colors.white} />
            </View>
          </Pressable>
        </View>

        {/* Eyebrow: ⟶ Why Choose Us */}
        <View style={styles.whyEyebrowRow}>
          <Text style={styles.whyEyebrowArrow}>⟶</Text>
          <Text style={styles.whyEyebrow}>Why Choose Us</Text>
        </View>

        {/* Heading: The Makhana Ghar Difference */}
        <Text style={styles.whyHeading}>The Makhana Ghar Difference</Text>

        {/* Body Copy */}
        <Text style={styles.whyBody}>
          At Makhana Ghar, we’re not just makhana suppliers — we’re your trusted
          partners in quality, freshness, and reliability. Every batch is
          carefully selected, hand-sorted, quality-checked, and packed with care
          to maintain the right size, crunch, and purity. Whether you are a
          wholesaler, retailer, distributor, or dry fruits business owner, we
          ensure consistent quality, proper packaging, and timely delivery for
          your business needs.
        </Text>

        {/* CTA Button: Contact Us Today ➔ */}
        <Pressable
          style={styles.whyCtaBtn}
          onPress={() => router.push('/contact' as never)}
        >
          <Text style={styles.whyCtaText}>Contact Us Today</Text>
          <View style={styles.whyCtaArrow}>
            <ArrowRight size={14} color={colors.white} />
          </View>
        </Pressable>
      </View>

      {/* ══════════════════════════════════════════════════════
          4b. DARK FEATURE CARDS (Matching User Reference Image)
             Deep Chocolate Brown (#2E1A0E) with Gold Circular Badges
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.darkFeaturesContainer}>
        <View style={styles.darkFeaturesCard}>
          {/* Column 1: Hand-Sorted Quality */}
          <View style={styles.darkFeatureCol}>
            <View style={styles.darkFeatureImgWrap}>
              <Image
                source={{ uri: 'https://www.makhanaghar.in/4+.webp' }}
                style={styles.darkFeatureImg}
                contentFit="cover"
              />
              <View style={styles.darkFeatureGoldAccent} />
            </View>
            <Text style={styles.darkFeatureTitle}>Hand-Sorted Quality</Text>
            <Text style={styles.darkFeatureDesc}>
              Every single makhana seed is hand-sorted to ensure uniformity in
              size, color, and texture.
            </Text>
          </View>

          {/* Column Divider */}
          <View style={styles.darkFeatureDivider} />

          {/* Column 2: Farm-to-Fork Traceability */}
          <View style={styles.darkFeatureCol}>
            <View style={styles.darkFeatureImgWrap}>
              <Image
                source={{ uri: 'https://www.makhanaghar.in/5+.webp' }}
                style={styles.darkFeatureImg}
                contentFit="cover"
              />
              <View style={styles.darkFeatureGoldAccent} />
            </View>
            <Text style={styles.darkFeatureTitle}>
              Farm-to-Fork Traceability
            </Text>
            <Text style={styles.darkFeatureDesc}>
              We trace every batch from the pond to your doorstep — full
              transparency.
            </Text>
          </View>
        </View>
      </View>

      {/* ══════════════════════════════════════════════════════
          5. FEATURED PRODUCTS / OUR BEST SELLERS (Matching User Reference Image)
             50% Green Top, 50% Beige Bottom Split with Auto-Scrolling Infinite Carousel
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.productSliderSection}>
        {/* 50% Green Background Half */}
        <View style={styles.sliderGreenBgHalf} />

        {/* Decorative Top Rough Paper Edge Image */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/page-title-top-1.webp' }}
          style={styles.sliderTopEdgeImg}
          contentFit="cover"
        />

        {/* Windmill Watermark in background */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/windmill.webp' }}
          style={styles.sliderWindmillImg}
          contentFit="contain"
        />

        <View style={styles.sliderHeaderWrap}>
          <Text style={styles.sliderLabel}>Featured Products</Text>
          <Text style={styles.sliderHeading}>Our Best Sellers</Text>
          <Text style={styles.sliderDesc}>
            Explore our most popular makhana products loved by businesses across
            India.
          </Text>
          <View style={styles.sliderDivider}>
            <View style={styles.sliderDividerLine} />
            <View style={styles.sliderDividerDot} />
            <View style={styles.sliderDividerLine} />
          </View>
        </View>

        {/* Horizontal Infinite Carousel */}
        <ScrollView
          ref={sliderScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderTrack}
          onScroll={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / SLIDER_ITEM_WIDTH) % sliderCategories.length;
            setSliderActiveIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {[...sliderCategories, ...sliderCategories].map((item, idx) => (
            <Pressable
              key={`${item.id}-${idx}`}
              style={styles.sliderCard}
              onPress={() => router.push(`/product/${item.slug}` as never)}
            >
              <View style={styles.sliderCardImgWrap}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.sliderCardImg}
                  contentFit="cover"
                />
                {/* Left Brand Badge */}
                <Text style={styles.sliderCardBadgeLeft}>{item.logoBadge || 'Makhana Ghar'}</Text>
                
                {/* Right Badge (POPULAR / NEW / SUPREME) */}
                {item.badge ? (
                  <Text style={styles.sliderCardBadgeRight}>{item.badge}</Text>
                ) : null}
              </View>

              <View style={styles.sliderCategoryStrip}>
                <Text style={styles.sliderCategoryStripText}>
                  {item.category}
                </Text>
              </View>

              <View style={styles.sliderCardBody}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sliderCardName}>{item.name}</Text>
                  <View style={styles.sliderCardUnderline} />
                </View>
                <View style={styles.sliderCardArrow}>
                  <ArrowRight size={16} color={colors.white} />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Carousel Dots: Active Green Pill + Inactive Round Dots */}
        <View style={styles.sliderDotsRow}>
          {sliderCategories.map((_, i) => (
            <View
              key={i}
              style={[
                styles.sliderDotItem,
                i === sliderActiveIndex
                  ? styles.sliderDotActivePill
                  : styles.sliderDotInactiveCircle,
              ]}
            />
          ))}
        </View>

        {/* VIEW ALL PRODUCTS Outline Button */}
        <Pressable
          style={styles.sliderViewAllOutlineBtn}
          onPress={() => router.push('/products')}
        >
          <Text style={styles.sliderViewAllOutlineText}>VIEW ALL PRODUCTS</Text>
          <ArrowRight size={14} color="#1a3a1a" />
        </Pressable>
      </View>

      {/* ══════════════════════════════════════════════════════
          6. STATS SECTION (Matching User Reference Image)
             Solid Warm Chocolate Brown (#543319) with Tractor Watermark & 2x2 Grid
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.statsSection}>
        {/* Decorative Top Brown Rough Edge (page-title-top--brown.webp) */}
        <View style={styles.statsTopEdgeWrap}>
          <Image
            source={{
              uri: 'https://www.makhanaghar.in/page-title-top--brown.webp',
            }}
            style={styles.statsTopEdgeImg}
            contentFit="fill"
          />
        </View>

        {/* Tractor Watermark in background */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/tructor.webp' }}
          style={styles.statsTractorWatermark}
          contentFit="contain"
        />

        <View style={styles.statsGrid}>
          {/* Stat 1: 2+ Countries Exported */}
          <View style={styles.statItem}>
            <Globe size={38} color="#ffffff" strokeWidth={1.4} />
            <Text style={styles.statNumber}>2+</Text>
            <Text style={styles.statLabel}>COUNTRIES{'\n'}EXPORTED</Text>
          </View>

          {/* Stat 2: 10+ Cities Covered */}
          <View style={styles.statItem}>
            <Map size={38} color="#ffffff" strokeWidth={1.4} />
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>CITIES COVERED</Text>
          </View>

          {/* Stat 3: 2+ Years Experience */}
          <View style={styles.statItem}>
            <Clock size={38} color="#ffffff" strokeWidth={1.4} />
            <Text style={styles.statNumber}>2+</Text>
            <Text style={styles.statLabel}>YEARS{'\n'}EXPERIENCE</Text>
          </View>

          {/* Stat 4: 10+ Happy Clients */}
          <View style={styles.statItem}>
            <Smile size={38} color="#ffffff" strokeWidth={1.4} />
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>HAPPY CLIENTS</Text>
          </View>
        </View>
      </View>

      {/* ══════════════════════════════════════════════════════
          7. FARM SECTION (Matching User Reference Image)
             Sticky Full-Screen Viewport Background with "From Our Farms" & "Straight From Bihar's Finest Ponds"
      ═══════════════════════════════════════════════════════ */}
      <View
        style={styles.farmSection}
        onLayout={(e) => {
          const y = e.nativeEvent.layout.y;
          if (y > 0) setFarmLayoutY(y);
        }}
      >
        <Animated.View
          style={[
            styles.farmBgWrapper,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-1000, 0, 10000],
                    outputRange: [
                      -1000 - farmLayoutY,
                      -farmLayoutY,
                      10000 - farmLayoutY,
                    ],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={{ uri: 'https://www.makhanaghar.in/new-section.webp' }}
            style={styles.farmBg}
            contentFit="cover"
            contentPosition="center"
          />
        </Animated.View>
        <View style={styles.farmOverlay}>
          {/* Eyebrow: — From Our Farms — */}
          <View style={styles.farmEyebrowRow}>
            <View style={styles.farmEyebrowLine} />
            <Text style={styles.farmEyebrow}>From Our Farms</Text>
            <View style={styles.farmEyebrowLine} />
          </View>

          <Text style={styles.farmTitle}>
            Straight From Bihar&apos;s Finest Ponds
          </Text>

          <Text style={styles.farmDesc}>
            Our makhana is harvested from natural ponds in Bihar, hand-popped
            using traditional methods, and sun-dried to preserve its authentic
            crunch and nutrition.
          </Text>

          <Pressable
            style={styles.farmCtaBtn}
            onPress={() => router.push('/about' as never)}
          >
            <Text style={styles.farmCtaText}>Learn More About Our Process</Text>
            <ArrowRight size={15} color="#1a2e12" />
          </Pressable>
        </View>
      </View>

      {/* ══════════════════════════════════════════════════════
          8. ABOUT / TRUST SECTION (Matching User Reference Image)
             White background, Little font tagline, Poppins bold headline,
             two body paragraphs, 4 separate feature cards with green icon boxes,
             and dark green pill CTA with gold arrow circle.
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.aboutSection}>
        {/* Green uppercase rustic tagline in Little font */}
        <Text style={styles.aboutTagline}>
          WE ARE YOUR TRUSTED PARTNER FOR BULK NATURAL PRODUCE.
        </Text>

        {/* Headline with green accent on "Makhana" */}
        <Text style={styles.aboutHeadline}>
          Premium quality{' '}
          <Text style={styles.aboutHeadlineAccent}>Makhana</Text> sourced
          directly from Bihar&apos;s finest farms.
        </Text>

        {/* Body paragraph 1 */}
        <Text style={styles.aboutBody}>
          At our farms in Bihar, every makhana seed is carefully harvested from
          natural ponds, hand-popped, and sun-dried to preserve its authentic
          crunch, rich nutrition, and earthy flavor — just like nature intended.
        </Text>

        {/* Body paragraph 2 */}
        <Text style={styles.aboutBody}>
          From 4+ Sutta to premium 6+ Sutta grades, we supply every variant for
          retail brands, FMCG companies, and health food businesses — with
          consistent quality, competitive pricing, and on-time delivery.
        </Text>

        {/* 4 Separate Feature Cards */}
        <View style={styles.aboutFeatureCardsWrap}>
          {/* Card 1: 100% Natural */}
          <View style={styles.aboutFeatureCard}>
            <View style={styles.aboutFeatureIconBox}>
              <Leaf size={18} color="#ffffff" strokeWidth={2.2} />
            </View>
            <View style={styles.aboutFeatureCardText}>
              <Text style={styles.aboutFeatureTitle}>100% Natural</Text>
              <Text style={styles.aboutFeatureSub}>No chemical processing</Text>
            </View>
          </View>

          {/* Card 2: FSSAI Certified */}
          <View style={styles.aboutFeatureCard}>
            <View style={styles.aboutFeatureIconBox}>
              <ShieldCheck size={18} color="#ffffff" strokeWidth={2.2} />
            </View>
            <View style={styles.aboutFeatureCardText}>
              <Text style={styles.aboutFeatureTitle}>FSSAI Certified</Text>
              <Text style={styles.aboutFeatureSub}>Export-grade quality</Text>
            </View>
          </View>

          {/* Card 3: Bulk Delivery */}
          <View style={styles.aboutFeatureCard}>
            <View style={styles.aboutFeatureIconBox}>
              <Truck size={18} color="#ffffff" strokeWidth={2.2} />
            </View>
            <View style={styles.aboutFeatureCardText}>
              <Text style={styles.aboutFeatureTitle}>Bulk Delivery</Text>
              <Text style={styles.aboutFeatureSub}>Pan-India &amp; worldwide</Text>
            </View>
          </View>

          {/* Card 4: Wholesale Pricing */}
          <View style={styles.aboutFeatureCard}>
            <View style={styles.aboutFeatureIconBox}>
              <DollarSign size={18} color="#ffffff" strokeWidth={2.4} />
            </View>
            <View style={styles.aboutFeatureCardText}>
              <Text style={styles.aboutFeatureTitle}>Wholesale Pricing</Text>
              <Text style={styles.aboutFeatureSub}>Best rates guaranteed</Text>
            </View>
          </View>
        </View>

        {/* Dark Green Pill CTA */}
        <Pressable
          style={styles.aboutCtaBtn}
          onPress={() => router.push('/products')}
        >
          <Text style={styles.aboutCtaText}>Explore Our Products</Text>
          <View style={styles.aboutCtaArrowCircle}>
            <ArrowRight size={16} color="#1a3a1a" strokeWidth={2.5} />
          </View>
        </Pressable>
      </View>

      {/* ══════════════════════════════════════════════════════
          9. FOOTER SECTION (Reusable AppFooter)
      ═══════════════════════════════════════════════════════ */}
      <AppFooter />

      {/* Video Modal */}
      <Modal visible={videoModalOpen} transparent animationType="fade">
        <View style={styles.modalBg}>
          <Pressable
            style={styles.modalCloseBtn}
            onPress={() => setVideoModalOpen(false)}
          >
            <X size={24} color={colors.white} />
          </Pressable>
          <View style={styles.videoModalContent}>
            <Text style={styles.videoModalTitle}>Makhana Ghar — Our Story</Text>
            <Text style={styles.videoModalSub}>
              From the pristine ponds of Bihar to doorsteps worldwide.
            </Text>
            <Pressable
              style={styles.videoModalAction}
              onPress={() => {
                setVideoModalOpen(false);
                Linking.openURL('https://www.youtube.com/watch?v=dKDRhqPcpts');
              }}
            >
              <Play size={16} color={colors.white} fill={colors.white} />
              <Text style={styles.videoModalActionText}>Open Video on YouTube</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: {},

  // 1. Clean White Header with Centered Large Logo
  cleanHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe3',
  },
  cleanHeaderLogo: {
    width: 220,
    height: 80,
  },

  // 2. Hero Section (Matching User Image Exact Style)
  heroSection: {
    height: 520,
    position: 'relative',
    backgroundColor: '#1a2e12',
    overflow: 'hidden',
  },
  heroBg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(26,46,18,0.65)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 35,
  },
  heroTag: {
    fontFamily: fonts.caveat,
    fontSize: 22,
    color: '#f5c842',
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  heroTitle: {
    fontFamily: fonts.little,
    fontSize: 26,
    color: '#ffffff',
    lineHeight: 32,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  heroRuleImg: {
    width: 200,
    height: 12,
    marginTop: 6,
    marginBottom: 14,
  },
  heroBody: {
    fontFamily: fonts.dmSans,
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 20,
    marginBottom: 22,
  },
  heroGetEnquiryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 8,
    paddingLeft: 22,
    paddingRight: 8,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  heroGetEnquiryText: {
    fontFamily: fonts.poppinsBold,
    color: '#ffffff',
    fontSize: 15,
  },
  heroWhatsappCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 36,
  },
  heroDotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  heroDotActiveCircle: {
    backgroundColor: '#f5c842',
  },
  heroDotInactiveCircle: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  grassEdge: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 11,
    width: '100%',
    zIndex: 10,
  },

  // 3. Product Section (Two-Tone Split: 40% Yellow Top, White Bottom)
  productSection: {
    position: 'relative',
    backgroundColor: '#ffffff',
    paddingTop: 36,
    paddingBottom: 36,
  },
  yellowBackgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#F5C800',
  },
  productHeader: {
    position: 'relative',
    zIndex: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productSectionTag: {
    fontFamily: fonts.caveat,
    fontSize: 30,
    color: '#1a2e12',
    marginBottom: 2,
  },
  productSectionTitle: {
    fontFamily: fonts.poppinsExtraBold,
    fontSize: 24,
    color: '#1a2e12',
    textAlign: 'center',
    marginBottom: 8,
  },
  productSectionSubtitle: {
    fontFamily: fonts.dmSans,
    fontSize: 13,
    color: '#2e3a20',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  productGrid: {
    position: 'relative',
    zIndex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  productCard: {
    width: PRODUCT_CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 4,
  },
  productImageContainer: {
    width: '100%',
    height: PRODUCT_CARD_WIDTH * 1.02,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  productCardImage: { width: '100%', height: '100%' },
  productScriptBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontFamily: fonts.caveat,
    fontSize: 18,
    color: '#222222',
  },
  productMobileBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#1f3319',
  },
  productMobileName: {
    fontFamily: fonts.poppinsBold,
    fontSize: 9.8,
    color: '#ffffff',
    flex: 1,
    marginRight: 4,
  },
  productMobileBtn: {
    backgroundColor: '#F5C800',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  productMobileBtnText: {
    fontFamily: fonts.poppinsBold,
    fontSize: 9.5,
    color: '#1a2e12',
  },

  // 4. Why Choose Section (Matching Reference Image)
  whySection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  whyImageContainer: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  whyMainFarmerImage: {
    width: '100%',
    height: '100%',
  },
  floatingVideoCard: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 76,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingVideoBg: {
    width: '100%',
    height: '100%',
  },
  floatingVideoPlayBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#d4a017',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whyEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  whyEyebrowArrow: {
    color: '#4A7C3F',
    fontSize: 22,
    fontWeight: 'bold',
  },
  whyEyebrow: {
    fontFamily: fonts.caveat,
    color: '#4A7C3F',
    fontSize: 26,
  },
  whyHeading: {
    fontFamily: fonts.poppinsExtraBold,
    fontSize: 24,
    color: '#111111',
    lineHeight: 30,
    marginBottom: 12,
  },
  whyBody: {
    fontFamily: fonts.dmSans,
    fontSize: 13,
    color: '#555555',
    lineHeight: 21,
    marginBottom: 20,
  },
  whyCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1a2e12',
    paddingVertical: 12,
    paddingLeft: 22,
    paddingRight: 10,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
  whyCtaText: {
    fontFamily: fonts.poppinsBold,
    color: colors.white,
    fontSize: 14,
  },
  whyCtaArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 4b. Dark Feature Cards Section (Matching User Reference Image)
  darkFeaturesContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  darkFeaturesCard: {
    backgroundColor: '#2E1A0E',
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 28,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  darkFeatureCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  darkFeatureDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: 4,
  },
  darkFeatureImgWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3.5,
    borderColor: '#C8922A',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginBottom: 14,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkFeatureImg: {
    width: '100%',
    height: '100%',
  },
  darkFeatureGoldAccent: {
    position: 'absolute',
    bottom: -6,
    width: 16,
    height: 8,
    backgroundColor: '#C8922A',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  darkFeatureTitle: {
    fontFamily: fonts.poppinsExtraBold,
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },
  darkFeatureDesc: {
    fontFamily: fonts.dmSans,
    fontSize: 11,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 16.5,
  },

  // 5. Featured Products / Our Best Sellers (Matching User Reference Image)
  productSliderSection: {
    position: 'relative',
    backgroundColor: '#f2ede6',
    paddingTop: 50,
    paddingBottom: 35,
    overflow: 'hidden',
  },
  sliderGreenBgHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#1a3a1a',
  },
  sliderTopEdgeImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 16,
    zIndex: 10,
  },
  sliderWindmillImg: {
    position: 'absolute',
    top: 10,
    left: '50%',
    marginLeft: -170,
    width: 340,
    height: 340,
    opacity: 0.85,
    zIndex: 0,
  },
  sliderHeaderWrap: {
    position: 'relative',
    zIndex: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  sliderLabel: {
    fontFamily: fonts.caveat,
    fontSize: 26,
    color: '#d4af37',
    marginBottom: 2,
  },
  sliderHeading: {
    fontFamily: fonts.poppinsExtraBold,
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  sliderDesc: {
    fontFamily: fonts.dmSans,
    fontSize: 13,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 320,
    marginBottom: 10,
  },
  sliderDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  sliderDividerLine: {
    width: 45,
    height: 1.5,
    backgroundColor: 'rgba(212,175,55,0.45)',
  },
  sliderDividerDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#d4af37',
  },
  sliderTrack: {
    paddingHorizontal: 16,
    gap: 16,
    paddingVertical: 8,
    position: 'relative',
    zIndex: 2,
  },
  sliderCard: {
    width: SLIDER_CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 5,
  },
  sliderCardImgWrap: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  sliderCardImg: {
    width: '100%',
    height: '100%',
  },
  sliderCardBadgeRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#d4af37',
    color: '#1a3a1a',
    fontFamily: fonts.poppinsBold,
    fontSize: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  sliderCardBadgeLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(26,58,26,0.88)',
    color: '#d4af37',
    fontFamily: fonts.poppinsBold,
    fontSize: 9.5,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 6,
  },
  sliderCategoryStrip: {
    backgroundColor: 'rgba(26,58,26,0.92)',
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  sliderCategoryStripText: {
    color: '#d4af37',
    fontFamily: fonts.poppinsBold,
    fontSize: 10,
    letterSpacing: 1,
  },
  sliderCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  sliderCardName: {
    fontFamily: fonts.little,
    fontSize: 17,
    color: '#1a3a1a',
    letterSpacing: 0.5,
  },
  sliderCardUnderline: {
    width: 36,
    height: 3,
    backgroundColor: '#d4af37',
    borderRadius: 1.5,
    marginTop: 4,
  },
  sliderCardArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1a3a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 22,
    marginBottom: 20,
    zIndex: 2,
  },
  sliderDotItem: {
    height: 6,
    borderRadius: 3,
  },
  sliderDotActivePill: {
    width: 24,
    backgroundColor: '#1a3a1a',
  },
  sliderDotInactiveCircle: {
    width: 6,
    backgroundColor: 'rgba(26,58,26,0.22)',
  },
  sliderViewAllOutlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(26,58,26,0.35)',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: radii.full,
    alignSelf: 'center',
    zIndex: 2,
  },
  sliderViewAllOutlineText: {
    fontFamily: fonts.poppinsBold,
    color: '#1a3a1a',
    fontSize: 12,
    letterSpacing: 1.2,
  },
  // 6. Stats Section (Matching User Reference Image)
  statsSection: {
    backgroundColor: '#5D3A1D',
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'visible',
  },
  statsTopEdgeWrap: {
    position: 'absolute',
    top: -4,
    left: 0,
    right: 0,
    height: 8,
    zIndex: 20,
    pointerEvents: 'none',
  },
  statsTopEdgeImg: {
    width: '100%',
    height: '100%',
  },
  statsTractorWatermark: {
    position: 'absolute',
    right: -25,
    top: '15%',
    width: 310,
    height: 310,
    opacity: 0.3,
    zIndex: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    zIndex: 2,
    position: 'relative',
    paddingHorizontal: 8,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 18,
  },
  statNumber: {
    fontFamily: fonts.poppinsBlack,
    fontSize: 34,
    color: '#f5a623',
    marginTop: 8,
    marginBottom: 4,
    lineHeight: 36,
  },
  statLabel: {
    fontFamily: fonts.poppinsBold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    letterSpacing: 0.8,
    lineHeight: 15,
  },

  // 7. Farm Section (Matching User Reference Image)
  farmSection: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  farmBgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: 'hidden',
  },
  farmBg: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: `url("https://www.makhanaghar.in/new-section.webp")`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        } as any)
      : {}),
  },
  farmOverlay: {
    paddingVertical: 48,
    backgroundColor: 'rgba(0,0,0,0.52)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  farmEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  farmEyebrowLine: {
    width: 32,
    height: 1.5,
    backgroundColor: '#f5c800',
    opacity: 0.7,
  },
  farmEyebrow: {
    fontFamily: fonts.caveat,
    color: '#f5c800',
    fontSize: 26,
  },
  farmTitle: {
    fontFamily: fonts.poppinsBlack,
    fontSize: 24,
    color: '#ffffff',
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 12,
  },
  farmDesc: {
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 22,
    maxWidth: 330,
  },
  farmCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f5c800',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: radii.full,
    shadowColor: '#f5c800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  farmCtaText: {
    fontFamily: fonts.poppinsBold,
    color: '#1a2e12',
    fontSize: 13,
  },

  // 8. About / Trust Section
  // 8. About / Trust Section (Matching User Reference Screenshot)
  aboutSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 40,
  },
  aboutTagline: {
    fontFamily: fonts.little,
    fontSize: 17,
    color: '#2e7d32',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  aboutHeadline: {
    fontFamily: fonts.poppinsBold,
    fontSize: 24,
    color: '#111111',
    lineHeight: 32,
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  aboutHeadlineAccent: {
    color: '#2e7d32',
    fontFamily: fonts.poppinsBold,
  },
  aboutBody: {
    fontFamily: fonts.poppins,
    fontSize: 12.5,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 14,
  },
  aboutFeatureCardsWrap: {
    gap: 10,
    marginTop: 6,
    marginBottom: 22,
  },
  aboutFeatureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f9fdf9',
    borderWidth: 1,
    borderColor: '#e8f5e9',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  aboutFeatureIconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutFeatureCardText: {
    flex: 1,
  },
  aboutFeatureTitle: {
    fontFamily: fonts.poppinsBold,
    fontSize: 13.5,
    color: '#1a3a1a',
    marginBottom: 2,
  },
  aboutFeatureSub: {
    fontFamily: fonts.poppins,
    fontSize: 11.5,
    color: '#666666',
  },
  aboutCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#1a3a1a',
    paddingVertical: 10,
    paddingLeft: 22,
    paddingRight: 8,
    borderRadius: 50,
    shadowColor: '#1a3a1a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  aboutCtaText: {
    fontFamily: fonts.poppinsBold,
    color: '#ffffff',
    fontSize: 14,
    marginRight: 10,
  },
  aboutCtaArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5c800',
    justifyContent: 'center',
    alignItems: 'center',
  },


  // 9. Footer Section (Matching User Reference Image)
  footerSection: {
    backgroundColor: '#0d2d1a',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
    position: 'relative',
    overflow: 'visible',
  },
  footerGrassWrap: {
    position: 'absolute',
    top: -6,
    left: 0,
    right: 0,
    width: '100%',
    height: 10,
    zIndex: 20,
    pointerEvents: 'none',
  },
  footerGrassImg: {
    width: '100%',
    height: '100%',
  },
  footerTopBar: {
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    borderStyle: 'dashed',
    paddingBottom: 22,
    marginBottom: 24,
  },
  footerLogo: {
    width: 140,
    height: 70,
    marginBottom: 8,
  },
  footerTagline: {
    fontFamily: fonts.caveat,
    fontSize: 21,
    color: '#f5c518',
    marginBottom: 16,
  },
  footerSocialsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerSocialCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f5c518',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerAboutBlock: {
    marginBottom: 28,
  },
  footerColTitle: {
    fontFamily: fonts.poppinsBold,
    fontSize: 18,
    color: '#ffffff',
  },
  footerTitleUnderline: {
    width: 44,
    height: 2.5,
    backgroundColor: '#f5c518',
    marginTop: 6,
    marginBottom: 16,
  },
  footerDesc: {
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 19,
    marginBottom: 20,
  },
  footerContactList: {
    gap: 10,
    marginBottom: 22,
  },
  footerContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerContactText: {
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.75)',
  },
  footerEnquiryForm: {
    width: '100%',
  },
  footerInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  footerInputName: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    paddingHorizontal: 12,
    color: '#ffffff',
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
  },
  footerPhoneWrap: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  footerFlagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 6,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.15)',
    marginRight: 6,
  },
  footerCountryCode: {
    fontFamily: fonts.dmSansMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  footerInputPhone: {
    flex: 1,
    color: '#ffffff',
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    padding: 0,
  },
  footerCallbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f5c518',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignSelf: 'center',
  },
  footerCallbackBtnText: {
    fontFamily: fonts.poppinsBold,
    color: '#0d2d1a',
    fontSize: 13,
  },
  footerSuccessBox: {
    backgroundColor: 'rgba(46,125,50,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.4)',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  footerSuccessText: {
    fontFamily: fonts.dmSansBold,
    color: '#a5d6a7',
    fontSize: 12.5,
  },
  footerLinksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  footerLinksCol: {
    width: '48%',
  },
  footerLinkList: {
    gap: 8,
  },
  footerLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerLinkText: {
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 18,
  },
  footerBottomBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
    borderStyle: 'dashed',
    paddingTop: 18,
    alignItems: 'flex-start',
    gap: 12,
  },
  footerCopyright: {
    fontFamily: fonts.dmSans,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 16,
  },
  footerCopyrightAccent: {
    color: '#f5c518',
    fontFamily: fonts.dmSansBold,
  },
  footerLegalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  footerLegalText: {
    fontFamily: fonts.dmSans,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.5)',
  },
  footerLegalDot: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
  },

  // Video Modal
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[5],
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 48,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoModalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing[6],
    width: '100%',
    alignItems: 'center',
  },
  videoModalTitle: {
    fontFamily: fonts.poppinsExtraBold,
    fontSize: 18,
    color: '#1a2e12',
    marginBottom: 4,
  },
  videoModalSub: {
    fontFamily: fonts.dmSans,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  videoModalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: radii.full,
  },
  videoModalActionText: {
    fontFamily: fonts.poppinsBold,
    color: colors.white,
    fontSize: 13,
  },
});
