import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Impor semua komponen layar Anda
import LoginScreen from './src/Login';
import DashboardScreen from './src/Dashboard';
import ProfileScreen from './src/Profile';
import AmbilAntreanScreen from './src/AmbilAntrean';
import LayananAntreanScreen from './src/LayananAntrean';
import DokumenPersyaratanScreen from './src/DokumenPersyaratan';
import TicketScreen from './src/Ticket';

// Buat navigator stack
const Stack = createNativeStackNavigator();

export default function App() {
  // State untuk melacak status login dan data pengguna
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fungsi yang akan dipanggil saat login berhasil, sekarang menerima data
  const handleLoginSuccess = (data) => {
    setUserData(data); // Simpan data dari API
    setIsLoggedIn(true);
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    setUserData(null); // Hapus data pengguna
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // Jika pengguna sudah login, tampilkan grup layar utama
          <>
            <Stack.Screen name="Dashboard">
              {/* Teruskan userData ke Dashboard */}
              {(props) => <DashboardScreen {...props} onLogout={handleLogout} userData={userData} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="AmbilAntrean" component={AmbilAntreanScreen} />
            <Stack.Screen name="LayananAntrean" component={LayananAntreanScreen} />
            <Stack.Screen name="DokumenPersyaratan" component={DokumenPersyaratanScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
          </>
        ) : (
          // Jika pengguna belum login, tampilkan Login
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
          
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
