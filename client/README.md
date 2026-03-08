# Flight Flavour - Environment Setup

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flight_flavour/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace the placeholder values with your actual API credentials:
   ```env
   REACT_APP_API_KEY=your_actual_api_key_from_kiwi
   REACT_APP_SEARCH_URL=/v2/search
   REACT_APP_ENVIRONMENT=development
   ```

4. **Get your Kiwi.com API key**

   - Sign up at [Kiwi.com Partners](https://partners.kiwi.com/)
   - Get your API key from the dashboard
   - Replace `your_actual_api_key_from_kiwi` in the `.env` file

## Environment Variables

| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `REACT_APP_API_KEY` | Your Kiwi.com API key | Required | Required |
| `REACT_APP_SEARCH_URL` | API endpoint URL | `/v2/search` (uses proxy) | `https://api.tequila.kiwi.com/v2/search` |
| `REACT_APP_ENVIRONMENT` | Environment mode | `development` | `production` |

## Development

```bash
npm start
```

The development server uses a proxy to avoid CORS issues.

## Production Deployment

For production deployment on Render.com:

1. **Deploy the backend proxy first** (see `../RENDER_DEPLOYMENT.md`)
2. **Update `.env.production`** with your Render.com backend URL:
   ```env
   REACT_APP_PROXY_URL=https://your-backend-service.onrender.com
   ```
3. **Build and deploy** using `npm run build:prod`

The production setup uses a backend proxy to avoid CORS issues with the Kiwi API.

## Security Notes

- Never commit `.env` files to git
- Keep your API keys secure and rotate them regularly
- Use different API keys for development and production if possible

## Troubleshooting

If you get API errors:
1. Check that your `.env` file exists and has the correct API key
2. Verify your Kiwi.com API key is active
3. For production, ensure CORS is properly configured on your hosting platform