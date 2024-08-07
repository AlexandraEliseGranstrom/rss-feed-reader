// BlogsContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';

// Define the shape of your blog data
interface Blog {
    title: string;
    link: string;
    content: string;
}

// Define the context type
interface BlogsContextType {
    blogs: Blog[];
}

// Create the context with a default value
const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

// Define the provider component
export const BlogsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const blogs: Blog[] = [
        {
            title: 'React Native Official Blog',
            link: 'https://reactnative.dev/blog',
            content: 'Stay up-to-date with the latest news and updates from the React Native team.',
        },
        {
            title: 'The Verge',
            link: 'https://www.theverge.com/',
            content: 'Covers the intersection of technology, science, art, and culture.',
        },
        {
            title: 'TechCrunch',
            link: 'https://techcrunch.com/',
            content: 'Breaking technology news, analysis, and opinions from TechCrunch.',
        },
        {
            title: 'CSS-Tricks',
            link: 'https://css-tricks.com/',
            content: 'Tips and tricks for using CSS in web development, including tutorials and articles.',
        },
        {
            title: 'Smashing Magazine',
            link: 'https://www.smashingmagazine.com/',
            content: 'An online magazine for professional web designers and developers.',
        },
    ];

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
