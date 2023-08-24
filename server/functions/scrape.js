const cheerio = require('cheerio');

async function scrape(videoId) {
    const fetchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await fetchRes.text();
    const $ = cheerio.load(html);

    const infoText = $('script:contains("viewCount")').first().text();

    const title = $('meta[name=title]').attr('content');

    const views = Number(infoText.split('"viewCount":"')[1].split('"')[0]).toLocaleString('en-US');

    const uploadDate = infoText.split('"publishDate":"')[1].split('"')[0];

    const author = infoText.split('"author":"')[1].split('"')[0];

    console.log(title, views, uploadDate, author);
}

scrape('0wqE1LUITBY');

module.exports.scrape = scrape;