/**
 * Blog Screen — Blog listing
 */
import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getBlogs, resolveImageUrl, type Blog } from '@makhana-ghar/core';

export default function BlogScreen() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await getBlogs({ limit: 20 });
      setBlogs(res.docs);
    } catch (e) { console.warn('Failed to load blogs:', e); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} tintColor={colors.primary} />}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Blog</Text>
        <Text style={styles.headerSub}>Insights about Makhana industry & nutrition</Text>
      </View>

      <View style={styles.list}>
        {blogs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No blog posts yet. Check back soon!</Text>
          </View>
        ) : blogs.map((blog) => {
          const imageUrl = resolveImageUrl(blog.featuredImageUrl, blog.featuredImage, 'https://www.makhanaghar.in');
          return (
            <Pressable key={blog.id} style={styles.blogCard} onPress={() => router.push(`/blog/${blog.slug}` as never)}>
              {imageUrl && <Image source={{ uri: imageUrl }} style={styles.blogImage} contentFit="cover" transition={300} />}
              <View style={styles.blogInfo}>
                <Text style={styles.blogTitle} numberOfLines={2}>{blog.title}</Text>
                {blog.excerpt && <Text style={styles.blogExcerpt} numberOfLines={3}>{blog.excerpt}</Text>}
                <View style={styles.blogMeta}>
                  {blog.category && <Text style={styles.blogCategory}>{blog.category}</Text>}
                  <Text style={styles.blogDate}>{new Date(blog.publishedDate || blog.createdAt).toLocaleDateString()}</Text>
                </View>
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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  header: { backgroundColor: colors.primaryDeep, paddingTop: 60, paddingBottom: spacing[6], paddingHorizontal: spacing[5] },
  headerTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.white },
  headerSub: { fontSize: typography.sizes.md, color: colors.textLight, marginTop: spacing[1] },
  list: { padding: spacing[4], gap: spacing[4] },
  blogCard: { backgroundColor: colors.surface, borderRadius: radii.xl, overflow: 'hidden', ...shadows.md.rn },
  blogImage: { width: '100%', height: 180 },
  blogInfo: { padding: spacing[4] },
  blogTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textDark, marginBottom: spacing[2] },
  blogExcerpt: { fontSize: typography.sizes.base, color: colors.textMuted, lineHeight: 20, marginBottom: spacing[3] },
  blogMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  blogCategory: {
    fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.primary,
    backgroundColor: colors.primaryDim, paddingVertical: 2, paddingHorizontal: spacing[2], borderRadius: radii.xs,
  },
  blogDate: { fontSize: typography.sizes.xs, color: colors.textMuted },
  emptyContainer: { padding: spacing[10], alignItems: 'center' },
  emptyText: { fontSize: typography.sizes.body, color: colors.textMuted, textAlign: 'center' },
});
