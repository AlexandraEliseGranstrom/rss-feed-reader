import RSSParser from 'rss-parser';
import express from 'express';
import cors from 'cors';

const urls = [
    'https://netflixtechblog.com/feed',
    'https://aws.amazon.com/blogs/opensource/feed/',
    'https://www.ibm.com/blogs/research/feed/',
    'https://techcrunch.com/feed/',
    'https://developers.googleblog.com/feeds/posts/default'
];


let articles = [];
const parser = new RSSParser();

const parse = async (urls) => {
    const feedPromises = urls.map(async url => {
        try {
            const feed = await parser.parseURL(url);
            const blogName = feed.title;
            return feed.items.map(item => ({
                title: item.title,
                link: item.link,
                rssLink: item.link,
                blog: blogName,
                pubDate: new Date(item.pubDate),
                content: item.content
            }));
        } catch (error) {
            console.error(`Error parsing feed at ${url}: `, error.message);
            return [];
        }
    });

    const results = await Promise.all(feedPromises);

    // Flatten the results and combine all articles into one array
    articles = results.flat();

    // Sort articles by date (most recent first)
    articles.sort((a, b) => b.pubDate - a.pubDate);

    // Limit to the latest 10 articles
    articles = articles.slice(0, 10);
};

await parse(urls);

let app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(articles);
});

const server = app.listen(4000, () => {
    console.log('Express server listening on port 4000');
});

export default server;
