/**
 * ══════════════════════════════════════════════════════════════
 *  Makhana Ghar — Product Categories Screen
 *  Matches website ProductSlider & Categories layout
 * ══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
  Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  Package,
  Layers,
  Award,
} from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getCategories, resolveImageUrl, type Category } from '@makhana-ghar/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STATIC_CATEGORIES = [
  {
    id: '1',
    name: 'Makhana 4+ Sutta',
    slug: 'makhana-4-sutta',
    badge: 'Popular',
    desc: 'High demand round makhana flakes for wholesale distribution, retail packs, and snack manufacturing.',
    image: 'https://www.makhanaghar.in/4+.webp',
    specs: 'Standard Round • High Expansion',
  },
  {
    id: '2',
    name: 'Makhana 5+ Sutta (Export)',
    slug: 'makhana-5-sutta',
    badge: 'Best Seller',
    desc: 'Uniform large size, brilliant natural white color, perfectly crisp for premium supermarket brands.',
    image: 'https://www.makhanaghar.in/5+.webp',
    specs: 'Export Grade • Uniform Sizing',
  },
  {
    id: '3',
    name: 'Makhana 6+ Sutta (Super Jumbo)',
    slug: 'makhana-6-sutta',
    badge: 'Premium Jumbo',
    desc: 'Top-tier hand-graded jumbo fox nuts for gourmet luxury lines and international export orders.',
    image: 'https://www.makhanaghar.in/6+.webp',
    specs: 'Jumbo Size • Hand Graded',
  },
  {
    id: '4',
    name: 'Phool Makhana Lite / Roasted',
    slug: 'phool-makhana-lite',
    badge: 'Wholesale Mix',
    desc: 'Economical grade perfect for roasted snacks, namkeen mixes, curry preparation, and flour milling.',
    image: 'https://www.makhanaghar.in/4+.webp',
    specs: 'Value Pack • Versatile Utility',
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories({ limit: 20 })
      .then((res) => {
        if (res.docs.length > 0) setCategories(res.docs);
      })
      .catch(() => {});
  }, []);

  const displayList = categories.length > 0 ? categories : (STATIC_CATEGORIES as any);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* ── Top Header ── */}
      <View style={styles.header}>
        <View style={styles.goldBadge}>
          <Sparkles size={12} color={colors.primaryDeep} />
          <Text style={styles.goldBadgeText}>PRODUCT GRADES</Text>
        </View>
        <Text style={styles.headerTitle}>Explore Categories</Text>
        <Text style={styles.headerSub}>
          Precision graded by size and density for FMCG, retail packaging, and export standards.
        </Text>
      </View>

      {/* ── Category Cards ── */}
      <View style={styles.list}>
        {displayList.map((cat: any) => {
          const img = resolveImageUrl(cat.imageUrl, cat.image, 'https://www.makhanaghar.in') || cat.image || 'https://www.makhanaghar.in/4+.webp';
          return (
            <Pressable
              key={cat.id}
              style={styles.card}
              onPress={() => router.push(`/product/${cat.slug || 'makhana-4-sutta'}` as never)}
            >
              <Image source={{ uri: img }} style={styles.cardImg} contentFit="cover" />
              <View style={styles.cardOverlay}>
                <View style={styles.cardTopRow}>
                  <View style={styles.badgePill}>
                    <Text style={styles.badgePillText}>{cat.badge || 'Grade Certified'}</Text>
                  </View>
                </View>

                <View style={styles.cardBottomContent}>
                  <Text style={styles.cardTitle}>{cat.name}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>{cat.desc || cat.description || 'Premium quality makhana sourced directly from Bihar.'}</Text>
                  
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardSpecs}>{cat.specs || '100% Organic • Farm Direct'}</Text>
                    <View style={styles.viewBtn}>
                      <Text style={styles.viewBtnText}>View Grade</Text>
                      <ArrowRight size={14} color={colors.textDark} />
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* ── Custom Grade Banner ── */}
      <View style={styles.customBanner}>
        <Award size={28} color={colors.accent} />
        <Text style={styles.customTitle}>Looking for Custom Density or Private Labeling?</Text>
        <Text style={styles.customSub}>We provide customized sorting, roasting, and nitrogen packaging for retail brands.</Text>
        <Pressable
          style={styles.customBtn}
          onPress={() => Linking.openURL('https://wa.me/918002661555?text=Hi%20Makhana%20Ghar,%20I%20need%20custom%20grade%20and%20private%20label%20makhana')}
        >
          <MessageCircle size={16} color={colors.textDark} />
          <Text style={styles.customBtnText}>Talk to Export Specialist</Text>
        </Pressable>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f3' },
  content: { paddingBottom: spacing[10] },

  header: {
    backgroundColor: '#152b11',
    paddingTop: 54,
    paddingBottom: 22,
    paddingHorizontal: spacing[4],
    alignItems: 'center',
  },
  goldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.full,
    marginBottom: 6,
  },
  goldBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#152b11',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
  },
  headerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },

  list: {
    padding: spacing[4],
    gap: 16,
  },
  card: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#152b11',
    ...shadows.md.rn,
  },
  cardImg: {
    ...StyleSheet.absoluteFill,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(18,38,15,0.75)',
    padding: spacing[4],
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgePill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textDark,
  },
  cardBottomContent: {},
  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: colors.white,
  },
  cardDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    lineHeight: 17,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  cardSpecs: {
    fontSize: 11,
    color: colors.accent,
    fontWeight: '700',
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  viewBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textDark,
  },

  // Custom Banner
  customBanner: {
    marginHorizontal: spacing[4],
    backgroundColor: '#12260f',
    padding: spacing[6],
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(245,200,0,0.3)',
    marginTop: spacing[4],
  },
  customTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginTop: 8,
  },
  customSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  customBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: radii.full,
    marginTop: spacing[4],
  },
  customBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textDark,
  },
});
