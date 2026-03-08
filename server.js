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

const corsOptions = {
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
        console.log(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey']
};

// Apply CORS globally
app.use(cors(corsOptions));

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
  onProxyRes: (proxyRes, req, res) => {
    // Ensure CORS headers are present on proxied responses
    const origin = req.headers.origin;
    
    if (!origin) return;
    
    const allowedOrigins = [
      'https://flightflavour.com',
      'https://www.flightflavour.com',
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL
    ];
    
    if (allowedOrigins.includes(origin)) {
      proxyRes.headers['Access-Control-Allow-Origin'] = origin;
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, apikey';
    }
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'API proxy error', message: err.message });
  }
}));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Flight Flavour API proxy running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});