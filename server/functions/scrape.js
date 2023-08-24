const cheerio = require('cheerio');

async function scrape(videoId) {
    const fetchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await fetchRes.text();

    const $ = cheerio.load(html);

    const pageTitle = $('title').text();
    console.log(pageTitle);
}

scrape();

module.exports.scrape = scrape;