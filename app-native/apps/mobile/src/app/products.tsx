/**
 * ══════════════════════════════════════════════════════════════
 *  Makhana Ghar — Products Catalog Screen
 *  Matches website ProductSection & ProductSlider styles
 * ══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useCallback } from 'react';
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
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  Search,
  MessageCircle,
  Phone,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Leaf,
  CheckCircle,
} from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getProducts, resolveImageUrl, type Product } from '@makhana-ghar/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing[4] * 3) / 2;

const GRADE_FILTERS = ['All Grades', '4+ Sutta', '5+ Sutta', '6+ Sutta', 'Lite / Raw'];

const FALLBACK_PRODUCTS = [
  {
    id: '1',
    name: 'Makhana 4+ Sutta (Hand Picked)',
    slug: 'makhana-4-sutta',
    grade: '4+ Sutta',
    category: 'Round Flake',
    isOrganic: true,
    rating: 4.9,
    description: 'Crisp, perfectly popped medium round fox nuts ideal for snacking and packaging.',
    mainImageUrl: 'https://www.makhanaghar.in/4+.webp',
  },
  {
    id: '2',
    name: 'Makhana 5+ Sutta (Export Quality)',
    slug: 'makhana-5-sutta',
    grade: '5+ Sutta',
    category: 'Export Quality',
    isOrganic: true,
    rating: 4.9,
    description: 'Uniform large size, high volume expansion, pristine white color.',
    mainImageUrl: 'https://www.makhanaghar.in/5+.webp',
  },
  {
    id: '3',
    name: 'Makhana 6+ Sutta (Super Jumbo)',
    slug: 'makhana-6-sutta',
    grade: '6+ Super Jumbo',
    category: 'Premium Selection',
    isOrganic: true,
    rating: 5.0,
    description: 'Extra large premium popped lotus seeds for luxury gourmet and international export.',
    mainImageUrl: 'https://www.makhanaghar.in/6+.webp',
  },
  {
    id: '4',
    name: 'Phool Makhana Lite (Raw Roasted)',
    slug: 'phool-makhana-lite',
    grade: 'Lite Grade',
    category: 'Standard Pack',
    isOrganic: true,
    rating: 4.7,
    description: 'Cost-effective wholesale grade suitable for flavored roasting and sweet preparations.',
    mainImageUrl: 'https://www.makhanaghar.in/4+.webp',
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      const res = await getProducts({ limit: 50 });
      if (res.docs.length > 0) {
        setProducts(res.docs);
      } else {
        setProducts(FALLBACK_PRODUCTS as any);
      }
    } catch {
      setProducts(FALLBACK_PRODUCTS as any);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const displayList = products.length > 0 ? products : (FALLBACK_PRODUCTS as any);

  const filtered = displayList.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (selectedGrade === 'All Grades') return true;
    if (selectedGrade === '4+ Sutta') return p.name.includes('4') || (p.grade && p.grade.includes('4'));
    if (selectedGrade === '5+ Sutta') return p.name.includes('5') || (p.grade && p.grade.includes('5'));
    if (selectedGrade === '6+ Sutta') return p.name.includes('6') || (p.grade && p.grade.includes('6'));
    if (selectedGrade === 'Lite / Raw') return p.name.toLowerCase().includes('lite') || (p.grade && p.grade.toLowerCase().includes('lite'));
    return true;
  });

  return (
    <View style={styles.container}>
      {/* ── TOP BANNER ── */}
      <View style={styles.headerBanner}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.headerTag}>WHOLESALE CATALOG</Text>
            <Text style={styles.headerTitle}>Makhana Products</Text>
          </View>
          <Pressable
            style={styles.headerWaBtn}
            onPress={() => Linking.openURL('https://wa.me/918002661555?text=Hi%20Makhana%20Ghar,%20please%20send%20full%20product%20catalog%20and%20rates')}
          >
            <MessageCircle size={16} color={colors.textDark} />
            <Text style={styles.headerWaText}>WhatsApp Price List</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search grades (e.g. 4+, 5+, 6+, organic)..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* ── FILTER PILLS ── */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {GRADE_FILTERS.map((grade) => (
            <Pressable
              key={grade}
              style={[styles.filterPill, selectedGrade === grade && styles.filterPillActive]}
              onPress={() => setSelectedGrade(grade)}
            >
              <Text style={[styles.filterText, selectedGrade === grade && styles.filterTextActive]}>
                {grade}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* ── PRODUCTS LIST ── */}
      <ScrollView
        contentContainerStyle={styles.gridContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadProducts(); }} tintColor={colors.accent} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filtered.map((item: any) => {
            const img = resolveImageUrl(item.mainImageUrl, item.mainImage, 'https://www.makhanaghar.in') || 'https://www.makhanaghar.in/4+.webp';
            return (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() => router.push(`/product/${item.slug || 'makhana-4-sutta'}` as never)}
              >
                <View style={styles.cardImgWrapper}>
                  <Image source={{ uri: img }} style={styles.cardImg} contentFit="cover" transition={200} />
                  <View style={styles.gradeTag}>
                    <Text style={styles.gradeTagText}>{item.grade || 'Export Grade'}</Text>
                  </View>
                  {item.isOrganic && (
                    <View style={styles.organicTag}>
                      <Leaf size={10} color={colors.success} />
                      <Text style={styles.organicTagText}>100% Organic</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardCategory}>{item.category || 'Mithila Harvest'}</Text>
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
                  {item.description && (
                    <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
                  )}

                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.priceLabel}>Wholesale Pricing</Text>
                      <Text style={styles.priceRate}>Direct Factory Rate</Text>
                    </View>
                    <View style={styles.enquireBtn}>
                      <Text style={styles.enquireBtnText}>Enquire</Text>
                      <ArrowRight size={12} color={colors.textDark} />
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Bottom Banner */}
        <View style={styles.bulkNotice}>
          <Sparkles size={20} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.bulkNoticeTitle}>Need Custom Packaging or White Labeling?</Text>
            <Text style={styles.bulkNoticeSub}>We supply in 100g, 250g, 500g pouches and 10kg, 20kg bulk export cartons.</Text>
          </View>
          <Pressable
            style={styles.bulkCallBtn}
            onPress={() => Linking.openURL('tel:+918002661555')}
          >
            <Phone size={14} color={colors.white} />
            <Text style={styles.bulkCallText}>Call</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f3' },

  // Header Banner
  headerBanner: {
    backgroundColor: '#152b11',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: spacing[4],
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTag: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.accent,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
    marginTop: 2,
  },
  headerWaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radii.full,
  },
  headerWaText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textDark,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.white,
  },

  // Filter Row
  filterContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0ece0',
  },
  filterRow: {
    paddingHorizontal: spacing[4],
    paddingVertical: 10,
    gap: 8,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radii.full,
    backgroundColor: '#f0f5ee',
    borderWidth: 1,
    borderColor: '#d5e5d3',
  },
  filterPillActive: {
    backgroundColor: '#152b11',
    borderColor: '#152b11',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#335030',
  },
  filterTextActive: {
    color: colors.white,
  },

  // Grid
  gridContent: {
    padding: spacing[4],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e1ede0',
    ...shadows.sm.rn,
    marginBottom: spacing[2],
  },
  cardImgWrapper: {
    height: CARD_WIDTH * 0.95,
    backgroundColor: '#eef5ec',
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  gradeTag: {
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
  gradeTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accent,
  },
  organicTag: {
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
  organicTagText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.success,
  },
  cardBody: {
    padding: 10,
  },
  cardCategory: {
    fontSize: 9,
    fontWeight: '700',
    color: '#2e7d32',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#152b11',
    marginTop: 2,
    lineHeight: 17,
  },
  cardDesc: {
    fontSize: 10,
    color: '#6e8c69',
    marginTop: 4,
    lineHeight: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f5ee',
  },
  priceLabel: {
    fontSize: 9,
    color: '#888',
  },
  priceRate: {
    fontSize: 10,
    fontWeight: '800',
    color: '#152b11',
  },
  enquireBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  enquireBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textDark,
  },

  // Bulk notice
  bulkNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#12260f',
    padding: spacing[4],
    borderRadius: 12,
    marginTop: spacing[4],
    borderWidth: 1,
    borderColor: 'rgba(245,200,0,0.3)',
  },
  bulkNoticeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },
  bulkNoticeSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    lineHeight: 15,
  },
  bulkCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#2d7a27',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  bulkCallText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
  },
});
