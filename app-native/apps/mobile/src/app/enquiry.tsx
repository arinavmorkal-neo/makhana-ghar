/**
 * Enquiry Form Screen — Submit enquiry to Payload CMS
 */
import { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput,
  Pressable, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows, componentSpecs } from '@makhana-ghar/design-system';
import { submitEnquiry, validateEnquiryForm, sanitize, type CreateEnquiry } from '@makhana-ghar/core';

const PRODUCT_OPTIONS = [
  { label: 'Select Product Interest', value: '' },
  { label: 'Makhana 4+ Sutta', value: 'makhana-4' },
  { label: 'Makhana 5+ Sutta', value: 'makhana-5' },
  { label: 'Makhana 6+ Sutta', value: 'makhana-6' },
  { label: 'Phool Makhana Lite', value: 'makhana-lite' },
  { label: 'Custom Grade / Mix', value: 'custom' },
] as const;

export default function EnquiryScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', countryCode: '+91', contact: '', email: '', product: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const input = componentSpecs.input;

  const handleSubmit = async () => {
    const validationErrors = validateEnquiryForm({
      name: form.name,
      contact: form.contact,
      email: form.email || undefined,
      message: form.message || undefined,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const data: CreateEnquiry = {
        name: sanitize(form.name),
        countryCode: form.countryCode,
        contact: sanitize(form.contact),
        email: form.email ? sanitize(form.email) : undefined,
        product: form.product as CreateEnquiry['product'] || undefined,
        message: form.message ? sanitize(form.message) : undefined,
        source: 'mobile-app',
      };

      await submitEnquiry(data);
      setSubmitted(true);
    } catch (err) {
      Alert.alert('Error', 'Failed to submit enquiry. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>✅</Text>
        <Text style={styles.successTitle}>Enquiry Submitted!</Text>
        <Text style={styles.successBody}>
          Thank you for your interest. Our team will contact you within 24 hours.
        </Text>
        <Pressable style={styles.successBtn} onPress={() => router.back()}>
          <Text style={styles.successBtnText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBack}>
          <ArrowLeft size={24} color={colors.white} />
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Send Enquiry</Text>
          <Text style={styles.headerSub}>Get wholesale prices from the manufacturer</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        {/* Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={[styles.input, errors['name'] && styles.inputError]}
            placeholder="Enter your full name"
            placeholderTextColor={input.placeholderColor}
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />
          {errors['name'] && <Text style={styles.errorText}>{errors['name']}</Text>}
        </View>

        {/* Phone */}
        <View style={styles.field}>
          <Text style={styles.label}>Phone Number *</Text>
          <View style={styles.phoneRow}>
            <TextInput
              style={[styles.input, styles.codeInput]}
              value={form.countryCode}
              onChangeText={(v) => setForm({ ...form, countryCode: v })}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, styles.phoneInput, errors['contact'] && styles.inputError]}
              placeholder="Enter phone number"
              placeholderTextColor={input.placeholderColor}
              value={form.contact}
              onChangeText={(v) => setForm({ ...form, contact: v })}
              keyboardType="phone-pad"
            />
          </View>
          {errors['contact'] && <Text style={styles.errorText}>{errors['contact']}</Text>}
        </View>

        {/* Email */}
        <View style={styles.field}>
          <Text style={styles.label}>Email (Optional)</Text>
          <TextInput
            style={[styles.input, errors['email'] && styles.inputError]}
            placeholder="Enter email address"
            placeholderTextColor={input.placeholderColor}
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors['email'] && <Text style={styles.errorText}>{errors['email']}</Text>}
        </View>

        {/* Product Interest */}
        <View style={styles.field}>
          <Text style={styles.label}>Product Interest</Text>
          <View style={styles.productOptions}>
            {PRODUCT_OPTIONS.filter((o) => o.value).map((opt) => (
              <Pressable
                key={opt.value}
                style={[styles.productPill, form.product === opt.value && styles.productPillActive]}
                onPress={() => setForm({ ...form, product: form.product === opt.value ? '' : opt.value })}
              >
                <Text style={[styles.productPillText, form.product === opt.value && styles.productPillTextActive]}>
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Message */}
        <View style={styles.field}>
          <Text style={styles.label}>Message / Quantity (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Tell us about your requirements..."
            placeholderTextColor={input.placeholderColor}
            value={form.message}
            onChangeText={(v) => setForm({ ...form, message: v })}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Submit */}
        <Pressable
          style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Send size={18} color={colors.white} />
          <Text style={styles.submitBtnText}>
            {submitting ? 'Submitting...' : 'Submit Enquiry'}
          </Text>
        </Pressable>

        <View style={{ height: spacing[20] }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: spacing[4],
    backgroundColor: colors.primaryDeep, paddingTop: 54, paddingBottom: spacing[5], paddingHorizontal: spacing[5],
  },
  headerBack: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.white },
  headerSub: { fontSize: typography.sizes.sm, color: colors.textLight, marginTop: 2 },
  formContent: { padding: spacing[5] },
  field: { marginBottom: spacing[5] },
  label: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: '#555', marginBottom: spacing[1] },
  input: {
    backgroundColor: colors.inputBg, borderWidth: 1.5, borderColor: colors.border, borderRadius: radii.md,
    padding: spacing[3], fontSize: typography.sizes.md, color: colors.primaryDark,
  },
  inputError: { borderColor: colors.error },
  errorText: { fontSize: typography.sizes.xs, color: colors.error, marginTop: spacing[1] },
  phoneRow: { flexDirection: 'row', gap: spacing[2] },
  codeInput: { width: 80 },
  phoneInput: { flex: 1 },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  productOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  productPill: {
    paddingVertical: spacing[2], paddingHorizontal: spacing[4], borderRadius: radii.full,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
  },
  productPillActive: { backgroundColor: colors.primaryDeep, borderColor: colors.primaryDeep },
  productPillText: { fontSize: typography.sizes.base, fontWeight: typography.weights.medium, color: colors.textDark },
  productPillTextActive: { color: colors.white },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[3],
    backgroundColor: colors.primaryDark, paddingVertical: spacing[4], borderRadius: radii.lg, marginTop: spacing[4],
  },
  submitBtnDisabled: { opacity: 0.7 },
  submitBtnText: { color: colors.white, fontWeight: typography.weights.bold, fontSize: typography.sizes.body },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing[8], backgroundColor: colors.bg },
  successEmoji: { fontSize: 64, marginBottom: spacing[5] },
  successTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.textDark, marginBottom: spacing[3] },
  successBody: { fontSize: typography.sizes.body, color: colors.textMuted, textAlign: 'center', lineHeight: 24, marginBottom: spacing[8] },
  successBtn: { backgroundColor: colors.primaryDeep, paddingVertical: spacing[4], paddingHorizontal: spacing[10], borderRadius: radii.sm },
  successBtnText: { color: colors.white, fontWeight: typography.weights.bold, fontSize: typography.sizes.body },
});
