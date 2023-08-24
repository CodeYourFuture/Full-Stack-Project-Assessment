const cheerio = require('cheerio');

async function scrape(videoId) {
    const fetchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await fetchRes.text();

    const $ = cheerio.load(html);

    const title = $('meta[name=title]').attr('content');
    console.log(title);
}

scrape('iuarghqmi-4');

module.exports.scrape = scrape;