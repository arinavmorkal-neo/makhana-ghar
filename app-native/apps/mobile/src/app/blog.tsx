/**
 * ══════════════════════════════════════════════════════════════
 * Blog & Insights List Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website /blog page:
 * - Hero banner with Caveat tag "Our Blog"
 * - Category filter pills
 * - Article cards with cover image, category tag, read time, date, excerpt
 * ══════════════════════════════════════════════════════════════
 */
import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getBlogs, resolveImageUrl, type Blog } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

export default function BlogScreen() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const res = await getBlogs({ limit: 50 });
      setBlogs(res.docs);
    } catch (e) {
      console.warn('Failed to load blogs:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categories = ['all', 'Makhana Health', 'Wholesale & Export', 'Recipes', 'Industry Insights'];

  const filteredBlogs =
    activeCategory === 'all'
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchData();
          }}
          tintColor={colors.primary}
        />
      }
    >
      <AppHeader showBack={true} />

      {/* ── HERO BANNER ── */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/banner1.webp' }}
          style={styles.heroBg}
          contentFit="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>Our Blog</Text>
          <Text style={styles.heroTitle}>BLOG &amp; INSIGHTS</Text>
          <View style={styles.heroRule} />
          <Text style={styles.heroBody}>
            Insights on premium Makhana sourcing, export tips, health benefits,
            and wholesale business strategies.
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
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  isActive && styles.filterPillTextActive,
                ]}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* ── BLOG LIST ── */}
      <View style={styles.blogList}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          filteredBlogs.map((blog) => {
            const imageUrl =
              resolveImageUrl(
                blog.imageUrl,
                blog.image,
                'https://www.makhanaghar.in'
              ) || 'https://www.makhanaghar.in/banner1.webp';

            return (
              <Pressable
                key={blog.id}
                style={styles.blogCard}
                onPress={() => router.push(`/blog/${blog.slug}` as never)}
              >
                <View style={styles.blogImageWrap}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.blogImage}
                    contentFit="cover"
                    transition={300}
                  />
                  {blog.category && (
                    <View style={styles.blogCategoryBadge}>
                      <Text style={styles.blogCategoryText}>
                        {blog.category}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.blogBody}>
                  <View style={styles.blogMetaRow}>
                    <View style={styles.metaItem}>
                      <Calendar size={12} color="#888" />
                      <Text style={styles.metaText}>
                        {blog.date
                          ? new Date(blog.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={12} color="#888" />
                      <Text style={styles.metaText}>
                        {blog.readTime || '5 min read'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.blogTitle}>{blog.title}</Text>
                  {blog.excerpt && (
                    <Text style={styles.blogExcerpt} numberOfLines={2}>
                      {blog.excerpt}
                    </Text>
                  )}

                  <View style={styles.readMoreRow}>
                    <Text style={styles.readMoreText}>Read Article</Text>
                    <ArrowRight size={14} color="#2e7d32" />
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
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

  blogList: {
    paddingHorizontal: spacing[4],
    gap: spacing[4],
  },
  blogCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm.rn,
  },
  blogImageWrap: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#f5faf5',
  },
  blogImage: { width: '100%', height: '100%' },
  blogCategoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#1a3a1a',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  blogCategoryText: { fontFamily: fonts.poppinsBold, color: colors.accentWarm, fontSize: 10 },

  blogBody: { padding: spacing[4] },
  blogMetaRow: { flexDirection: 'row', gap: 12, marginBottom: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: fonts.dmSans, fontSize: 11, color: '#888' },

  blogTitle: {
    fontFamily: fonts.poppinsBold,
    fontSize: 16,
    color: '#1a2e12',
    lineHeight: 22,
    marginBottom: 6,
  },
  blogExcerpt: {
    fontFamily: fonts.dmSans,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#f0ebe3',
    paddingTop: 10,
  },
  readMoreText: {
    fontFamily: fonts.poppinsBold,
    fontSize: 12,
    color: '#2e7d32',
  },
});
