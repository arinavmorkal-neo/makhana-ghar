/**
 * ══════════════════════════════════════════════════════════════
 * Contact Us Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website /contact-us page:
 * - Hero banner with Caveat tag "Get In Touch"
 * - Contact info cards (Phone, WhatsApp, Email, Katihar Facility Address)
 * - Interactive Enquiry / Callback form with real API submission to Payload CMS
 * - Business hours & direct WhatsApp action
 * ══════════════════════════════════════════════════════════════
 */
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
} from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { submitEnquiry } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

export default function ContactScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      await submitEnquiry({
        name: name.trim(),
        countryCode: '+91',
        contact: phone.trim(),
        email: email.trim(),
        product: grade,
        message: message.trim() || 'Contact Us page enquiry',
        sourceComponent: 'Mobile App Contact Us',
      });
      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 6000);
    } catch (e: any) {
      setError(e.message || 'Failed to submit message.');
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.heroTag}>Get In Touch</Text>
          <Text style={styles.heroTitle}>CONTACT US</Text>
          <View style={styles.heroRule} />
          <Text style={styles.heroBody}>
            Have questions about our premium Makhana products? Want a bulk quote
            or need export assistance? We&apos;re here to help.
          </Text>
        </View>

        {/* Decorative White Grass Edge Image */}
        <Image
          source={{ uri: 'https://www.makhanaghar.in/grassnew-white.png' }}
          style={styles.heroGrass}
          contentFit="cover"
        />
      </View>

      {/* ── QUICK CONTACT CHANNELS ── */}
      <View style={styles.channelsSection}>
        <Pressable
          style={styles.channelCard}
          onPress={() => Linking.openURL('tel:+918002661555')}
        >
          <View style={[styles.channelIcon, { backgroundColor: '#1a3a1a' }]}>
            <Phone size={20} color={colors.white} />
          </View>
          <View style={styles.channelInfo}>
            <Text style={styles.channelTitle}>Call Us Directly</Text>
            <Text style={styles.channelValue}>+91 8002 66 1555</Text>
            <Text style={styles.channelSub}>Mon-Sat (9:00 AM - 7:00 PM)</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.channelCard}
          onPress={() =>
            Linking.openURL(
              'https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list.'
            )
          }
        >
          <View style={[styles.channelIcon, { backgroundColor: colors.whatsapp }]}>
            <MessageCircle size={20} color={colors.white} />
          </View>
          <View style={styles.channelInfo}>
            <Text style={styles.channelTitle}>WhatsApp Us</Text>
            <Text style={styles.channelValue}>Instant Chat &amp; Price List</Text>
            <Text style={styles.channelSub}>Typically replies in minutes</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.channelCard}
          onPress={() => Linking.openURL('mailto:makhanagha.marketing@gmail.com')}
        >
          <View style={[styles.channelIcon, { backgroundColor: '#2e7d32' }]}>
            <Mail size={20} color={colors.white} />
          </View>
          <View style={styles.channelInfo}>
            <Text style={styles.channelTitle}>Email Us</Text>
            <Text style={styles.channelValue}>makhanagha.marketing@gmail.com</Text>
            <Text style={styles.channelSub}>For official &amp; export inquiries</Text>
          </View>
        </Pressable>

        <View style={styles.channelCard}>
          <View style={[styles.channelIcon, { backgroundColor: colors.accent }]}>
            <MapPin size={20} color="#1a2e12" />
          </View>
          <View style={styles.channelInfo}>
            <Text style={styles.channelTitle}>Our Facility Address</Text>
            <Text style={styles.channelValue}>
              Mangal Bazar, Katihar, Bihar 854105
            </Text>
            <Text style={styles.channelSub}>India</Text>
          </View>
        </View>
      </View>

      {/* ── SEND A MESSAGE / FORM ── */}
      <View style={styles.formSection}>
        <Text style={styles.formSectionTitle}>
          Send Us a <Text style={styles.formAccent}>Message</Text>
        </Text>
        <Text style={styles.formSectionSub}>
          Fill out the form below and our export &amp; sales team will get back
          to you within 24 hours.
        </Text>

        {success ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              ✓ Thank you! Your message has been sent successfully. We will get
              in touch shortly.
            </Text>
          </View>
        ) : (
          <View style={styles.formCard}>
            {error && <Text style={styles.errorText}>{error}</Text>}

            <Text style={styles.inputLabel}>Your Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Rajesh Kumar"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Phone Number (+91) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 9876543210"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.inputLabel}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. rajesh@company.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>Product / Grade of Interest</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 6+ Suta Jumbo, 5+ Suta, Bulk"
              placeholderTextColor="#aaa"
              value={grade}
              onChangeText={setGrade}
            />

            <Text style={styles.inputLabel}>Message / Quantity Needed</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Describe your requirements or order volume..."
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />

            <Pressable
              style={[styles.submitBtn, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <>
                  <Text style={styles.submitBtnText}>Submit Message</Text>
                  <Send size={15} color={colors.white} />
                </>
              )}
            </Pressable>
          </View>
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

  // Channels
  channelsSection: {
    padding: spacing[4],
    gap: 10,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm.rn,
  },
  channelIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelInfo: { flex: 1 },
  channelTitle: { fontFamily: fonts.poppinsBold, fontSize: 13, color: '#1a2e12' },
  channelValue: { fontFamily: fonts.poppinsSemiBold, fontSize: 12, color: '#2e7d32', marginTop: 1 },
  channelSub: { fontFamily: fonts.dmSans, fontSize: 10, color: '#888', marginTop: 2 },

  // Form Section
  formSection: {
    padding: spacing[4],
    paddingTop: spacing[2],
  },
  formSectionTitle: { fontFamily: fonts.poppinsExtraBold, fontSize: 20, color: '#1a2e12' },
  formAccent: { color: '#2e7d32' },
  formSectionSub: { fontFamily: fonts.dmSans, fontSize: 12, color: '#666', marginTop: 2, marginBottom: spacing[4], lineHeight: 17 },

  formCard: {
    backgroundColor: colors.surface,
    padding: spacing[5],
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm.rn,
    gap: 8,
  },
  inputLabel: { fontFamily: fonts.poppinsSemiBold, fontSize: 12, color: '#555', marginTop: 4 },
  input: {
    fontFamily: fonts.dmSans,
    backgroundColor: '#fafdf9',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#111',
  },
  textarea: { height: 85, textAlignVertical: 'top' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a3a1a',
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: spacing[3],
  },
  submitBtnText: { fontFamily: fonts.poppinsBold, color: colors.white, fontSize: 14 },
  errorText: { fontFamily: fonts.dmSansBold, color: colors.error, fontSize: 12, marginBottom: 6 },
  successBox: {
    backgroundColor: colors.successBg,
    padding: spacing[5],
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  successText: { fontFamily: fonts.poppinsSemiBold, color: colors.success, fontSize: 13, lineHeight: 20 },
});
