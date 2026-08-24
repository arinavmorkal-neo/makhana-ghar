/**
 * ══════════════════════════════════════════════════════════════
 * About Us Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website /about-us page:
 * - Hero banner with Caveat tag "Know Our Story"
 * - "Our Story" section with Since 2015 badge
 * - "Meet Our Founders" section (live data from Payload CMS)
 * - 8-Step "Processing of Makhana" illustrated guide (01 to 08)
 * - Mission / Vision / Values (What Drives Us)
 * - Stats Counter bar (10+ Years, 500+ Happy Clients, 15+ Countries, 1000+ Tons)
 * - 6 Key Differentiators (Direct Farm Sourcing, QA, Global Logistics, etc.)
 * ══════════════════════════════════════════════════════════════
 */
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Globe,
  Truck,
  Package,
  DollarSign,
  Users,
} from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getFounders, resolveImageUrl, type Founder } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const processingSteps = [
  {
    num: '01',
    title: 'Pond Cultivation & Seed Growth',
    text: 'Makhana plants grow naturally in stagnant freshwater ponds of Bihar. Seeds develop inside thorny fruits underwater.',
  },
  {
    num: '02',
    title: 'Manual Harvesting by Divers',
    text: 'Skilled local farmers dive into ponds to manually collect ripe, spiny fruits from the muddy pond bed by hand.',
  },
  {
    num: '03',
    title: 'Seed Collection & Sun Drying',
    text: 'Black seeds are extracted, washed thoroughly, and spread under direct sunlight for 2–3 days of natural drying.',
  },
  {
    num: '04',
    title: 'Roasting & Popping (Lawa)',
    text: 'Dried seeds are roasted in iron pans over high heat, then struck with a wooden mallet to pop into fluffy white puffs.',
  },
  {
    num: '05',
    title: 'Shell Removal & Cleaning',
    text: 'The hard black shell is peeled off by hand to reveal pure white makhana puffs, followed by deep cleaning.',
  },
  {
    num: '06',
    title: 'Grading & Quality Sorting',
    text: 'Cleaned puffs are sorted by size — 4+ Sutta (small), 5+ Sutta (medium), and 6+ Sutta Jumbo (premium).',
  },
  {
    num: '07',
    title: 'Moisture Testing & QA',
    text: 'Every batch is tested for moisture (below 12%), checked for purity, and verified against FSSAI & export standards.',
  },
  {
    num: '08',
    title: 'Packaging & Dispatch',
    text: 'Graded makhana is sealed in food-grade, moisture-proof packaging — bulk bags, retail packs, or custom formats.',
  },
];

