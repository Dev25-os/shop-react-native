import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.PRIMARY }}>
      <Tabs.Screen name='Home'
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused, size }) => <Ionicons name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='Explore'
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, focused, size }) => <Ionicons name="search" size={24} color={color} />
        }} />
      <Tabs.Screen name='Profile'
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused, size }) => <Ionicons name="people" size={24} color={color} />
        }}
      />

    </Tabs>
  )
}