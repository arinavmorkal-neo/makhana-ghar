/**
 * ══════════════════════════════════════════════════════════════
 * Enquiry Screen
 * ══════════════════════════════════════════════════════════════
 * Exactly recreates the Next.js website EnquiryPopup modal:
 * - Brand header with "Quick Wholesale Enquiry"
 * - Select Grade pills (4+ Suta, 5+ Suta, 6+ Suta Jumbo, Raw Flakes, Bulk)
 * - Name, Phone (+91), Email, Quantity/Message
 * - Instant validation & submission to Payload CMS
 * - Direct WhatsApp option for instant quotes
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
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Send, MessageCircle, ShieldCheck } from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { submitEnquiry } from '@makhana-ghar/core';
import { AppHeader, AppFooter } from '../components';

const productGrades = [
  { id: '6-suta-jumbo', label: '6+ Suta Jumbo' },
  { id: '5-suta-medium', label: '5+ Suta Medium' },
  { id: '4-suta-standard', label: '4+ Suta Standard' },
  { id: 'raw-flakes', label: 'Raw Makhana Flakes' },
  { id: 'bulk-export', label: 'Bulk Export Order' },
];

export default function EnquiryScreen() {
  const router = useRouter();

  const [selectedGrade, setSelectedGrade] = useState('6-suta-jumbo');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await submitEnquiry({
        name: name.trim(),
        countryCode: '+91',
        contact: phone.trim(),
        email: email.trim(),
        product: selectedGrade,
        message: message.trim() || 'Wholesale enquiry from mobile app',
        sourceComponent: 'Mobile App Enquiry Modal',
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Failed to submit enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppHeader showBack={true} />

      {/* ── TOP HEADER ── */}
      <View style={styles.header}>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTag}>Wholesale Supply</Text>
          <Text style={styles.headerTitle}>Send Enquiry</Text>
        </View>
      </View>

      <View style={styles.content}>
        {success ? (
          <View style={styles.successContainer}>
            <CheckCircle2 size={56} color="#2e7d32" />
            <Text style={styles.successHeading}>Enquiry Submitted!</Text>
            <Text style={styles.successBody}>
              Thank you, {name || 'valued customer'}. Our sales team has received
              your inquiry for{' '}
              <Text style={{ fontWeight: 'bold' }}>{selectedGrade}</Text> and will
              reach out to you shortly with our best wholesale price list.
            </Text>
            <Pressable
              style={styles.successDoneBtn}
              onPress={() => router.push('/')}
            >
              <Text style={styles.successDoneText}>Back to Home</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.formSubtitle}>
              Get customized wholesale quotes directly from the factory in Bihar.
            </Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Select Grade Pills */}
            <Text style={styles.sectionLabel}>Select Grade / Variety *</Text>
            <View style={styles.gradesWrap}>
              {productGrades.map((grade) => {
                const isSelected = selectedGrade === grade.id;
                return (
                  <Pressable
                    key={grade.id}
                    style={[
                      styles.gradePill,
                      isSelected && styles.gradePillSelected,
                    ]}
                    onPress={() => setSelectedGrade(grade.id)}
                  >
                    <Text
                      style={[
                        styles.gradePillText,
                        isSelected && styles.gradePillTextSelected,
                      ]}
                    >
                      {grade.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Ramesh Chandra"
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
              placeholder="e.g. ramesh@gmail.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>Estimated Quantity / Message</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="e.g. 500 kg 6+ Suta required for Mumbai delivery..."
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={3}
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
                  <Text style={styles.submitBtnText}>
                    Submit &amp; Get Wholesale Quote
                  </Text>
                  <Send size={15} color={colors.white} />
                </>
              )}
            </Pressable>

            {/* Instant WhatsApp Action */}
            <View style={styles.orDivider}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            <Pressable
              style={styles.whatsappBtn}
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20send%20price%20list%20for%20${selectedGrade}.`
                )
              }
            >
              <MessageCircle size={18} color={colors.white} />
              <Text style={styles.whatsappBtnText}>
                Instant WhatsApp Quote (+91 8002661555)
              </Text>
            </Pressable>

            {/* Guarantee */}
            <View style={styles.guaranteeRow}>
              <ShieldCheck size={14} color="#2e7d32" />
              <Text style={styles.guaranteeText}>
                Direct from Bihar farms • 100% Quality &amp; Purity Assured
              </Text>
            </View>
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

  header: {
    backgroundColor: '#1a2e12',
    paddingTop: 48,
    paddingBottom: spacing[4],
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleWrap: { flex: 1 },
  headerTag: { fontFamily: fonts.caveat, fontSize: 18, color: colors.accentWarm },
  headerTitle: { fontFamily: fonts.poppinsBold, fontSize: 20, color: colors.white },

  content: { padding: spacing[4] },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing[5],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md.rn,
    gap: 8,
  },
  formSubtitle: { fontFamily: fonts.dmSans, fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 4 },
  sectionLabel: { fontFamily: fonts.poppinsBold, fontSize: 13, color: '#1a2e12', marginTop: 4 },
  gradesWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 4 },
  gradePill: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fafdf9',
  },
  gradePillSelected: {
    backgroundColor: '#1a3a1a',
    borderColor: '#1a3a1a',
  },
  gradePillText: { fontFamily: fonts.dmSansMedium, fontSize: 11, color: '#555' },
  gradePillTextSelected: { color: colors.accentWarm, fontFamily: fonts.poppinsBold },

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
  textarea: { height: 75, textAlignVertical: 'top' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a3a1a',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: spacing[3],
  },
  submitBtnText: { fontFamily: fonts.poppinsBold, color: colors.white, fontSize: 13 },
  errorText: { fontFamily: fonts.dmSansBold, color: colors.error, fontSize: 12, marginBottom: 4 },

  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: spacing[3],
  },
  orLine: { flex: 1, height: 1, backgroundColor: colors.border },
  orText: { fontFamily: fonts.poppinsBold, fontSize: 11, color: '#999' },

  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.whatsapp,
    paddingVertical: 12,
    borderRadius: 10,
  },
  whatsappBtnText: { fontFamily: fonts.poppinsBold, color: colors.white, fontSize: 12 },

  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing[3],
  },
  guaranteeText: { fontFamily: fonts.dmSansMedium, fontSize: 11, color: '#2e7d32' },

  // Success
  successContainer: {
    backgroundColor: colors.surface,
    padding: spacing[6],
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm.rn,
  },
  successHeading: { fontFamily: fonts.poppinsExtraBold, fontSize: 20, color: '#1a2e12', marginTop: 12, marginBottom: 8 },
  successBody: { fontFamily: fonts.dmSans, fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20, marginBottom: spacing[6] },
  successDoneBtn: {
    backgroundColor: '#1a3a1a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: radii.full,
  },
  successDoneText: { fontFamily: fonts.poppinsBold, color: colors.white, fontSize: 13 },
});
