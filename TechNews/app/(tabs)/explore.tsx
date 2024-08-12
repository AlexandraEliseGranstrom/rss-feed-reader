
import { StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as rssParser from 'react-native-rss-parser';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBlogs } from '../BlogsContext';

// interface BlogContent {
//   title: string;
//   content: string;
//   date: string;
//   link: string;
// }

export default function TabTwoScreen() {
  const { blogs } = useBlogs();


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/header_home.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Latest news</ThemedText>
      </ThemedView>

      {blogs.map((blog, index) => (
        <Collapsible key={index} title={blog.title}>
          <ThemedText>{blog.content}</ThemedText>
          <ExternalLink href={blog.link}>
            <ThemedText type="link">Read more</ThemedText>
          </ExternalLink>
        </Collapsible>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: '100%',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
