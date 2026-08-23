/**
 * More Screen — About, Gallery, Contact, Policies
 */
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Info, ImageIcon, Phone, Mail, FileText, Shield, ChevronRight } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: () => void;
}

export default function MoreScreen() {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      icon: <Info size={22} color={colors.primary} />,
      title: 'About Us',
      subtitle: 'Our story, mission & founders',
      action: () => router.push('/about' as never),
    },
    {
      icon: <ImageIcon size={22} color={colors.primary} />,
      title: 'Gallery',
      subtitle: 'Photos from our farms & facility',
      action: () => router.push('/gallery' as never),
    },
    {
      icon: <Phone size={22} color={colors.primary} />,
      title: 'Contact Us',
      subtitle: 'Call, WhatsApp, or email us',
      action: () => router.push('/contact' as never),
    },
    {
      icon: <Mail size={22} color={colors.accent} />,
      title: 'Send Enquiry',
      subtitle: 'Get wholesale pricing',
      action: () => router.push('/enquiry' as never),
    },
    {
      icon: <FileText size={22} color={colors.textMuted} />,
      title: 'Privacy Policy',
      subtitle: 'How we handle your data',
      action: () => Linking.openURL('https://www.makhanaghar.in/privacy-policy'),
    },
    {
      icon: <Shield size={22} color={colors.textMuted} />,
      title: 'Terms & Conditions',
      subtitle: 'Terms of service',
      action: () => Linking.openURL('https://www.makhanaghar.in/terms-and-conditions'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      {/* Brand card */}
      <View style={styles.brandCard}>
        <Text style={styles.brandName}>Makhana Ghar</Text>
        <Text style={styles.brandTagline}>🌿 From Bihar to the World</Text>
        <Text style={styles.brandDesc}>
          Premium Makhana manufacturer, wholesaler and exporter from Bihar, India.
        </Text>
      </View>

      {/* Menu items */}
      <View style={styles.menu}>
        {menuItems.map((item, idx) => (
          <Pressable key={idx} style={styles.menuItem} onPress={item.action}>
            <View style={styles.menuIcon}>{item.icon}</View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSub}>{item.subtitle}</Text>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>

      {/* Version */}
      <Text style={styles.version}>Makhana Ghar v1.0.0</Text>

      <View style={{ height: spacing[20] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.primaryDeep, paddingTop: 60, paddingBottom: spacing[6], paddingHorizontal: spacing[5] },
  headerTitle: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.black, color: colors.white },
  brandCard: {
    margin: spacing[4], padding: spacing[6], backgroundColor: colors.surface,
    borderRadius: radii.xl, ...shadows.sm.rn, borderLeftWidth: 4, borderLeftColor: colors.accent,
  },
  brandName: { fontSize: typography.sizes.xl, fontWeight: typography.weights.black, color: colors.textDark },
  brandTagline: { fontSize: typography.sizes.lg, color: colors.accentWarm, marginTop: spacing[1] },
  brandDesc: { fontSize: typography.sizes.base, color: colors.textMuted, marginTop: spacing[3], lineHeight: 20 },
  menu: { margin: spacing[4], backgroundColor: colors.surface, borderRadius: radii.xl, ...shadows.sm.rn, overflow: 'hidden' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', padding: spacing[4], gap: spacing[4],
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  menuIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryDim, justifyContent: 'center', alignItems: 'center' },
  menuText: { flex: 1 },
  menuTitle: { fontSize: typography.sizes.body, fontWeight: typography.weights.semibold, color: colors.textDark },
  menuSub: { fontSize: typography.sizes.sm, color: colors.textMuted, marginTop: 2 },
  version: { textAlign: 'center', fontSize: typography.sizes.xs, color: colors.textMuted, marginTop: spacing[6] },
});
