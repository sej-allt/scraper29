const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is your scraper app!');
});

const scraperApiKey = '360b80f6bfee27a72d50f01bf909ad8c'; // Replace with your ScraperAPI key
const scraperapiUrl = `http://api.scraperapi.com?api_key=${scraperApiKey}&url=`;

// Define route for scraping endpoint using GET method
app.get('/scrape', async (req, res) => {
  const scrapeUrl = req.query.url; // Retrieve URL from query parameter

  if (!scrapeUrl) {
    return res.status(400).json({ error: 'URL not provided' });
  }

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
    await page.goto(`${scraperapiUrl}${url}`); // Use ScraperAPI URL to bypass restrictions

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
