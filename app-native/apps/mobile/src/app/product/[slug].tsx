/**
 * Product Detail Screen — Full product page with gallery, specs, enquiry
 */
import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable,
  ActivityIndicator, Linking, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, MessageCircle, Phone } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { getProductBySlug, resolveImageUrl, type Product } from '@makhana-ghar/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug)
      .then(setProduct)
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const mainUrl = resolveImageUrl(product.mainImageUrl, product.mainImage, 'https://www.makhanaghar.in');
  const galleryUrls = [
    mainUrl,
    ...(product.galleryImages?.map((g) => resolveImageUrl(g.imageUrl, g.image, 'https://www.makhanaghar.in')) ?? []),
  ].filter(Boolean) as string[];

  return (
    <View style={styles.container}>
      {/* Back button */}
      <Pressable style={styles.backHeader} onPress={() => router.back()}>
        <ArrowLeft size={24} color={colors.white} />
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main image */}
        {galleryUrls.length > 0 && (
          <View style={styles.imageSection}>
            <Image
              source={{ uri: galleryUrls[selectedImageIdx] }}
              style={styles.mainImage}
              contentFit="cover"
              transition={300}
            />
            {/* Thumbnail row */}
            {galleryUrls.length > 1 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbRow}>
                {galleryUrls.map((url, idx) => (
                  <Pressable key={idx} onPress={() => setSelectedImageIdx(idx)}>
                    <Image
                      source={{ uri: url }}
                      style={[styles.thumb, idx === selectedImageIdx && styles.thumbActive]}
                      contentFit="cover"
                    />
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        )}

        {/* Product info */}
        <View style={styles.infoSection}>
          {product.isOrganic && (
            <View style={styles.organicTag}><Text style={styles.organicTagText}>🌿 100% Organic</Text></View>
          )}
          <Text style={styles.productName}>{product.name}</Text>
          {product.tagline && <Text style={styles.tagline}>{product.tagline}</Text>}

          {/* Rating */}
          <View style={styles.ratingRow}>
            {product.rating !== undefined && (
              <>
                <Star size={18} color={colors.accentWarm} fill={colors.accentWarm} />
                <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
                {product.reviews !== undefined && (
                  <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
                )}
              </>
            )}
            {product.grade && (
              <View style={styles.gradePill}>
                <Text style={styles.gradeText}>{product.grade}</Text>
              </View>
            )}
          </View>

          {/* Description */}
          {product.description && (
            <View style={styles.descSection}>
              <Text style={styles.descTitle}>About this product</Text>
              <Text style={styles.descBody}>{product.description}</Text>
            </View>
          )}

          {/* Specs */}
          {product.specs && product.specs.length > 0 && (
            <View style={styles.specsSection}>
              <Text style={styles.descTitle}>Specifications</Text>
              {product.specs.map((spec, idx) => (
                <View key={idx} style={[styles.specRow, idx % 2 === 0 && styles.specRowAlt]}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.bottomCall} onPress={() => Linking.openURL('tel:+919876543210')}>
          <Phone size={20} color={colors.white} />
          <Text style={styles.bottomCallText}>Call</Text>
        </Pressable>
        <Pressable style={styles.bottomWhatsapp} onPress={() => Linking.openURL(`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}`)}>
          <MessageCircle size={20} color={colors.white} />
          <Text style={styles.bottomWhatsappText}>WhatsApp</Text>
        </Pressable>
        <Pressable style={styles.bottomEnquiry} onPress={() => router.push('/enquiry' as never)}>
          <Text style={styles.bottomEnquiryText}>Send Enquiry</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  errorText: { fontSize: typography.sizes.body, color: colors.textMuted, marginBottom: spacing[4] },
  backBtn: { padding: spacing[3] },
  backBtnText: { fontSize: typography.sizes.body, color: colors.primary, fontWeight: typography.weights.semibold },
  backHeader: {
    position: 'absolute', top: 50, left: spacing[4], zIndex: 100,
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(26,46,18,0.7)',
    justifyContent: 'center', alignItems: 'center',
  },
  imageSection: { backgroundColor: colors.surface },
  mainImage: { width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.85 },
  thumbRow: { padding: spacing[3], gap: spacing[2] },
  thumb: { width: 64, height: 64, borderRadius: radii.md, borderWidth: 2, borderColor: 'transparent' },
  thumbActive: { borderColor: colors.accent },
  infoSection: { padding: spacing[5] },
  organicTag: {
    alignSelf: 'flex-start', backgroundColor: '#e8f5e9',
    paddingVertical: spacing[1], paddingHorizontal: spacing[3], borderRadius: radii.full, marginBottom: spacing[3],
  },
  organicTagText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.success },
  productName: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.textDark, lineHeight: 34 },
  tagline: { fontSize: typography.sizes.md, color: colors.textMuted, marginTop: spacing[2], lineHeight: 22 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], marginTop: spacing[4] },
  ratingText: { fontSize: typography.sizes.body, fontWeight: typography.weights.bold, color: colors.textDark },
  reviewsText: { fontSize: typography.sizes.base, color: colors.textMuted },
  gradePill: {
    backgroundColor: colors.accent, paddingVertical: spacing[1], paddingHorizontal: spacing[3], borderRadius: radii.full, marginLeft: 'auto',
  },
  gradeText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textDark },
  descSection: { marginTop: spacing[8] },
  descTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textDark, marginBottom: spacing[3] },
  descBody: { fontSize: typography.sizes.md, color: colors.textMuted, lineHeight: 24 },
  specsSection: { marginTop: spacing[8] },
  specRow: { flexDirection: 'row', paddingVertical: spacing[3], paddingHorizontal: spacing[3], borderRadius: radii.sm },
  specRowAlt: { backgroundColor: 'rgba(45,122,39,0.04)' },
  specLabel: { flex: 1, fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textDark },
  specValue: { flex: 1, fontSize: typography.sizes.base, color: colors.textMuted, textAlign: 'right' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingVertical: spacing[3], paddingHorizontal: spacing[4], gap: spacing[3],
    paddingBottom: spacing[8],
    ...shadows.nav.rn,
  },
  bottomCall: {
    flexDirection: 'row', alignItems: 'center', gap: spacing[2],
    backgroundColor: colors.primaryDeep, paddingVertical: spacing[3], paddingHorizontal: spacing[4], borderRadius: radii.sm,
  },
  bottomCallText: { color: colors.white, fontWeight: typography.weights.semibold, fontSize: typography.sizes.base },
  bottomWhatsapp: {
    flexDirection: 'row', alignItems: 'center', gap: spacing[2],
    backgroundColor: colors.whatsapp, paddingVertical: spacing[3], paddingHorizontal: spacing[4], borderRadius: radii.sm,
  },
  bottomWhatsappText: { color: colors.white, fontWeight: typography.weights.semibold, fontSize: typography.sizes.base },
  bottomEnquiry: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.accent, paddingVertical: spacing[3], borderRadius: radii.sm,
  },
  bottomEnquiryText: { color: colors.textDark, fontWeight: typography.weights.bold, fontSize: typography.sizes.md },
});
