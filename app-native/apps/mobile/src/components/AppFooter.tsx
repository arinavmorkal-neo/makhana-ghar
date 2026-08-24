import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect, Line, Circle } from 'react-native-svg';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
} from 'lucide-react-native';
import { fonts } from '@makhana-ghar/design-system';
import { submitEnquiry } from '@makhana-ghar/core';

/* ── Inline SVG Brand Icons for Footer ── */
const FacebookIcon = ({ size = 18, color = '#0d2d1a', strokeWidth = 2 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Svg>
);

const InstagramIcon = ({ size = 18, color = '#0d2d1a', strokeWidth = 2 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <Path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <Line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </Svg>
);

const TwitterIcon = ({ size = 18, color = '#0d2d1a', strokeWidth = 2 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </Svg>
);

const LinkedinIcon = ({ size = 18, color = '#0d2d1a', strokeWidth = 2 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <Rect x="2" y="9" width="4" height="12" />
    <Circle cx="4" cy="4" r="2" />
  </Svg>
);

export function AppFooter() {
  const router = useRouter();
  const [footerName, setFooterName] = useState('');
  const [footerPhone, setFooterPhone] = useState('');
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerSuccess, setFooterSuccess] = useState(false);

  const handleFooterCallbackSubmit = async () => {
    if (!footerName.trim() || !footerPhone.trim()) {
      return;
    }
    setFooterLoading(true);
    try {
      await submitEnquiry({
        name: footerName.trim(),
        countryCode: '+91',
        contact: footerPhone.trim(),
        email: 'N/A',
        product: 'Makhana Wholesale Inquiry',
        message: 'Footer Quick Callback Request',
        sourceComponent: 'Mobile App Footer Quick Enquiry',
      });
      setFooterSuccess(true);
      setFooterName('');
      setFooterPhone('');
      setTimeout(() => setFooterSuccess(false), 5000);
    } catch (e) {
      console.warn('Footer submit error:', e);
      // Still show smooth feedback
      setFooterSuccess(true);
      setFooterName('');
      setFooterPhone('');
      setTimeout(() => setFooterSuccess(false), 5000);
    } finally {
      setFooterLoading(false);
    }
  };

  return (
    <View style={styles.footerSection}>
      {/* Decorative Green Grass Edge at Bottom of previous section / Top of Footer */}
      <View style={styles.footerGrassWrap}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grass-green.webp' }}
          style={styles.footerGrassImg}
          contentFit="fill"
        />
      </View>

      {/* Top bar: Brand Logo + Cursive Tagline + 4 Yellow Round Social Buttons */}
      <View style={styles.footerTopBar}>
        <Image
          source={{ uri: 'https://www.makhanaghar.in/logo.webp' }}
          style={styles.footerLogo}
          contentFit="contain"
        />
        <Text style={styles.footerTagline}>
          Best Makhana Manufacturing Company
        </Text>

        <View style={styles.footerSocialsRow}>
          <Pressable
            style={styles.footerSocialCircle}
            onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61590384691167')}
          >
            <FacebookIcon size={18} color="#0d2d1a" strokeWidth={2.2} />
          </Pressable>
          <Pressable
            style={styles.footerSocialCircle}
            onPress={() => Linking.openURL('https://www.instagram.com/makhanaghar/')}
          >
            <InstagramIcon size={18} color="#0d2d1a" strokeWidth={2.2} />
          </Pressable>
          <Pressable
            style={styles.footerSocialCircle}
            onPress={() => Linking.openURL('https://x.com/makhanaghar')}
          >
            <TwitterIcon size={18} color="#0d2d1a" strokeWidth={2.2} />
          </Pressable>
          <Pressable
            style={styles.footerSocialCircle}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/makhana-ghar-a155ba41a')}
          >
            <LinkedinIcon size={18} color="#0d2d1a" strokeWidth={2.2} />
          </Pressable>
        </View>
      </View>

      {/* ── About Us! Block ── */}
      <View style={styles.footerAboutBlock}>
        <Text style={styles.footerColTitle}>About Us!</Text>
        <View style={styles.footerTitleUnderline} />

        <Text style={styles.footerDesc}>
          Makhana Ghar is a global exporter and supplier of premium-quality
          Makhana, serving international distributors, wholesalers, importers,
          and bulk buyers. We specialize exclusively in Makhana, sourced from
          trusted suppliers in India and carefully selected to meet global quality
          standards. With a strong focus on quality, competitive pricing, and
          reliable supply, we deliver export-grade Makhana to customers across
          international markets.
        </Text>

        {/* Contact details */}
        <View style={styles.footerContactList}>
          <View style={styles.footerContactItem}>
            <MapPin size={15} color="#f5c518" strokeWidth={2} />
            <Text style={styles.footerContactText}>
              Mangal Bazar, Katihar, Bihar 854105
            </Text>
          </View>
          <Pressable
            style={styles.footerContactItem}
            onPress={() => Linking.openURL('tel:+918002661555')}
          >
            <Phone size={15} color="#f5c518" strokeWidth={2} />
            <Text style={styles.footerContactText}>+91 8002661555</Text>
          </Pressable>
          <Pressable
            style={styles.footerContactItem}
            onPress={() => Linking.openURL('mailto:arinav@makhanaghar.in')}
          >
            <Mail size={15} color="#f5c518" strokeWidth={2} />
            <Text style={styles.footerContactText}>arinav@makhanaghar.in</Text>
          </Pressable>
        </View>

        {/* Quick Enquiry Form */}
        {footerSuccess ? (
          <View style={styles.footerSuccessBox}>
            <Text style={styles.footerSuccessText}>
              ✓ Thank you! We&apos;ll call you back shortly.
            </Text>
          </View>
        ) : (
          <View style={styles.footerEnquiryForm}>
            <View style={styles.footerInputRow}>
              <TextInput
                style={styles.footerInputName}
                placeholder="Your Name*"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={footerName}
                onChangeText={setFooterName}
              />
              <View style={styles.footerPhoneWrap}>
                <View style={styles.footerFlagWrap}>
                  <Text style={{ fontSize: 13 }}>🇮🇳</Text>
                  <Text style={styles.footerCountryCode}>+91</Text>
                </View>
                <TextInput
                  style={styles.footerInputPhone}
                  placeholder="Phone Number*"
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  keyboardType="phone-pad"
                  value={footerPhone}
                  onChangeText={setFooterPhone}
                />
              </View>
            </View>

            <Pressable
              style={[
                styles.footerCallbackBtn,
                footerLoading && { opacity: 0.7 },
              ]}
              onPress={handleFooterCallbackSubmit}
              disabled={footerLoading}
            >
              <Text style={styles.footerCallbackBtnText}>
                {footerLoading ? 'Sending...' : 'Get Callback'}
              </Text>
              <Send size={13} color="#0d2d1a" strokeWidth={2.2} />
            </Pressable>
          </View>
        )}
      </View>

      {/* ── 2-Column Links: Quick Links & Our Range ── */}
      <View style={styles.footerLinksGrid}>
        {/* Column 1: Quick Links */}
        <View style={styles.footerLinksCol}>
          <Text style={styles.footerColTitle}>Quick Links</Text>
          <View style={styles.footerTitleUnderline} />

          <View style={styles.footerLinkList}>
            {[
              { label: 'About Us', route: '/about' },
              { label: 'Contact Us', route: '/contact' },
              { label: 'Blog', route: '/blog' },
              { label: 'Gallery', route: '/gallery' },
              { label: 'Testimonials', route: '/testimonials' },
              { label: "FAQ's", route: '/faqs' },
              { label: 'Become Distributor', route: '/distributor' },
            ].map((item) => (
              <Pressable
                key={item.label}
                style={styles.footerLinkRow}
                onPress={() => router.push(item.route as any)}
              >
                <ChevronRight size={12} color="rgba(255,255,255,0.45)" />
                <Text style={styles.footerLinkText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Column 2: Our Range */}
        <View style={styles.footerLinksCol}>
          <Text style={styles.footerColTitle}>Our Range</Text>
          <View style={styles.footerTitleUnderline} />

          <View style={styles.footerLinkList}>
            {[
              'Baal Bhog Makhana Flake',
              'Top Fox Round Makhana Flake',
              '4 Suta Round Makhana Flake',
              'White Plain Makhana Flake',
              '16.5mm Makhana Flake',
              '12.7mm Plain Makhana Flake',
              'Makhana Flake',
            ].map((item) => (
              <Pressable
                key={item}
                style={styles.footerLinkRow}
                onPress={() => router.push('/products')}
              >
                <ChevronRight size={12} color="rgba(255,255,255,0.45)" />
                <Text style={styles.footerLinkText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* ── Bottom Bar: Copyright & Legal Links ── */}
      <View style={styles.footerBottomBar}>
        <Text style={styles.footerCopyright}>
          Copyright © 2026 Makhana Ghar by{' '}
          <Text style={styles.footerCopyrightAccent}>Arinav</Text>. All Rights
          Reserved.
        </Text>

        <View style={styles.footerLegalRow}>
          <Pressable onPress={() => router.push('/privacy-policy' as any)}>
            <Text style={styles.footerLegalText}>Privacy Policy</Text>
          </Pressable>
          <Text style={styles.footerLegalDot}>✦</Text>
          <Pressable
            onPress={() => router.push('/terms-and-conditions' as any)}
          >
            <Text style={styles.footerLegalText}>Terms &amp; Conditions</Text>
          </Pressable>
          <Text style={styles.footerLegalDot}>✦</Text>
          <Pressable onPress={() => router.push('/refund-policy' as any)}>
            <Text style={styles.footerLegalText}>Refund Policy</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerSection: {
    backgroundColor: '#0d2d1a',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
    position: 'relative',
    overflow: 'visible',
    width: '100%',
  },
  footerGrassWrap: {
    position: 'absolute',
    top: -6,
    left: 0,
    right: 0,
    width: '100%',
    height: 10,
    zIndex: 20,
    pointerEvents: 'none',
  },
  footerGrassImg: {
    width: '100%',
    height: '100%',
  },
  footerTopBar: {
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    borderStyle: 'dashed',
    paddingBottom: 22,
    marginBottom: 24,
  },
  footerLogo: {
    width: 140,
    height: 70,
    marginBottom: 8,
  },
  footerTagline: {
    fontFamily: fonts.caveat,
    fontSize: 21,
    color: '#f5c518',
    marginBottom: 16,
  },
  footerSocialsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerSocialCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f5c518',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerAboutBlock: {
    marginBottom: 28,
  },
  footerColTitle: {
    fontFamily: fonts.poppinsBold,
    fontSize: 18,
    color: '#ffffff',
  },
  footerTitleUnderline: {
    width: 44,
    height: 2.5,
    backgroundColor: '#f5c518',
    marginTop: 6,
    marginBottom: 16,
  },
  footerDesc: {
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 19,
    marginBottom: 20,
  },
  footerContactList: {
    gap: 10,
    marginBottom: 22,
  },
  footerContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerContactText: {
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.75)',
  },
  footerEnquiryForm: {
    width: '100%',
  },
  footerInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  footerInputName: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    paddingHorizontal: 12,
    color: '#ffffff',
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
  },
  footerPhoneWrap: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  footerFlagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 6,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.15)',
    marginRight: 6,
  },
  footerCountryCode: {
    fontFamily: fonts.dmSansMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  footerInputPhone: {
    flex: 1,
    color: '#ffffff',
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    padding: 0,
  },
  footerCallbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f5c518',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignSelf: 'center',
  },
  footerCallbackBtnText: {
    fontFamily: fonts.poppinsBold,
    color: '#0d2d1a',
    fontSize: 13,
  },
  footerSuccessBox: {
    backgroundColor: 'rgba(46,125,50,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.4)',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  footerSuccessText: {
    fontFamily: fonts.dmSansBold,
    color: '#a5d6a7',
    fontSize: 12.5,
  },
  footerLinksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  footerLinksCol: {
    width: '48%',
  },
  footerLinkList: {
    gap: 8,
  },
  footerLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerLinkText: {
    fontFamily: fonts.dmSans,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 18,
  },
  footerBottomBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
    borderStyle: 'dashed',
    paddingTop: 18,
    alignItems: 'flex-start',
    gap: 12,
  },
  footerCopyright: {
    fontFamily: fonts.dmSans,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 16,
  },
  footerCopyrightAccent: {
    color: '#f5c518',
    fontFamily: fonts.dmSansBold,
  },
  footerLegalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  footerLegalText: {
    fontFamily: fonts.dmSans,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.5)',
  },
  footerLegalDot: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
  },
});
