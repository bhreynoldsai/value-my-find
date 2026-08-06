import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { colors } from './theme';
import CameraScreen from './screens/CameraScreen';
import SavedScreen from './screens/SavedScreen';
import { FindsProvider } from './FindsContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FindsProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.accent700,
            tabBarInactiveTintColor: colors.neutral500,
            tabBarStyle: { backgroundColor: colors.bg },
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={route.name === 'Scan' ? 'camera' : 'bookmark'}
                size={size}
                color={color}
              />
            ),
          })}
        >
          <Tab.Screen name="Scan" component={CameraScreen} />
          <Tab.Screen name="Saved" component={SavedScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FindsProvider>
  );
}
