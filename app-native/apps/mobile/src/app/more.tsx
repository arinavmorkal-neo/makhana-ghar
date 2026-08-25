/**
 * ══════════════════════════════════════════════════════════════
 * More Menu Screen
 * ══════════════════════════════════════════════════════════════
 * Recreates the website's brand menu & quick links:
 * - Brand card with tagline & Bihar origin
 * - Nav links: About Us, Photo Gallery, Contact Us, Send Enquiry, Privacy Policy, Terms
 * - Direct contact actions (Phone, WhatsApp, Email)
 * - Social profiles (Facebook, WhatsApp)
 * ══════════════════════════════════════════════════════════════
 */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Info,
  ImageIcon,
  Phone,
  Mail,
  FileText,
  Shield,
  ChevronRight,
  MessageCircle,
  MapPin,
  ExternalLink,
} from 'lucide-react-native';
import { colors, fonts, typography, spacing, radii, shadows } from '@makhana-ghar/design-system';
import { AppHeader, AppFooter } from '../components';

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
      icon: <Info size={20} color="#2e7d32" />,
      title: 'About Us',
      subtitle: 'Our story, founders & 8-step process',
      action: () => router.push('/about' as never),
    },
    {
      icon: <ImageIcon size={20} color="#2e7d32" />,
      title: 'Photo Gallery',
      subtitle: 'Tour our ponds, grading facility & products',
      action: () => router.push('/gallery' as never),
    },
    {
      icon: <Phone size={20} color="#2e7d32" />,
      title: 'Contact Us',
      subtitle: 'Direct call, email & facility address',
      action: () => router.push('/contact' as never),
    },
    {
      icon: <Mail size={20} color={colors.accent} />,
      title: 'Send Bulk Enquiry',
      subtitle: 'Request wholesale price quotes',
      action: () => router.push('/enquiry' as never),
    },
    {
      icon: <FileText size={20} color="#777" />,
      title: 'Privacy Policy',
      subtitle: 'How we respect and handle your data',
      action: () => Linking.openURL('https://www.makhanaghar.in/privacy-policy'),
    },
    {
      icon: <Shield size={20} color="#777" />,
      title: 'Terms & Conditions',
      subtitle: 'Terms of service & supply policies',
      action: () =>
        Linking.openURL('https://www.makhanaghar.in/terms-and-conditions'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppHeader />

      {/* ── TOP HEADER ── */}

      {/* ── BRAND CARD ── */}
      <View style={styles.brandCard}>
        <View style={styles.brandTaglinePill}>
          <Text style={styles.brandTaglineText}>
            Best Makhana Manufacturing Company
          </Text>
        </View>
        <Text style={styles.brandName}>Makhana Ghar</Text>
        <Text style={styles.brandDesc}>
          Direct exporter and manufacturer of premium Makhana (Fox Nuts) sourced
          from Bihar, India. Serving global distributors, supermarkets, and
          wholesalers.
        </Text>

        <View style={styles.contactRow}>
          <Pressable
            style={styles.contactChip}
            onPress={() => Linking.openURL('tel:+918002661555')}
          >
            <Phone size={12} color="#1a2e12" />
            <Text style={styles.contactChipText}>+91 8002661555</Text>
          </Pressable>
          <Pressable
            style={styles.contactChip}
            onPress={() =>
              Linking.openURL('https://wa.me/918002661555?text=Hello')
            }
          >
            <MessageCircle size={12} color="#25D366" />
            <Text style={styles.contactChipText}>WhatsApp</Text>
          </Pressable>
        </View>
      </View>

      {/* ── MENU ITEMS ── */}
      <View style={styles.menu}>
        {menuItems.map((item, idx) => (
          <Pressable key={idx} style={styles.menuItem} onPress={item.action}>
            <View style={styles.menuIcon}>{item.icon}</View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSub}>{item.subtitle}</Text>
            </View>
            <ChevronRight size={18} color="#aaa" />
          </Pressable>
        ))}
      </View>

      {/* ── WEBSITE LINK ── */}
      <Pressable
        style={styles.websiteBtn}
        onPress={() => Linking.openURL('https://www.makhanaghar.in')}
      >
        <Text style={styles.websiteBtnText}>Visit Official Website</Text>
        <ExternalLink size={14} color="#2e7d32" />
      </Pressable>

      <Text style={styles.version}>
        Makhana Ghar Mobile v1.0.0 • Katihar, Bihar
      </Text>

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
    paddingHorizontal: spacing[5],
  },
  headerTag: { fontFamily: fonts.caveat, fontSize: 18, color: colors.accentWarm },
  headerTitle: { fontFamily: fonts.poppinsBold, fontSize: 22, color: colors.white },

  brandCard: {
    margin: spacing[4],
    padding: spacing[5],
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    ...shadows.sm.rn,
  },
  brandTaglinePill: {
    backgroundColor: 'rgba(245,200,0,0.15)',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  brandTaglineText: { fontFamily: fonts.poppinsBold, color: '#8a6d00', fontSize: 10 },
  brandName: { fontFamily: fonts.poppinsExtraBold, fontSize: 20, color: '#1a2e12', marginBottom: 4 },
  brandDesc: { fontFamily: fonts.dmSans, fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 12 },
  contactRow: { flexDirection: 'row', gap: 8 },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5faf5',
    borderWidth: 1,
    borderColor: '#dce8da',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  contactChipText: { fontFamily: fonts.poppinsSemiBold, fontSize: 11, color: '#1a2e12' },

  menu: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm.rn,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe3',
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f5faf5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { flex: 1 },
  menuTitle: { fontFamily: fonts.poppinsBold, fontSize: 14, color: '#1a2e12' },
  menuSub: { fontFamily: fonts.dmSans, fontSize: 11, color: '#777', marginTop: 1 },

  websiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  websiteBtnText: { fontFamily: fonts.poppinsBold, fontSize: 12, color: '#2e7d32' },

  version: {
    fontFamily: fonts.dmSans,
    textAlign: 'center',
    fontSize: 11,
    color: '#888',
    marginTop: spacing[5],
  },
});
