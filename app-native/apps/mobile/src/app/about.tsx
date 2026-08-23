/**
 * ══════════════════════════════════════════════════════════════
 *  Makhana Ghar — About Us Screen
 *  100% Matching Website About Us Page:
 *   - Story & Heritage (Since 2015)
 *   - 8-Step Traditional Processing Flow
 *   - Mission, Vision & Core Values
 *   - 6 Pillars of Quality & Export
 *   - Founders Profile
 * ══════════════════════════════════════════════════════════════
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  Globe,
  Truck,
  Sparkles,
  Users,
  Target,
  Eye,
  Heart,
  Package,
  Phone,
  MessageCircle,
} from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PROCESS_STEPS = [
  { num: '01', title: 'Pond Cultivation & Growth', desc: 'Makhana plants grow naturally in stagnant freshwater ponds of Mithila, Bihar.' },
  { num: '02', title: 'Manual Harvesting by Divers', desc: 'Skilled local farmers dive into pond beds to manually harvest mature thorny fruits.' },
  { num: '03', title: 'Extraction & Sun Drying', desc: 'Black seeds are washed thoroughly and spread under direct sunlight for 2–3 days.' },
  { num: '04', title: 'Clay Oven Roasting (Lawa)', desc: 'Dried seeds are roasted in iron pans and struck with wooden mallets to pop.' },
  { num: '05', title: 'Shell Removal & Cleaning', desc: 'Outer black shell is peeled away to reveal pristine fluffy white makhana puffs.' },
  { num: '06', title: 'Size & Density Grading', desc: 'Sorted into 4+ Sutta, 5+ Sutta, and 6+ Jumbo grades through precision grading.' },
  { num: '07', title: 'Moisture Testing & QA', desc: 'Strict moisture check (<6%) and certification testing meeting export standards.' },
  { num: '08', title: 'Sealed Export Packaging', desc: 'Sealed in moisture-proof bulk bags and nitrogen-flushed retail pouches.' },
];

const PILLARS = [
  { icon: ShieldCheck, title: 'Direct Farm Sourcing', desc: 'Sourced directly from pond farmers in Bihar, eliminating middlemen for peak freshness.' },
  { icon: Award, title: 'Export Quality Control', desc: 'Every batch undergoes multi-stage grading and laboratory moisture testing.' },
  { icon: Globe, title: 'Global Shipping & Logistics', desc: 'Supplying wholesalers, retail chains, and distributors across India, UAE, and beyond.' },
  { icon: Package, title: 'Private Labeling & Packaging', desc: 'Custom pouch sizes (100g, 250g, 500g) and 10kg bulk export cartons.' },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* ── Top Header ── */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.white} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTag}>OUR HERITAGE &amp; MISSION</Text>
          <Text style={styles.headerTitle}>About Makhana Ghar</Text>
        </View>
      </View>

      {/* ── Story Hero Card ── */}
      <View style={styles.storyHero}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/banner2.webp' }}
          style={styles.storyHeroImg}
          contentFit="cover"
        />
        <View style={styles.storyHeroOverlay}>
          <View style={styles.sinceBadge}>
            <Text style={styles.sinceText}>ESTD. 2015</Text>
          </View>
          <Text style={styles.storyHeroHeading}>From Bihar&apos;s Pristine Ponds To Global Markets</Text>
          <Text style={styles.storyHeroBody}>
            Makhana Ghar was founded to connect Bihar&apos;s traditional pond farmers with businesses and health-conscious consumers worldwide — delivering unmatched crunch, nutrition, and purity.
          </Text>
        </View>
      </View>

      {/* ── Mission, Vision, Values ── */}
      <View style={styles.sectionWrap}>
        <Text style={styles.sectionEyebrow}>WHAT DRIVES US</Text>
        <Text style={styles.sectionHeading}>Mission, Vision &amp; Values</Text>

        <View style={styles.mvvList}>
          <View style={styles.mvvCard}>
            <View style={styles.mvvIconCircle}>
              <Target size={22} color={colors.accent} />
            </View>
            <Text style={styles.mvvTitle}>Our Mission</Text>
            <Text style={styles.mvvText}>
              To make export-grade, ethically harvested Makhana accessible globally while empowering local farmers with fair trade prices.
            </Text>
          </View>

          <View style={styles.mvvCard}>
            <View style={styles.mvvIconCircle}>
              <Eye size={22} color={colors.accent} />
            </View>
            <Text style={styles.mvvTitle}>Our Vision</Text>
            <Text style={styles.mvvText}>
              To become the most trusted global superfood brand setting benchmarks in natural quality, sustainability, and transparency.
            </Text>
          </View>

          <View style={styles.mvvCard}>
            <View style={styles.mvvIconCircle}>
              <Heart size={22} color={colors.accent} />
            </View>
            <Text style={styles.mvvTitle}>Our Core Values</Text>
            <Text style={styles.mvvText}>
              Purity without compromise, strict moisture control, ethical farmer partnerships, and on-time global supply delivery.
            </Text>
          </View>
        </View>
      </View>

      {/* ── 8-Step Processing Flow ── */}
      <View style={[styles.sectionWrap, { backgroundColor: '#12260f' }]}>
        <Text style={[styles.sectionEyebrow, { color: colors.accent }]}>TRADITIONAL CRAFT</Text>
        <Text style={[styles.sectionHeading, { color: colors.white }]}>Processing of Makhana</Text>
        <Text style={styles.processIntro}>
          From underwater pond beds to packaging — step-by-step traditional harvesting &amp; roasting method:
        </Text>

        <View style={styles.processList}>
          {PROCESS_STEPS.map((step) => (
            <View key={step.num} style={styles.processCard}>
              <View style={styles.processNumberCircle}>
                <Text style={styles.processNumberText}>{step.num}</Text>
              </View>
              <View style={styles.processCardBody}>
                <Text style={styles.processCardTitle}>{step.title}</Text>
                <Text style={styles.processCardDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ── Why Choose Us Pillars ── */}
      <View style={styles.sectionWrap}>
        <Text style={styles.sectionEyebrow}>OUR ADVANTAGE</Text>
        <Text style={styles.sectionHeading}>Why Choose Makhana Ghar</Text>

        <View style={styles.pillarsGrid}>
          {PILLARS.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <View key={idx} style={styles.pillarCard}>
                <View style={styles.pillarIconWrap}>
                  <IconComponent size={24} color={colors.primaryDeep} />
                </View>
                <Text style={styles.pillarTitle}>{p.title}</Text>
                <Text style={styles.pillarDesc}>{p.desc}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── Founders Note ── */}
      <View style={styles.founderSection}>
        <View style={styles.founderHeader}>
          <Users size={20} color={colors.accent} />
          <Text style={styles.founderHeaderTitle}>Leadership &amp; Heritage</Text>
        </View>
        <Text style={styles.founderBody}>
          Founded in Katihar, Bihar, Makhana Ghar has been led by a dedicated team of agronomists and supply chain leaders dedicated to modernizing the Makhana industry while honoring traditional methods.
        </Text>
      </View>

      {/* ── Direct Contact Actions ── */}
      <View style={styles.contactBar}>
        <Pressable
          style={styles.contactBtnPrimary}
          onPress={() => Linking.openURL('https://wa.me/918002661555?text=Hi%20Makhana%20Ghar,%20I%20want%20to%20partner%20with%20you')}
        >
          <MessageCircle size={18} color={colors.textDark} />
          <Text style={styles.contactBtnPrimaryText}>WhatsApp Us</Text>
        </Pressable>

        <Pressable
          style={styles.contactBtnSecondary}
          onPress={() => Linking.openURL('tel:+918002661555')}
        >
          <Phone size={18} color={colors.white} />
          <Text style={styles.contactBtnSecondaryText}>Call Direct</Text>
        </Pressable>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f3' },
  content: { paddingBottom: spacing[8] },

  // Header
  header: {
    backgroundColor: '#152b11',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTag: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.accent,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    marginTop: 2,
  },

  // Story Hero
  storyHero: {
    height: 260,
    position: 'relative',
    justifyContent: 'flex-end',
    backgroundColor: '#10220c',
  },
  storyHeroImg: {
    ...StyleSheet.absoluteFill,
  },
  storyHeroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(16,34,12,0.8)',
    padding: spacing[5],
    justifyContent: 'flex-end',
  },
  sinceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  sinceText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.textDark,
  },
  storyHeroHeading: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
    lineHeight: 23,
  },
  storyHeroBody: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    lineHeight: 17,
  },

  // Section Wrap
  sectionWrap: {
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[4],
  },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: '900',
    color: '#2e7d32',
    letterSpacing: 1.5,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '900',
    color: '#152b11',
    marginTop: 4,
  },
  processIntro: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    lineHeight: 18,
  },

  // MVV Cards
  mvvList: {
    marginTop: spacing[5],
    gap: 12,
  },
  mvvCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: '#e1ede0',
    ...shadows.sm.rn,
  },
  mvvIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#152b11',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  mvvTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#152b11',
  },
  mvvText: {
    fontSize: 12,
    color: '#557250',
    marginTop: 4,
    lineHeight: 18,
  },

  // Process List
  processList: {
    marginTop: spacing[5],
    gap: 10,
  },
  processCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  processNumberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processNumberText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textDark,
  },
  processCardBody: {
    flex: 1,
  },
  processCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },
  processCardDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    lineHeight: 15,
  },

  // Pillars
  pillarsGrid: {
    marginTop: spacing[5],
    gap: 12,
  },
  pillarCard: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1ede0',
    ...shadows.sm.rn,
  },
  pillarIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eef6ec',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#152b11',
  },
  pillarDesc: {
    fontSize: 12,
    color: '#557250',
    marginTop: 4,
    lineHeight: 17,
  },

  // Founder Section
  founderSection: {
    marginHorizontal: spacing[4],
    backgroundColor: '#152b11',
    padding: spacing[5],
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(245,200,0,0.3)',
  },
  founderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  founderHeaderTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.accent,
  },
  founderBody: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
  },

  // Contact Bar
  contactBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: spacing[4],
    marginTop: spacing[6],
  },
  contactBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: 10,
    ...shadows.sm.rn,
  },
  contactBtnPrimaryText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textDark,
  },
  contactBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#152b11',
    paddingVertical: 13,
    borderRadius: 10,
  },
  contactBtnSecondaryText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },
});
