// BlogsContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useContext, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
// Define the shape of your blog data
interface BlogData {
    title: string;
    link: string;
    content: string;
    blog: string;
    rssLink: string;
}

// Define the context type
interface BlogsContextType {
    blogData: BlogData[];
}

// Create the context with a default value
const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

// Define the provider component
export const BlogsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State to hold the blogs
    const [blogPosts, setBlogPosts] = useState<BlogData[]>([]);
    useEffect(() => {
        getArticles();
    }, []);


    const getArticles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/');
            setBlogPosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return <BlogsContext.Provider value={{ blogData: blogPosts }}>{children}</BlogsContext.Provider>;
};

// Custom hook to use the BlogsContext
export const useBlogs = (): BlogsContextType => {
    const context = useContext(BlogsContext);
    if (!context) {
        throw new Error('useBlogs must be used within a BlogsProvider');
    }
    return context;
};
