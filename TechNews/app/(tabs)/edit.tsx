import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EditScreen() {
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [blogs, setBlogs] = useState<{ link: string, name: string }[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const storedLinks = await AsyncStorage.getItem('links');
                const linksArray = storedLinks ? JSON.parse(storedLinks) : [];
                console.log('Fetched links:', linksArray);
                setBlogs(linksArray);
            } catch (error) {
                console.error('Failed to fetch links:', error);
                Alert.alert('Error', 'Failed to fetch links.');
            }
        };
        fetchBlogs();
    }, []);

    const handleAddLink = async () => {
        if (link && name) {
            console.log('Adding link:', link, name);
            try {
                const newLink = { link, name };
                const storedLinks = await AsyncStorage.getItem('links');
                const linksArray = storedLinks ? JSON.parse(storedLinks) : [];
                linksArray.push(newLink);
                await AsyncStorage.setItem('links', JSON.stringify(linksArray));
                setLink('');
                setName('');
                setBlogs(linksArray); // Update state with the new link
                Alert.alert('Success', 'Link added successfully!');
            } catch (error) {
                console.error('Failed to save link:', error);
                Alert.alert('Error', 'Failed to save the link.');
            }
        } else {
            Alert.alert('Validation', 'Please enter a link.');
        }
    };

    const handleDeleteLink = async (index: number) => {
        try {
            const updatedLinks = blogs.filter((_, i) => i !== index);
            await AsyncStorage.setItem('links', JSON.stringify(updatedLinks));
            setBlogs(updatedLinks);
            Alert.alert('Deleted', 'Link deleted successfully!');
        } catch (error) {
            console.error('Failed to delete link:', error);
            Alert.alert('Error', 'Failed to delete the link.');
        }
    };

    const handleEditLink = async (index: number) => {
        try {
            const updatedLinks = blogs.filter((_, i) => i !== index);
            await AsyncStorage.setItem('links', JSON.stringify(updatedLinks));
            setBlogs(updatedLinks);
            setLink(blogs[index].link);
            setName(blogs[index].name);
        } catch (error) {
            console.error('Failed to delete link:', error);
            Alert.alert('Error', 'Failed to delete the link.');
        }
    };

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
            <View style={styles.container}>
                <ThemedText type="title">Add Blog Link</ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder="Enter blog name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter blog link"
                    value={link}
                    onChangeText={setLink}
                />

                <Button title="Add Link" onPress={handleAddLink} />
            </View>
            <View style={styles.container}>
                <ThemedText type="title">Saved Links</ThemedText>
                {blogs.map((blog, index) => (
                    <View key={index} style={styles.linkContainer}>
                        <ThemedText>{blog.name}</ThemedText>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => handleDeleteLink(index)}>
                                <Icon name="trash-bin-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEditLink(index)}>
                                <Icon style={styles.icon} name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    headerImage: {
        height: 250,
        width: '100%',
        justifyContent: 'flex-end',
    },
    input: {
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        marginTop: 12,
        borderRadius: 4,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    iconContainer: {
        flexDirection: 'row',

    },
    icon: {
        marginLeft: 10,
    }
});
