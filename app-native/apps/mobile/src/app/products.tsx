/**
 * Products Screen — Browse all products with category filter
 */
import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, RefreshControl,
  Pressable, Dimensions, ActivityIndicator, FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getProducts, getCategories, resolveImageUrl, type Product, type Category } from '@makhana-ghar/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_W = (SCREEN_WIDTH - spacing[4] * 3) / 2;

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        getProducts({ limit: 50 }),
        getCategories({ limit: 20 }),
      ]);
      setProducts(pRes.docs);
      setCategories(cRes.docs);
    } catch (e) { console.warn('Failed to load products:', e); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = selectedCategory
    ? products.filter((p) => {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (!cat?.products) return false;
        return cat.products.some((cp) => (typeof cp === 'string' ? cp : cp.id) === p.id);
      })
    : products;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Products</Text>
        <Text style={styles.headerSub}>Premium Makhana — Direct from Bihar</Text>
      </View>

      {/* Category filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
        <Pressable
          style={[styles.filterPill, !selectedCategory && styles.filterPillActive]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.filterText, !selectedCategory && styles.filterTextActive]}>All</Text>
        </Pressable>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            style={[styles.filterPill, selectedCategory === cat.slug && styles.filterPillActive]}
            onPress={() => setSelectedCategory(cat.slug === selectedCategory ? null : cat.slug)}
          >
            <Text style={styles.filterIcon}>{cat.icon || '📦'}</Text>
            <Text style={[styles.filterText, selectedCategory === cat.slug && styles.filterTextActive]}>{cat.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product grid */}
      <FlatList
        data={filtered}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} tintColor={colors.primary} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item: product }) => {
          const imageUrl = resolveImageUrl(product.mainImageUrl, product.mainImage, 'https://www.makhanaghar.in');
          return (
            <Pressable style={styles.card} onPress={() => router.push(`/product/${product.slug}` as never)}>
              {imageUrl && <Image source={{ uri: imageUrl }} style={styles.cardImage} contentFit="cover" transition={300} />}
              <View style={styles.cardInfo}>
                <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>
                {product.grade && (
                  <View style={styles.badge}><Text style={styles.badgeText}>{product.grade}</Text></View>
                )}
                {product.rating !== undefined && <Text style={styles.cardRating}>⭐ {product.rating.toFixed(1)}</Text>}
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  header: { backgroundColor: colors.primaryDeep, paddingTop: 60, paddingBottom: spacing[6], paddingHorizontal: spacing[5] },
  headerTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.white },
  headerSub: { fontSize: typography.sizes.md, color: colors.textLight, marginTop: spacing[1] },
  filterRow: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  filterContent: { paddingHorizontal: spacing[4], paddingVertical: spacing[3], gap: spacing[2] },
  filterPill: {
    flexDirection: 'row', alignItems: 'center', gap: spacing[1],
    paddingVertical: spacing[2], paddingHorizontal: spacing[4],
    borderRadius: radii.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
  },
  filterPillActive: { backgroundColor: colors.primaryDeep, borderColor: colors.primaryDeep },
  filterIcon: { fontSize: 14 },
  filterText: { fontSize: typography.sizes.base, fontWeight: typography.weights.medium, color: colors.textDark },
  filterTextActive: { color: colors.white },
  gridRow: { paddingHorizontal: spacing[4], gap: spacing[3] },
  gridContent: { paddingTop: spacing[4], paddingBottom: spacing[20] },
  card: { width: CARD_W, backgroundColor: colors.surface, borderRadius: radii.xl, overflow: 'hidden', ...shadows.md.rn, marginBottom: spacing[3] },
  cardImage: { width: '100%', height: CARD_W * 1.1 },
  cardInfo: { padding: spacing[3], backgroundColor: 'rgba(26,46,18,0.92)' },
  cardName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.white, marginBottom: spacing[1] },
  badge: {
    backgroundColor: 'rgba(245,200,0,0.12)', borderWidth: 1, borderColor: 'rgba(245,200,0,0.35)',
    borderRadius: radii['3xl'], paddingHorizontal: spacing[2], paddingVertical: 2, alignSelf: 'flex-start', marginBottom: spacing[1],
  },
  badgeText: { fontSize: 9, fontWeight: typography.weights.semibold, color: colors.accent, letterSpacing: 0.3 },
  cardRating: { fontSize: typography.sizes.xs, color: colors.accentWarm },
  emptyContainer: { padding: spacing[10], alignItems: 'center' },
  emptyText: { fontSize: typography.sizes.body, color: colors.textMuted },
});
