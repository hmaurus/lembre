import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { setupNotificationHandler } from '../src/services/notifications';

export default function RootLayout() {
  useEffect(() => {
    setupNotificationHandler();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
