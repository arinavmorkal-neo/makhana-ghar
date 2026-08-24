/**
 * ══════════════════════════════════════════════════════════════
 * Blog Detail Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website /blog/[slug] design:
 * - Top Hero banner with article title & category tag
 * - Breadcrumb navigation
 * - Author, date, read-time badge
 * - Cover image
 * - Article content blocks / body
 * - Bottom CTA for wholesale inquiries
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
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { User, Calendar, Clock } from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getBlogBySlug, resolveImageUrl, type Blog } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../../components';

export default function BlogDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getBlogBySlug(slug)
      .then(setBlog)
      .catch((e) => console.warn('Failed to load blog:', e))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading article...</Text>
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Article Not Found</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Back to Blog</Text>
        </Pressable>
      </View>
    );
  }

  const imageUrl =
    resolveImageUrl(blog.imageUrl, blog.image, 'https://www.makhanaghar.in') ||
    'https://www.makhanaghar.in/banner1.webp';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppHeader showBack={true} />

      {/* ── HERO BANNER ── */}
      <View style={styles.heroSection}>
        <Image source={{ uri: imageUrl }} style={styles.heroBg} contentFit="cover" />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>{blog.category || 'Makhana Insights'}</Text>
          <Text style={styles.heroTitle}>{blog.title}</Text>
        </View>

        {/* Decorative White Grass Edge Image */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grassnew-white.png' }}
          style={styles.heroGrass}
          contentFit="cover"
        />
      </View>

      {/* ── BREADCRUMB ── */}
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbLink} onPress={() => router.push('/')}>
          Home
        </Text>
        <Text style={styles.breadcrumbSep}>›</Text>
        <Text style={styles.breadcrumbLink} onPress={() => router.push('/blog')}>
          Blog
        </Text>
        <Text style={styles.breadcrumbSep}>›</Text>
        <Text style={styles.breadcrumbCurrent} numberOfLines={1}>
          {blog.title}
        </Text>
      </View>

      {/* ── ARTICLE BODY ── */}
      <View style={styles.content}>
        {/* Meta */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <User size={13} color="#2e7d32" />
            <Text style={styles.metaText}>{blog.author || 'Makhana Ghar'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Calendar size={13} color="#2e7d32" />
            <Text style={styles.metaText}>
              {blog.date
                ? new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent'}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={13} color="#2e7d32" />
            <Text style={styles.metaText}>{blog.readTime || '5 min read'}</Text>
          </View>
        </View>

        {blog.excerpt && <Text style={styles.leadExcerpt}>{blog.excerpt}</Text>}

        {/* Text Content */}
        <Text style={styles.articleBody}>
          {typeof blog.content === 'string'
            ? blog.content
            : blog.excerpt ||
              'Makhana (Fox Nuts or Euryale Ferox) is one of the most revered ancient superfoods, cultivated in the freshwater wetlands and ponds of Bihar. Rich in plant protein, antioxidants, calcium, and essential minerals, Makhana has emerged as a premium healthy snack across global markets.'}
        </Text>

        {/* Bottom CTA */}
        <View style={styles.bottomCta}>
          <Text style={styles.bottomCtaTitle}>Interested in Wholesale Supply?</Text>
          <Text style={styles.bottomCtaBody}>
            Makhana Ghar provides 4+, 5+, and 6+ Suta grades with custom
            packaging, export certification, and competitive bulk rates.
          </Text>
          <Pressable
            style={styles.bottomCtaBtn}
            onPress={() => router.push('/enquiry' as never)}
          >
            <Text style={styles.bottomCtaBtnText}>Request Price List</Text>
          </Pressable>
        </View>
      </View>

      {/* Reusable Verified AppFooter */}
      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    padding: spacing[5],
  },
  loadingText: { marginTop: spacing[3], fontSize: 13, color: colors.textMuted },
  errorTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textDark },
  backBtn: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radii.full,
    marginTop: 12,
  },
  backBtnText: { color: colors.white, fontWeight: '700', fontSize: 13 },

  // Hero
  heroSection: { height: 280, position: 'relative' },
  heroBg: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(26,46,18,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: 12,
    paddingBottom: 16,
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
  heroTag: {
    fontFamily: fonts.poppinsBold,
    fontSize: 13,
    color: colors.accentWarm,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  heroTitle: {
    fontFamily: fonts.poppinsBold,
    fontSize: 22,
    color: colors.white,
    lineHeight: 28,
    marginTop: 4,
    textAlign: 'center',
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe3',
  },
  breadcrumbLink: { fontFamily: fonts.dmSans, fontSize: 12, color: '#999' },
  breadcrumbSep: { marginHorizontal: 6, color: '#ccc', fontSize: 12 },
  breadcrumbCurrent: { fontFamily: fonts.poppinsBold, fontSize: 12, color: '#1a3a1a', flex: 1 },

  content: {
    backgroundColor: colors.white,
    padding: spacing[5],
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe3',
    marginBottom: spacing[4],
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: fonts.dmSans, fontSize: 12, color: '#666' },
  leadExcerpt: {
    fontFamily: fonts.dmSans,
    fontSize: 14,
    color: '#1a2e12',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: spacing[4],
  },
  articleBody: {
    fontFamily: fonts.dmSans,
    fontSize: 14,
    color: '#444',
    lineHeight: 24,
    marginBottom: spacing[6],
  },

  // Bottom CTA
  bottomCta: {
    backgroundColor: '#fafdf9',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#dce8da',
    padding: spacing[5],
  },
  bottomCtaTitle: { fontFamily: fonts.poppinsExtraBold, fontSize: 16, color: '#1a2e12', marginBottom: 4 },
  bottomCtaBody: { fontFamily: fonts.dmSans, fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 12 },
  bottomCtaBtn: {
    backgroundColor: '#1a3a1a',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
  bottomCtaBtnText: { fontFamily: fonts.poppinsBold, color: colors.white, fontSize: 12 },
});
