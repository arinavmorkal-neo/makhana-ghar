/**
 * ══════════════════════════════════════════════════════════════
 * Photo Gallery Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website /gallery page:
 * - Hero banner with Caveat tag "Visual Journey"
 * - Dynamic category filters (All, Products, Farm, Packaging, Factory)
 * - 2-column image grid with zoom modal and captions
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
  Modal,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowLeft, X, ZoomIn } from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getGalleryItems, resolveImageUrl, type GalleryItem } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - spacing[4] * 3) / 2;

const fallbackGallery = [
  { id: '1', title: '6+ Suta Jumbo Premium', category: 'products', imageUrl: 'https://www.makhanaghar.in/6+.webp' },
  { id: '2', title: '5+ Suta Medium Grade', category: 'products', imageUrl: 'https://www.makhanaghar.in/5+.webp' },
  { id: '3', title: '4+ Suta Flake Selection', category: 'products', imageUrl: 'https://www.makhanaghar.in/4+.webp' },
  { id: '4', title: 'Fresh Harvest from Bihar Ponds', category: 'farm', imageUrl: 'https://www.makhanaghar.in/banner2.webp' },
  { id: '5', title: 'Quality Sorting & Grading Facility', category: 'factory', imageUrl: 'https://www.makhanaghar.in/banner1.webp' },
  { id: '6', title: 'Export-Grade Packaging', category: 'packaging', imageUrl: 'https://www.makhanaghar.in/new-section.webp' },
];

export default function GalleryScreen() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    getGalleryItems()
      .then((res) => {
        if (res.docs && res.docs.length > 0) {
          setItems(res.docs);
        } else {
          setItems(fallbackGallery as any);
        }
      })
      .catch(() => setItems(fallbackGallery as any))
      .finally(() => setLoading(false));
  }, []);

  const filters = [
    { key: 'all', label: 'All Photos' },
    { key: 'products', label: 'Products' },
    { key: 'farm', label: 'Farm & Harvest' },
    { key: 'factory', label: 'Factory & QA' },
    { key: 'packaging', label: 'Packaging' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? items
      : items.filter((item) => item.category === activeFilter);

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
          <Text style={styles.heroTag}>Visual Journey</Text>
          <Text style={styles.heroTitle}>OUR GALLERY</Text>
          <View style={styles.heroRule} />
          <Text style={styles.heroBody}>
            Explore our world — from lush Bihar lotus wetlands to state-of-the-art
            processing and export-grade packaging.
          </Text>
        </View>

        {/* Decorative White Grass Edge Image */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grassnew-white.png' }}
          style={styles.heroGrass}
          contentFit="cover"
        />
      </View>

      {/* ── FILTERS ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {filters.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <Pressable
              key={f.key}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              onPress={() => setActiveFilter(f.key)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  isActive && styles.filterPillTextActive,
                ]}
              >
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* ── IMAGE GRID ── */}
      <View style={styles.gridContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View style={styles.grid}>
            {filteredItems.map((item) => {
              const url =
                resolveImageUrl(
                  item.imageUrl,
                  item.image,
                  'https://www.makhanaghar.in'
                ) || 'https://www.makhanaghar.in/4+.webp';

              return (
                <Pressable
                  key={item.id}
                  style={styles.gridCard}
                  onPress={() => setSelectedImg({ url, title: item.title || 'Makhana Ghar' })}
                >
                  <Image
                    source={{ uri: url }}
                    style={styles.gridImage}
                    contentFit="cover"
                    transition={300}
                  />
                  <View style={styles.cardZoomOverlay}>
                    <ZoomIn size={16} color={colors.white} />
                  </View>
                  <View style={styles.captionBar}>
                    <Text style={styles.captionText} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {/* ── ZOOM MODAL ── */}
      <Modal visible={!!selectedImg} transparent animationType="fade">
        <View style={styles.modalBg}>
          <Pressable
            style={styles.modalCloseBtn}
            onPress={() => setSelectedImg(null)}
          >
            <X size={24} color={colors.white} />
          </Pressable>

          {selectedImg && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImg.url }}
                style={styles.modalImage}
                contentFit="contain"
              />
              <Text style={styles.modalCaption}>{selectedImg.title}</Text>
            </View>
          )}
        </View>
      </Modal>

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

  filterScroll: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    gap: 8,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterPillActive: {
    backgroundColor: '#1a3a1a',
    borderColor: '#1a3a1a',
  },
  filterPillText: { fontFamily: fonts.dmSansMedium, fontSize: 12, color: '#555' },
  filterPillTextActive: { color: colors.white, fontFamily: fonts.poppinsBold },

  gridContainer: { paddingHorizontal: spacing[4] },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  gridCard: {
    width: GRID_ITEM_WIDTH,
    height: GRID_ITEM_WIDTH * 1.1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    ...shadows.sm.rn,
  },
  gridImage: { width: '100%', height: '100%' },
  cardZoomOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26,46,18,0.92)',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  captionText: { fontFamily: fonts.poppinsSemiBold, fontSize: 11, color: colors.white },

  // Modal
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 48,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: { width: '100%', alignItems: 'center' },
  modalImage: { width: '100%', height: 380, borderRadius: 12 },
  modalCaption: {
    fontFamily: fonts.poppinsBold,
    color: colors.white,
    fontSize: 15,
    marginTop: 14,
    textAlign: 'center',
  },
});
