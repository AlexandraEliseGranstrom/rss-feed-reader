import { Image, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [blogs, setBlogs] = useState<{ blog: string; link: string }[]>([]);

  const fetchBlogs = async () => {
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      const linksArray = storedLinks ? JSON.parse(storedLinks) : [];
      console.log('Fetched links index:', linksArray);
      setBlogs(linksArray);
    } catch (error) {
      console.error('Failed to fetch links:', error);
      Alert.alert('Error', 'Failed to fetch links.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBlogs();
    }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/header_home.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My Favorite Techblogs</ThemedText>
      </ThemedView>
      {blogs.map((blog: any, index: any) => (
        <ThemedView key={index} style={styles.stepContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(blog.link)}>
            <ThemedText type="subtitle">{blog.name}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    height: 250,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
