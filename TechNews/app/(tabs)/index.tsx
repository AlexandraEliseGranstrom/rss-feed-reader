import { Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBlogs } from '../BlogsContext';


// const blogs = [
//   {
//     title: 'React Native Official Blog',
//     link: 'https://reactnative.dev/blog',
//     content: 'Stay up-to-date with the latest news and updates from the React Native team.',
//   },
//   {
//     title: 'The Verge',
//     link: 'https://www.theverge.com/',
//     content: 'Covers the intersection of technology, science, art, and culture.',
//   },
//   {
//     title: 'TechCrunch',
//     link: 'https://techcrunch.com/',
//     content: 'Breaking technology news, analysis, and opinions from TechCrunch.',
//   },
//   {
//     title: 'CSS-Tricks',
//     link: 'https://css-tricks.com/',
//     content: 'Tips and tricks for using CSS in web development, including tutorials and articles.',
//   },
//   {
//     title: 'Smashing Magazine',
//     link: 'https://www.smashingmagazine.com/',
//     content: 'An online magazine for professional web designers and developers.',
//   },
// ];



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
