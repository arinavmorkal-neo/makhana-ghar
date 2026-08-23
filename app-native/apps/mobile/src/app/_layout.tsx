/**
 * Root Layout — Tab navigation for Makhana Ghar
 */
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Home, ShoppingBag, Grid3X3, BookOpen, MoreHorizontal } from 'lucide-react-native';
import { colors, componentSpecs } from '@makhana-ghar/design-system';
import { configureApi } from '@makhana-ghar/core';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    configureApi({
      baseUrl: 'https://www.makhanaghar.in/api',
      timeout: 15000,
    });
  }, []);

  const tabBar = componentSpecs.tabBar;

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: tabBar.activeColor,
          tabBarInactiveTintColor: tabBar.inactiveColor,
          tabBarStyle: {
            backgroundColor: tabBar.bg,
            borderTopColor: tabBar.borderColor,
            borderTopWidth: 1,
            paddingBottom: 6,
            paddingTop: 6,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: tabBar.labelFontSize,
            fontWeight: tabBar.labelFontWeight,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
            tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Categories',
            tabBarIcon: ({ color, size }) => <Grid3X3 size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="blog"
          options={{
            title: 'Blog',
            tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ color, size }) => <MoreHorizontal size={size} color={color} />,
          }}
        />
        {/* Hide detail screens from tab bar */}
        <Tabs.Screen name="product/[slug]" options={{ href: null }} />
        <Tabs.Screen name="blog/[slug]" options={{ href: null }} />
        <Tabs.Screen name="enquiry" options={{ href: null }} />
        <Tabs.Screen name="about" options={{ href: null }} />
        <Tabs.Screen name="gallery" options={{ href: null }} />
        <Tabs.Screen name="contact" options={{ href: null }} />
      </Tabs>
    </>
  );
}
