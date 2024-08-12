import { Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBlogs } from '../BlogsContext';


export default function HomeScreen() {

  const { blogs } = useBlogs();

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
            <ThemedText type="subtitle">{blog.title}</ThemedText>
            <ThemedText>{blog.content}</ThemedText>
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
