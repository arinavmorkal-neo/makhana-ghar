/**
 * Gallery Screen
 */
import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, Dimensions, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowLeft, X } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getGalleryItems, resolveImageUrl, type GalleryItem } from '@makhana-ghar/core';

const { width: SW } = Dimensions.get('window');
const THUMB = (SW - spacing[4] * 3) / 2;

export default function GalleryScreen() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    getGalleryItems({ limit: 50 })
      .then((res) => setItems(res.docs))
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Gallery</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {items.map((item) => {
          const url = resolveImageUrl(item.imageUrl, item.image, 'https://www.makhanaghar.in');
          if (!url) return null;
          return (
            <Pressable key={item.id} onPress={() => setSelectedUrl(url)} style={styles.thumbWrap}>
              <Image source={{ uri: url }} style={styles.thumb} contentFit="cover" transition={300} />
              {item.title && <Text style={styles.thumbCaption} numberOfLines={1}>{item.title}</Text>}
            </Pressable>
          );
        })}
        <View style={{ height: spacing[20] }} />
      </ScrollView>

      {/* Lightbox modal */}
      <Modal visible={!!selectedUrl} transparent animationType="fade">
        <Pressable style={styles.lightbox} onPress={() => setSelectedUrl(null)}>
          <Pressable style={styles.closeBtn} onPress={() => setSelectedUrl(null)}>
            <X size={24} color={colors.white} />
          </Pressable>
          {selectedUrl && <Image source={{ uri: selectedUrl }} style={styles.lightboxImage} contentFit="contain" />}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: spacing[4],
    backgroundColor: colors.primaryDeep, paddingTop: 54, paddingBottom: spacing[5], paddingHorizontal: spacing[5],
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.white },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], padding: spacing[4] },
  thumbWrap: { width: THUMB, borderRadius: radii.md, overflow: 'hidden', ...shadows.sm.rn },
  thumb: { width: THUMB, height: THUMB },
  thumbCaption: { padding: spacing[2], fontSize: typography.sizes.xs, color: colors.textMuted, backgroundColor: colors.surface },
  lightbox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  closeBtn: { position: 'absolute', top: 50, right: spacing[5], zIndex: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  lightboxImage: { width: SW - spacing[8], height: SW - spacing[8] },
});
