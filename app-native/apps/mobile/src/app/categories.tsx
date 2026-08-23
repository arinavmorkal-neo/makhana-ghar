/**
 * Categories Screen — Browse product categories
 */
import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getCategories, resolveImageUrl, type Category } from '@makhana-ghar/core';

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await getCategories({ limit: 50 });
      setCategories(res.docs);
    } catch (e) { console.warn('Failed to load categories:', e); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} tintColor={colors.primary} />}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <Text style={styles.headerSub}>Explore our premium makhana range</Text>
      </View>

      <View style={styles.grid}>
        {categories.map((cat) => {
          const imageUrl = resolveImageUrl(cat.imageUrl, cat.image, 'https://www.makhanaghar.in');
          const productCount = cat.products?.length ?? 0;

          return (
            <Pressable key={cat.id} style={styles.card} onPress={() => router.push('/products')}>
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.cardImage} contentFit="cover" transition={300} />
              ) : (
                <View style={[styles.cardImage, styles.cardPlaceholder]}>
                  <Text style={styles.cardIcon}>{cat.icon || '📦'}</Text>
                </View>
              )}
              <View style={styles.cardOverlay}>
                <Text style={styles.cardIcon2}>{cat.icon || '📦'}</Text>
                <Text style={styles.cardName}>{cat.name}</Text>
                {productCount > 0 && (
                  <Text style={styles.cardCount}>{productCount} products</Text>
                )}
                {cat.featured && (
                  <View style={styles.featuredBadge}><Text style={styles.featuredText}>⭐ Featured</Text></View>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ height: spacing[20] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: {},
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  header: { backgroundColor: colors.primaryDeep, paddingTop: 60, paddingBottom: spacing[6], paddingHorizontal: spacing[5] },
  headerTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.white },
  headerSub: { fontSize: typography.sizes.md, color: colors.textLight, marginTop: spacing[1] },
  grid: { padding: spacing[4], gap: spacing[4] },
  card: { borderRadius: radii.xl, overflow: 'hidden', ...shadows.md.rn, backgroundColor: colors.surface },
  cardImage: { width: '100%', height: 160 },
  cardPlaceholder: { backgroundColor: colors.primaryDeep, justifyContent: 'center', alignItems: 'center' },
  cardIcon: { fontSize: 48 },
  cardOverlay: { padding: spacing[4] },
  cardIcon2: { fontSize: 24, marginBottom: spacing[1] },
  cardName: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textDark },
  cardCount: { fontSize: typography.sizes.base, color: colors.textMuted, marginTop: spacing[1] },
  featuredBadge: {
    marginTop: spacing[2], alignSelf: 'flex-start',
    backgroundColor: 'rgba(245,200,0,0.12)', paddingVertical: spacing[1], paddingHorizontal: spacing[3], borderRadius: radii.full,
  },
  featuredText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.accent },
});
