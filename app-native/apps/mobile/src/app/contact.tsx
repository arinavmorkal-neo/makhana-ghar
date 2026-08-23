/**
 * ══════════════════════════════════════════════════════════════
 *  Makhana Ghar — Contact Screen
 *  100% Matching Website Contact Us Page
 * ══════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Sparkles,
} from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { submitEnquiry, validateEnquiryForm, sanitize } from '@makhana-ghar/core';

export default function ContactScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Wholesale / Bulk Order',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const errs = validateEnquiryForm({
      name: form.name,
      contact: form.phone,
      email: form.email || undefined,
    });

    if (Object.keys(errs).length > 0) {
      Alert.alert('Validation', Object.values(errs)[0]);
      return;
    }

    setLoading(true);
    try {
      await submitEnquiry({
        name: sanitize(form.name),
        contact: sanitize(form.phone),
        email: form.email ? sanitize(form.email) : undefined,
        message: `${form.subject}: ${sanitize(form.message)}`,
        source: 'mobile-contact-page',
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: 'Wholesale / Bulk Order', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      Alert.alert('Error', 'Could not send message. Please reach us directly on WhatsApp or Call.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.white} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTag}>REACH OUT ANYTIME</Text>
          <Text style={styles.headerTitle}>Contact Us</Text>
        </View>
      </View>

      {/* ── 3 Quick Action Cards ── */}
      <View style={styles.quickGrid}>
        {/* Call */}
        <Pressable
          style={styles.actionCard}
          onPress={() => Linking.openURL('tel:+918002661555')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
            <Phone size={22} color="#2e7d32" />
          </View>
          <Text style={styles.actionLabel}>Call Us</Text>
          <Text style={styles.actionVal}>+91 8002 66 1555</Text>
          <Text style={styles.actionSub}>Mon – Sat, 9 AM – 7 PM IST</Text>
        </Pressable>

        {/* WhatsApp */}
        <Pressable
          style={styles.actionCard}
          onPress={() => Linking.openURL('https://wa.me/918002661555?text=Hello%2C%20I%20have%20an%20enquiry%20regarding%20makhana%20wholesale.')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
            <MessageCircle size={22} color="#25D366" />
          </View>
          <Text style={styles.actionLabel}>WhatsApp</Text>
          <Text style={styles.actionVal}>Chat Directly</Text>
          <Text style={styles.actionSub}>Instant reply on quote</Text>
        </Pressable>

        {/* Email */}
        <Pressable
          style={styles.actionCard}
          onPress={() => Linking.openURL('mailto:arinav@makhanaghar.in')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
            <Mail size={22} color="#152b11" />
          </View>
          <Text style={styles.actionLabel}>Email Us</Text>
          <Text style={styles.actionVal}>arinav@makhanaghar.in</Text>
          <Text style={styles.actionSub}>Replies within 24h</Text>
        </Pressable>

        {/* Factory Address */}
        <Pressable
          style={styles.actionCard}
          onPress={() => Linking.openURL('https://maps.google.com/?q=Mangal+Bazar+Katihar+Bihar+854105')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
            <MapPin size={22} color="#e65100" />
          </View>
          <Text style={styles.actionLabel}>Visit Facility</Text>
          <Text style={styles.actionVal}>Katihar, Bihar</Text>
          <Text style={styles.actionSub}>Mangal Bazar 854105</Text>
        </Pressable>
      </View>

      {/* ── Processing Facility Highlights ── */}
      <View style={styles.facilitySection}>
        <View style={styles.facilityHeader}>
          <Building size={20} color={colors.accent} />
          <Text style={styles.facilityHeading}>Our Processing Facility in Bihar</Text>
        </View>

        <View style={styles.facilityGrid}>
          <View style={styles.facilityItem}>
            <Text style={styles.facilityEmoji}>🌾</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.facilityItemTitle}>Direct Farm Access</Text>
              <Text style={styles.facilityItemSub}>Ponds within 15 km of our processing plant in Mithila.</Text>
            </View>
          </View>

          <View style={styles.facilityItem}>
            <Text style={styles.facilityEmoji}>☀️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.facilityItemTitle}>Natural Sun-Drying</Text>
              <Text style={styles.facilityItemSub}>Over 20,000 sq ft of clean solar drying yards.</Text>
            </View>
          </View>

          <View style={styles.facilityItem}>
            <Text style={styles.facilityEmoji}>📦</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.facilityItemTitle}>Modern Climate Packaging</Text>
              <Text style={styles.facilityItemSub}>Moisture-proof sealed bags and retail pouch packs.</Text>
            </View>
          </View>

          <View style={styles.facilityItem}>
            <Text style={styles.facilityEmoji}>🚛</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.facilityItemTitle}>Pan-India &amp; Port Dispatch</Text>
              <Text style={styles.facilityItemSub}>Well connected by highway, freight rail, and export ports.</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Send Message Form ── */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>Send Us a Message</Text>
        <Text style={styles.formSub}>Fill out the form below and our wholesale team will get in touch.</Text>

        {success ? (
          <View style={styles.successCard}>
            <CheckCircle2 size={36} color={colors.success} />
            <Text style={styles.successTitle}>Message Sent Successfully!</Text>
            <Text style={styles.successText}>We have received your enquiry and will reply shortly.</Text>
          </View>
        ) : (
          <View style={styles.formFields}>
            <TextInput
              style={styles.input}
              placeholder="Your Full Name *"
              placeholderTextColor="#888"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number / WhatsApp *"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v) => setForm({ ...form, phone: v })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(v) => setForm({ ...form, email: v })}
            />
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Tell us about your requirements, quantities, or delivery location..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
              value={form.message}
              onChangeText={(v) => setForm({ ...form, message: v })}
            />

            <Pressable
              style={[styles.submitBtn, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Send size={18} color={colors.white} />
              <Text style={styles.submitBtnText}>{loading ? 'Sending...' : 'Send Message'}</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f3' },
  content: { paddingBottom: spacing[8] },

  header: {
    backgroundColor: '#152b11',
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTag: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.accent,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
    marginTop: 2,
  },

  // Quick Action Grid
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing[4],
    gap: 10,
  },
  actionCard: {
    width: (SCREEN_WIDTH - spacing[4] * 2 - 10) / 2,
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1ede0',
    ...shadows.sm.rn,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#152b11',
  },
  actionVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2e7d32',
    marginTop: 2,
  },
  actionSub: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },

  // Facility Section
  facilitySection: {
    marginHorizontal: spacing[4],
    backgroundColor: '#152b11',
    padding: spacing[5],
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(245,200,0,0.3)',
  },
  facilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  facilityHeading: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.accent,
  },
  facilityGrid: {
    gap: 12,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 10,
    borderRadius: 8,
  },
  facilityEmoji: {
    fontSize: 22,
  },
  facilityItemTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
  },
  facilityItemSub: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 1,
  },

  // Form Section
  formSection: {
    margin: spacing[4],
    backgroundColor: colors.white,
    padding: spacing[5],
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e1ede0',
    ...shadows.sm.rn,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#152b11',
  },
  formSub: {
    fontSize: 12,
    color: '#557250',
    marginTop: 2,
  },
  formFields: {
    marginTop: spacing[4],
    gap: 10,
  },
  input: {
    backgroundColor: '#fafdf9',
    borderWidth: 1.5,
    borderColor: '#dce8da',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#152b11',
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#152b11',
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 4,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
  },
  successCard: {
    paddingVertical: spacing[6],
    alignItems: 'center',
    gap: 8,
  },
  successTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.success,
  },
  successText: {
    fontSize: 12,
    color: '#557250',
    textAlign: 'center',
  },
});
