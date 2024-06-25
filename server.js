const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = '8a4331e2183746bc89ede970c393785d'; 


const cache = new NodeCache({ stdTTL: 600 });


app.use(express.json());


app.get('/exchange-rates', async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Please provide both "from" and "to" currency codes.' });
  }

  const cacheKey = `${from}_${to}`;
  const cachedRate = cache.get(cacheKey);

  if (cachedRate) {
    return res.json({ ...cachedRate, source: 'Cache' });
  }

  try {
    const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=${from},${to}`;
    const response = await axios.get(apiUrl);

    const { date, rates } = response.data;

    if (!rates[from] || !rates[to]) {
      return res.status(404).json({ error: `Exchange rate not found for ${from} to ${to}.` });
    }

    const exchangeRate = rates[to] / rates[from];

    cache.set(cacheKey, {
      date,
      from,
      to,
      rate: exchangeRate.toFixed(4) 
    });

    res.json({
      date,
      from,
      to,
      rate: exchangeRate.toFixed(4), 
      source: 'CurrencyFreaks API'
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message.includes('Exchange rate not found')) {
        return res.status(404).json({ error: `Exchange rate not found for ${from} to ${to}.` });
      }
     
      return res.status(error.response.status || 500).json({ error: error.response.data.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
});

const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, please try again later.'
}));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
