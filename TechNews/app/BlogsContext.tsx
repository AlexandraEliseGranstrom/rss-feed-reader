// BlogsContext.tsx
import axios from 'axios';
import React, { createContext, useContext, ReactNode } from 'react';
import { useEffect, useState } from 'react';
// Define the shape of your blog data
interface Blog {
    title: string;
    link: string;
    content: string;
    rssLink: string;
}

// Define the context type
interface BlogsContextType {
    blogs: Blog[];
}

// Create the context with a default value
const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

// Define the provider component
export const BlogsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State to hold the blogs
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        getArticles();
    }, []);
    const getArticles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/');
            console.log(response.data);
            setBlogs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // const blogs: Blog[] = [
    //     {
    //         title: 'React Native Official Blog',
    //         link: 'https://reactnative.dev/blog',
    //         rssLink: 'https://reactnative.dev/blog/feed.xml',
    //         content: 'Stay up-to-date with the latest news and updates from the React Native team.',
    //     },
    //     {
    //         title: 'The Verge',
    //         link: 'https://www.theverge.com/',
    //         content: 'Covers the intersection of technology, science, art, and culture.',
    //         rssLink: 'https://www.theverge.com/rss/index.xml',
    //     },
    //     {
    //         title: 'TechCrunch',
    //         link: 'https://techcrunch.com/',
    //         content: 'Breaking technology news, analysis, and opinions from TechCrunch.',
    //         rssLink: 'https://techcrunch.com/feed/',
    //     },
    //     {
    //         title: 'CSS-Tricks',
    //         link: 'https://css-tricks.com/',
    //         content: 'Tips and tricks for using CSS in web development, including tutorials and articles.',
    //         rssLink: 'https://css-tricks.com/feed/',
    //     },
    //     {
    //         title: 'Smashing Magazine',
    //         link: 'https://www.smashingmagazine.com/',
    //         content: 'An online magazine for professional web designers and developers.',
    //         rssLink: 'https://www.smashingmagazine.com/feed/',
    //     },
    // ];

    return <BlogsContext.Provider value={{ blogs }}>{children}</BlogsContext.Provider>;
};

// Custom hook to use the BlogsContext
export const useBlogs = (): BlogsContextType => {
    const context = useContext(BlogsContext);
    if (!context) {
        throw new Error('useBlogs must be used within a BlogsProvider');
    }
    return context;
};
