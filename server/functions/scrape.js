const cheerio = require('cheerio');

async function scrape(videoId) {
    const fetchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await fetchRes.text();
    const $ = cheerio.load(html);

    const infoText = $('script:contains("viewCount")').first().text();

    const title = $('meta[name=title]').attr('content');

    const viewsString = infoText.split('"viewCount":"')[1].split('"')[0];
    const views = +viewsString;
    
    console.log(number.toLocaleString('en-US'));
}

scrape('iuarghqmi-4');

module.exports.scrape = scrape;