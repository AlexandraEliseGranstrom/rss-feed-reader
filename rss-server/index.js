import RSSParser from 'rss-parser';
import express from 'express';
import cors from 'cors';

const feedUrl = 'https://netflixtechblog.com/feed';
let articles = [];
const parser = new RSSParser();

const parse = async url => {
    const feed = await parser.parseURL(url);

    feed.items.forEach(item => {
        articles.push({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            content: item.content
        });
    });
}

parse(feedUrl);

let app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(articles);
});

const server = app.listen(4000, () => {
    console.log('Express server listening on port 4000');
});

export default server;