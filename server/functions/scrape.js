const cheerio = require('cheerio');

async function scrape(videoId) {
    const fetchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await fetchRes.text();
    const $ = cheerio.load(html);

    const infoText = $('script:contains("viewCount")').first().text();

    const title = $('meta[name=title]').attr('content');

    const viewsString = infoText.split('"viewCount":"')[1].split('"')[0];
    const views = +viewsString;

    const uploadDate = infoText.split('"publishDate":"')[1].split('"')[0];

    const author = infoText.split('"author":"')[1].split('"')[0];

    const imageURL = infoText.split('","width":1920')[0].split('"height":188},{"url":"')[1];

    console.log(imageURL);
}

scrape('PqLfEFC3XZQ');

module.exports.scrape = scrape;