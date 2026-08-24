/**
 * Root Layout — Mobile Navigation Bar with Floating Call Action
 * Exactly matches the user's reference design:
 * [ Home ] [ Products ] ( 📞 Call ) [ About ] [ Enquiry ]
 */
import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Caveat_400Regular,
  Caveat_600SemiBold,
  Caveat_700Bold,
} from '@expo-google-fonts/caveat';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Home, ShoppingBag, Phone, Info, Mail } from 'lucide-react-native';
import { colors, fonts } from '@makhana-ghar/design-system';
import { configureApi } from '@makhana-ghar/core';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Little: require('../../assets/fonts/Little.otf'),
    Farmhouse: require('../../assets/fonts/Farmhouse.ttf'),
    Caveat_400Regular,
    Caveat_600SemiBold,
    Caveat_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    BebasNeue_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    configureApi({
      baseUrl: 'https://www.makhanaghar.in/api',
      timeout: 15000,
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1a2e12',
          tabBarInactiveTintColor: '#777777',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#f0ebe3',
            borderTopWidth: 1,
            paddingBottom: 6,
            paddingTop: 6,
            height: 62,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.dmSansMedium,
            fontSize: 10.5,
          },
        }}
      >
        {/* 1. Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Home size={22} color={color} strokeWidth={1.8} />,
          }}
        />

        {/* 2. Products Tab */}
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
            tabBarIcon: ({ color }) => <ShoppingBag size={22} color={color} strokeWidth={1.8} />,
          }}
        />

        {/* 3. Center Floating Call Action Button */}
        <Tabs.Screen
          name="call"
          options={{
            title: 'Call',
            tabBarButton: () => (
              <Pressable
                style={styles.callTabBtnWrap}
                onPress={() => Linking.openURL('tel:+918002661555')}
              >
                <View style={styles.floatingCallCircle}>
                  <Phone size={22} color="#ffffff" strokeWidth={2.2} />
                </View>
                <Text style={styles.callTabLabel}>Call</Text>
              </Pressable>
            ),
          }}
        />

        {/* 4. About Tab */}
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => <Info size={22} color={color} strokeWidth={1.8} />,
          }}
        />

        {/* 5. Enquiry Tab */}
        <Tabs.Screen
          name="enquiry"
          options={{
            title: 'Enquiry',
            tabBarIcon: ({ color }) => <Mail size={22} color={color} strokeWidth={1.8} />,
          }}
        />

        {/* Secondary Routes hidden from bottom tab bar */}
        <Tabs.Screen name="categories" options={{ href: null }} />
        <Tabs.Screen name="blog" options={{ href: null }} />
        <Tabs.Screen name="more" options={{ href: null }} />
        <Tabs.Screen name="product/[slug]" options={{ href: null }} />
        <Tabs.Screen name="blog/[slug]" options={{ href: null }} />
        <Tabs.Screen name="gallery" options={{ href: null }} />
        <Tabs.Screen name="contact" options={{ href: null }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  callTabBtnWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4,
    position: 'relative',
  },
  floatingCallCircle: {
    position: 'absolute',
    top: -18,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1a2e12',
    borderWidth: 3,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  callTabLabel: {
    fontFamily: fonts.dmSansMedium,
    fontSize: 10.5,
    color: '#1a2e12',
    marginTop: 26,
  },
});
