const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is your scraper app!');
});

// app.post('/scrape', async (req, res) => {
// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;

//   if (!url) {
//     return res.status(400).json({ error: 'URL not provided' });
//   }

//   try {
//     const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//     const page = await browser.newPage();
//     await page.goto(url);

//     // Example scraping logic
//     const title = await page.title();

//     await browser.close();

//     res.json({ title });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to scrape data' });
//   }
// });

const scrapeUrl = 'https://en.wikipedia.org/wiki/Virat_Kohli';

// Define route for scraping endpoint using GET method
app.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(scrapeUrl); // Use the hardcoded URL here

    // Example scraping logic
    const title = await page.title();

    await browser.close();

    res.json({ title });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
