/**
 * Blog Detail Screen
 */
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { colors, typography, spacing, radii } from '@makhana-ghar/design-system';
import { getBlogBySlug, resolveImageUrl, type Blog } from '@makhana-ghar/core';

export default function BlogDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug).then(setBlog).catch(console.warn).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  if (!blog) return (
    <View style={styles.center}>
      <Text style={styles.errorText}>Blog post not found</Text>
      <Pressable onPress={() => router.back()}><Text style={styles.linkText}>← Go Back</Text></Pressable>
    </View>
  );

  const imageUrl = resolveImageUrl(blog.featuredImageUrl, blog.featuredImage, 'https://www.makhanaghar.in');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <ArrowLeft size={24} color={colors.white} />
      </Pressable>

      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.heroImage} contentFit="cover" transition={400} />}

      <View style={styles.content}>
        <Text style={styles.title}>{blog.title}</Text>
        <View style={styles.metaRow}>
          {blog.category && <Text style={styles.category}>{blog.category}</Text>}
          <Text style={styles.date}>{new Date(blog.publishedDate || blog.createdAt).toLocaleDateString()}</Text>
        </View>
        {blog.excerpt && <Text style={styles.excerpt}>{blog.excerpt}</Text>}
        {/* Rich text content would go here — for now showing excerpt */}
        <Text style={styles.bodyNote}>
          Full blog content available on our website: makhanaghar.in/blog/{blog.slug}
        </Text>
      </View>

      <View style={{ height: spacing[20] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  errorText: { fontSize: typography.sizes.body, color: colors.textMuted, marginBottom: spacing[4] },
  linkText: { fontSize: typography.sizes.body, color: colors.primary, fontWeight: typography.weights.semibold },
  backBtn: {
    position: 'absolute', top: 50, left: spacing[4], zIndex: 100,
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(26,46,18,0.7)',
    justifyContent: 'center', alignItems: 'center',
  },
  heroImage: { width: '100%', height: 280 },
  content: { padding: spacing[5] },
  title: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.textDark, lineHeight: 34 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginTop: spacing[3], marginBottom: spacing[5] },
  category: {
    fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.primary,
    backgroundColor: colors.primaryDim, paddingVertical: 2, paddingHorizontal: spacing[2], borderRadius: radii.xs,
  },
  date: { fontSize: typography.sizes.xs, color: colors.textMuted },
  excerpt: { fontSize: typography.sizes.body, color: colors.textMuted, lineHeight: 26, marginBottom: spacing[5] },
  bodyNote: { fontSize: typography.sizes.base, color: colors.textMuted, fontStyle: 'italic', marginTop: spacing[4], lineHeight: 22 },
});
