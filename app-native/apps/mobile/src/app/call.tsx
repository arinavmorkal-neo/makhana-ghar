import { useEffect } from 'react';
import { View, Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function CallScreen() {
  const router = useRouter();

  useEffect(() => {
    Linking.openURL('tel:+918002661555');
    router.replace('/');
  }, [router]);

  return <View style={{ flex: 1, backgroundColor: '#ffffff' }} />;
}
