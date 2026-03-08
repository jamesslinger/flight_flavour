const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Proxy API requests to Kiwi.com
app.use('/api', createProxyMiddleware({
  target: 'https://api.tequila.kiwi.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add your API key from environment variable
    const apiKey = process.env.KIWI_API_KEY;
    if (apiKey) {
      proxyReq.setHeader('apikey', apiKey);
    }
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'API proxy error' });
  }
}));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Flight Flavour API proxy running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});