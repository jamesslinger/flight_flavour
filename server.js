const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy API requests to Kiwi.com
app.use('/api', createProxyMiddleware({
  target: 'https://api.tequila.kiwi.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add your API key
    proxyReq.setHeader('apikey', process.env.REACT_APP_API_KEY);
  }
}));

app.listen(3001, () => {
  console.log('Proxy server running on port 3001');
});