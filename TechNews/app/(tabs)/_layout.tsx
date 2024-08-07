import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Favorite Blogs',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
          ),
        }}



      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Latest News',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}

      />
      <Tabs.Screen
        name="edit"
        options={{
          title: 'Edit Blogs',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'pencil' : 'pencil-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
