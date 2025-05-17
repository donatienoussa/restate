import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import './global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalProvider from '@/contexts/global-provider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * Ceci est le layout principal de l'application. 
 * On y fait la gestion du dark mode, de la statusbar et du chargement des polices. 
 */
export default function RootLayout() {

  // Ce hook detecte le mode dark ou light selon la configuration de l'appareil
  const colorScheme = useColorScheme();

  /* 
    Les polices utilisées sont des polices locales. Pour les utiliser, il faut suivre trois étapes.
    1. Après le téléchargement des polices, il faut les importer dans le fichier app.config.ts 
    2. Importer les polices dans le fichier _layout.tsx
    3. Importer les polices dans le fichier tailwindcss.config.js. Comme ça, on peut les utiliser directement avec tailwindcss (ex: font-rubik)
  */ 
  const [loaded] = useFonts({
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </GlobalProvider>
  );
}
