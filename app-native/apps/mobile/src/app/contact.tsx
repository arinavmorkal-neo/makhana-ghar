/**
 * Contact Screen — Phone, WhatsApp, Email
 */
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Globe } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  action: () => void;
  bg: string;
}

export default function ContactScreen() {
  const router = useRouter();

  const contacts: ContactItem[] = [
    {
      icon: <Phone size={24} color={colors.white} />,
      label: 'Call Us',
      value: '+91 98765 43210',
      action: () => Linking.openURL('tel:+919876543210'),
      bg: colors.primaryDeep,
    },
    {
      icon: <MessageCircle size={24} color={colors.white} />,
      label: 'WhatsApp',
      value: 'Chat with us instantly',
      action: () => Linking.openURL('https://wa.me/919876543210?text=Hi, I\'m interested in your Makhana products'),
      bg: colors.whatsapp,
    },
    {
      icon: <Mail size={24} color={colors.white} />,
      label: 'Email',
      value: 'info@makhanaghar.in',
      action: () => Linking.openURL('mailto:info@makhanaghar.in'),
      bg: colors.accent,
    },
    {
      icon: <Globe size={24} color={colors.white} />,
      label: 'Website',
      value: 'www.makhanaghar.in',
      action: () => Linking.openURL('https://www.makhanaghar.in'),
      bg: colors.primary,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <Text style={styles.headerSub}>We'd love to hear from you</Text>
      </View>

      <View style={styles.content}>
        {contacts.map((item, idx) => (
          <Pressable key={idx} style={styles.contactCard} onPress={item.action}>
            <View style={[styles.contactIcon, { backgroundColor: item.bg }]}>{item.icon}</View>
            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>{item.label}</Text>
              <Text style={styles.contactValue}>{item.value}</Text>
            </View>
          </Pressable>
        ))}

        {/* Address */}
        <View style={styles.addressCard}>
          <MapPin size={24} color={colors.primary} />
          <View style={styles.addressText}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>Bihar, India</Text>
          </View>
        </View>

        {/* CTA */}
        <Pressable style={styles.enquiryCta} onPress={() => router.push('/enquiry' as never)}>
          <Text style={styles.enquiryCtaText}>📝 Send a Detailed Enquiry</Text>
        </Pressable>
      </View>

      <View style={{ height: spacing[20] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.primaryDeep, paddingTop: 54, paddingBottom: spacing[6], paddingHorizontal: spacing[5] },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing[3] },
  headerTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.white },
  headerSub: { fontSize: typography.sizes.md, color: colors.textLight, marginTop: spacing[1] },
  content: { padding: spacing[4], gap: spacing[4] },
  contactCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing[4],
    backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing[5],
    ...shadows.sm.rn,
  },
  contactIcon: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  contactText: { flex: 1 },
  contactLabel: { fontSize: typography.sizes.body, fontWeight: typography.weights.bold, color: colors.textDark },
  contactValue: { fontSize: typography.sizes.base, color: colors.textMuted, marginTop: 2 },
  addressCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing[4],
    backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing[5],
    ...shadows.sm.rn,
  },
  addressText: { flex: 1 },
  enquiryCta: {
    backgroundColor: colors.accent, borderRadius: radii.xl, padding: spacing[5], alignItems: 'center', marginTop: spacing[4],
  },
  enquiryCtaText: { fontSize: typography.sizes.body, fontWeight: typography.weights.bold, color: colors.textDark },
});
