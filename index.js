const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is your scraper app!');
});

const scrapeUrl = 'https://en.wikipedia.org/wiki/Virat_Kohli';

// Define route for scraping endpoint using GET method
app.get('/scrape', async (req, res) => {
  try {
    const result = await scrapeWithPuppeteer(scrapeUrl);
    res.json(result);
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

async function scrapeWithPuppeteer(url) {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);

    // Example scraping logic
    const title = await page.title();

    await browser.close();

    return { title };
  } catch (error) {
    console.error('Error in scraping function:', error);
    throw error; // Rethrow the error for centralized error handling
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