export default function AboutScreen() {
  const router = useRouter();
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFounders()
      .then((res) => setFounders(res.docs))
      .catch((e) => console.warn('Failed to load founders:', e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppHeader showBack={true} />

      {/* ── HERO BANNER ── */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/banner1.webp' }}
          style={styles.heroBg}
          contentFit="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>Know Our Story</Text>
          <Text style={styles.heroTitle}>ABOUT US</Text>
          <View style={styles.heroRule} />
          <Text style={styles.heroBody}>
            From the heartland of Bihar to global markets — discover the
            journey of Makhana Ghar and our commitment to premium quality fox
            nuts.
          </Text>
        </View>

        {/* Decorative White Grass Edge Image */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grassnew-white.png' }}
          style={styles.heroGrass}
          contentFit="cover"
        />
      </View>

      {/* ── OUR STORY ── */}
      <View style={styles.storySection}>
        <View style={styles.storyHeader}>
          <Text style={styles.storyEyebrow}>⟶ Our Story</Text>
          <Text style={styles.storyTitle}>
            From Bihar&apos;s Pristine Ponds To{' '}
            <Text style={styles.storyAccent}>Your Doorstep</Text>
          </Text>
        </View>

        <View style={styles.storyImageContainer}>
          <Image
            source={{ uri: 'https://www.makhanaghar.in/banner2.webp' }}
            style={styles.storyImage}
            contentFit="cover"
          />
          <View style={styles.storyBadge}>
            <Text style={styles.storyBadgeText}>Since 2015</Text>
          </View>
        </View>

        <Text style={styles.storyText}>
          Makhana Ghar was founded with a simple yet powerful vision — to bring
          the finest quality Makhana (Fox Nuts) from Bihar&apos;s pristine ponds
          directly to consumers and businesses worldwide. What started as a
          small venture in Katihar has grown into one of India&apos;s most
          trusted Makhana manufacturing and export companies.
        </Text>

        <Text style={styles.storyText}>
          We work directly with local farmers, ensuring fair trade practices and
          maintaining the highest quality standards from harvest to packaging.
        </Text>

        <View style={styles.highlightRow}>
          <View style={styles.highlightItem}>
            <CheckCircle size={16} color="#2e7d32" />
            <Text style={styles.highlightText}>100% Natural &amp; Chemical Free</Text>
          </View>
          <View style={styles.highlightItem}>
            <ShieldCheck size={16} color="#2e7d32" />
            <Text style={styles.highlightText}>Export Quality Standards</Text>
          </View>
        </View>
      </View>

      {/* ── MEET OUR FOUNDERS ── */}
      <View style={styles.foundersSection}>
        <Text style={styles.sectionHeaderTitle}>
          Meet Our <Text style={styles.sectionHeaderAccent}>Founders</Text>
        </Text>
        <Text style={styles.sectionHeaderSub}>
          Founded in 2015, Makhana Ghar has been led by Arinav since 2025, with
          a vision to bring premium Bihar Makhana to global markets.
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <View style={styles.foundersList}>
            {founders.length > 0 ? (
              founders.map((founder) => {
                const photoUrl = resolveImageUrl(
                  founder.imageUrl,
                  founder.image,
                  'https://www.makhanaghar.in'
                );

                return (
                  <View key={founder.id} style={styles.founderCard}>
                    {photoUrl ? (
                      <Image
                        source={{ uri: photoUrl }}
                        style={styles.founderPhoto}
                        contentFit="cover"
                      />
                    ) : (
                      <View style={styles.founderPlaceholder}>
                        <Text style={{ fontSize: 32 }}>👤</Text>
                      </View>
                    )}
                    <View style={styles.founderInfo}>
                      <Text style={styles.founderName}>{founder.name}</Text>
                      <Text style={styles.founderRole}>
                        {founder.title || 'Founder & CEO'}
                      </Text>
                      {founder.bio && (
                        <Text style={styles.founderBio}>{founder.bio}</Text>
                      )}
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={styles.founderCard}>
                <View style={styles.founderInfo}>
                  <Text style={styles.founderName}>Arinav Morkal</Text>
                  <Text style={styles.founderRole}>Founder &amp; CEO</Text>
                  <Text style={styles.founderBio}>
                    Connecting Bihar&apos;s makhana farmers directly with global
                    buyers — ensuring quality, fairness, and sustainability.
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* ── 8-STEP PROCESSING OF MAKHANA ── */}
      <View style={styles.processSection}>
        <Text style={styles.processEyebrow}>Our Process</Text>
        <Text style={styles.processTitle}>
          Processing of <Text style={styles.processAccent}>Makhana</Text>
        </Text>
        <Text style={styles.processSub}>
          From natural ponds to your plate — the traditional, step-by-step
          process of how premium Makhana is harvested and processed.
        </Text>

        <View style={styles.processList}>
          {processingSteps.map((step) => (
            <View key={step.num} style={styles.processCard}>
              <View style={styles.processBadge}>
                <Text style={styles.processBadgeText}>{step.num}</Text>
              </View>
              <View style={styles.processCardContent}>
                <Text style={styles.processCardTitle}>{step.title}</Text>
                <Text style={styles.processCardText}>{step.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ── MISSION / VISION / VALUES ── */}
      <View style={styles.mvvSection}>
        <Text style={styles.mvvSectionTitle}>
          What <Text style={styles.mvvSectionAccent}>Drives Us</Text>
        </Text>

        <View style={styles.mvvGrid}>
          <View style={styles.mvvCard}>
            <Target size={24} color="#2e7d32" />
            <Text style={styles.mvvCardTitle}>Our Mission</Text>
            <Text style={styles.mvvCardText}>
              To make premium, ethically-sourced Makhana accessible globally,
              while empowering local farmers in Bihar with fair trade practices.
            </Text>
          </View>

          <View style={styles.mvvCard}>
            <Eye size={24} color="#2e7d32" />
            <Text style={styles.mvvCardTitle}>Our Vision</Text>
            <Text style={styles.mvvCardText}>
              To become the world&apos;s most recognized and trusted Makhana brand
              — setting global benchmarks for quality and nutrition.
            </Text>
          </View>

          <View style={styles.mvvCard}>
            <Heart size={24} color="#2e7d32" />
            <Text style={styles.mvvCardTitle}>Our Values</Text>
            <Text style={styles.mvvCardText}>
              Quality without compromise, transparency in every process, and
              respect for farmers.
            </Text>
          </View>
        </View>
      </View>

      {/* ── STATS COUNTER ── */}
      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>10+</Text>
          <Text style={styles.statLbl}>Years Exp.</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>500+</Text>
          <Text style={styles.statLbl}>Clients</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>15+</Text>
          <Text style={styles.statLbl}>Countries</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>1000+</Text>
          <Text style={styles.statLbl}>Tons/Yr</Text>
        </View>
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
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: 12,
    paddingBottom: 16,
  },
  heroTag: {
    fontFamily: fonts.caveat,
    fontSize: 26,
    color: '#f5c842',
    textAlign: 'center',
    marginBottom: 2,
  },
  heroTitle: {
    fontFamily: fonts.bebas,
    fontSize: 32,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  heroRule: {
    width: 120,
    height: 3,
    backgroundColor: colors.accent,
    marginVertical: 6,
    borderRadius: 2,
    alignSelf: 'center',
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
    lineHeight: 17,
    textAlign: 'center',
  },

  // Story
  storySection: {
    padding: spacing[5],
    backgroundColor: colors.white,
  },
  storyHeader: { marginBottom: spacing[3] },
  storyEyebrow: { fontFamily: fonts.poppinsBold, fontSize: 14, color: '#2e7d32' },
  storyTitle: { fontFamily: fonts.poppinsExtraBold, fontSize: 20, color: '#1a2e12', marginTop: 2 },
  storyAccent: { color: '#2e7d32' },
  storyImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: spacing[3],
  },
  storyImage: { width: '100%', height: '100%' },
  storyBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: colors.accent,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  storyBadgeText: { fontFamily: fonts.poppinsBold, fontSize: 11, color: '#1a2e12' },
  storyText: {
    fontFamily: fonts.dmSans,
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: spacing[3],
  },
  highlightRow: { gap: 8, marginTop: 4 },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f5faf5',
    padding: 8,
    borderRadius: 8,
  },
  highlightText: { fontFamily: fonts.poppinsSemiBold, fontSize: 12, color: '#1a2e12' },

  // Founders
  foundersSection: {
    padding: spacing[5],
    backgroundColor: colors.bg,
  },
  sectionHeaderTitle: { fontFamily: fonts.poppinsExtraBold, fontSize: 20, color: '#1a2e12' },
  sectionHeaderAccent: { color: '#2e7d32' },
  sectionHeaderSub: { fontFamily: fonts.dmSans, fontSize: 12, color: '#777', marginTop: 2, marginBottom: spacing[4], lineHeight: 17 },
  foundersList: { gap: 12 },
  founderCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm.rn,
  },
  founderPhoto: { width: 75, height: 75, borderRadius: 37.5 },
  founderPlaceholder: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  founderInfo: { flex: 1 },
  founderName: { fontFamily: fonts.poppinsBold, fontSize: 15, color: '#1a2e12' },
  founderRole: { fontFamily: fonts.poppinsSemiBold, fontSize: 12, color: '#2e7d32', marginBottom: 4 },
  founderBio: { fontFamily: fonts.dmSans, fontSize: 11, color: '#666', lineHeight: 16 },

  // Processing
  processSection: {
    padding: spacing[5],
    backgroundColor: colors.white,
  },
  processEyebrow: { fontFamily: fonts.poppinsBold, fontSize: 13, color: '#2e7d32' },
  processTitle: { fontFamily: fonts.poppinsExtraBold, fontSize: 20, color: '#1a2e12' },
  processAccent: { color: '#2e7d32' },
  processSub: { fontFamily: fonts.dmSans, fontSize: 12, color: '#777', marginTop: 2, marginBottom: spacing[4], lineHeight: 17 },
  processList: { gap: 10 },
  processCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#fafdf9',
    borderWidth: 1,
    borderColor: '#dce8da',
    borderRadius: 12,
    padding: spacing[3],
  },
  processBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1a3a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processBadgeText: { fontFamily: fonts.poppinsBlack, color: colors.accent, fontSize: 12 },
  processCardContent: { flex: 1 },
  processCardTitle: { fontFamily: fonts.poppinsBold, fontSize: 13, color: '#1a2e12', marginBottom: 2 },
  processCardText: { fontFamily: fonts.dmSans, fontSize: 11, color: '#666', lineHeight: 16 },

  // MVV
  mvvSection: {
    padding: spacing[5],
    backgroundColor: colors.bg,
  },
  mvvSectionTitle: { fontFamily: fonts.poppinsExtraBold, fontSize: 20, color: '#1a2e12', marginBottom: spacing[3] },
  mvvSectionAccent: { color: '#2e7d32' },
  mvvGrid: { gap: 10 },
  mvvCard: {
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mvvCardTitle: { fontFamily: fonts.poppinsBold, fontSize: 14, color: '#1a2e12', marginVertical: 4 },
  mvvCardText: { fontFamily: fonts.dmSans, fontSize: 12, color: '#666', lineHeight: 17 },

  // Stats Bar
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2E1A0E',
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[4],
  },
  statBox: { alignItems: 'center' },
  statNum: { fontFamily: fonts.poppinsBlack, fontSize: 18, color: colors.white },
  statLbl: { fontFamily: fonts.dmSansMedium, fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
});
