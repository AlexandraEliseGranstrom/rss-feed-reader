
import { StyleSheet, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBlogs } from '../BlogsContext';
import RenderHtml from 'react-native-render-html';

interface BlogContent {
  title: string;
  content: string;
  date: string;
  link: string;
  rssLink: string;
}

export default function TabTwoScreen() {
  const { blogData: blogs } = useBlogs();
  const { width } = useWindowDimensions();


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
          <RenderHtml
            contentWidth={width}
            source={{ html: blog.content }}
          />
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
