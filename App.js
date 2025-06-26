import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import SplashScreen from './src/SplashScreen'; // Tambah import SplashScreen
import LoginScreen from './src/Login';
import DashboardScreen from './src/Dashboard';
import ProfileScreen from './src/Profile';
import AmbilAntreanScreen from './src/AmbilAntrean';
import LayananAntreanScreen from './src/LayananAntrean';
import DokumenPersyaratanScreen from './src/DokumenPersyaratan';
import TicketScreen from './src/Ticket';
import TermsAndConditionsScreen from './src/TermsAndConditionsScreen';
import PrivacyPolicyScreen from './src/PrivacyPolicyScreen';
import NearestBranchScreen from './src/Cabang';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [showSplash, setShowSplash] = useState(true); // ⬅️ Tambahkan state splash

  useEffect(() => {
    // Tampilkan splash selama 2 detik
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Gagal membaca token dari storage", e);
      } finally {
        setIsCheckingToken(false);
      }
    };

    if (!showSplash) {
      checkToken();
    }
  }, [showSplash]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('loketId');
    } catch (e) {
      console.error("Gagal menghapus token dari storage", e);
    }
    setIsLoggedIn(false);
  };

  if (showSplash) {
    return <SplashScreen />; // ⬅️ Tampilkan splash dulu
  }

  if (isCheckingToken) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Dashboard">
              {(props) => <DashboardScreen {...props} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="AmbilAntrean" component={AmbilAntreanScreen} />
            <Stack.Screen name="LayananAntrean" component={LayananAntreanScreen} />
            <Stack.Screen name="DokumenPersyaratan" component={DokumenPersyaratanScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
            <Stack.Screen name="NearestBranch" component={NearestBranchScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
