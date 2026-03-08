const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS with flexible origin handling
const allowedOrigins = [
  'https://flightflavour.com',
  'https://www.flightflavour.com',
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or server requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Allow based on environment variable for flexibility
      const frontendUrl = process.env.FRONTEND_URL;
      if (origin === frontendUrl) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
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