export async function resultsLoader ({ request, params }) { 
    // Check for required environment variables
    const apiKey = process.env.REACT_APP_API_KEY;
    const searchUrl = process.env.REACT_APP_SEARCH_URL;
    const environment = process.env.REACT_APP_ENVIRONMENT || 'development';

    if (!apiKey) {
        throw new Error('REACT_APP_API_KEY is not set. Please check your .env file.');
    }

    if (!searchUrl) {
        throw new Error('REACT_APP_SEARCH_URL is not set. Please check your .env file.');
    }

    const myHeaders = new Headers()
    myHeaders.append("apikey", apiKey)
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        }

    // Set up the API URL based on environment
    let apiUrl;
    if (environment === 'production' && process.env.REACT_APP_PROXY_URL) {
        // Use the proxy server URL for production
        apiUrl = new URL(searchUrl, process.env.REACT_APP_PROXY_URL);
        requestOptions.mode = 'cors';
        // The proxy server handles CORS headers
    } else {
        // Use relative URL for development (proxy) or direct URL
        apiUrl = new URL(searchUrl, window.location.origin);
        if (environment === 'production') {
            requestOptions.mode = 'cors';
        }
    }

    const newParams = new URLSearchParams(params.searchParams)
    apiUrl.search = newParams.toString()
    
    const searchData = await fetch(apiUrl, requestOptions)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('ERROR: Network response error');
        }
    })
    .then(data => {
        const destiGroup = {};
        const gData = data.data
        for (var cityTo in gData) {
            var cityDest = gData[cityTo].cityTo
        if (!destiGroup[cityDest]) {
            destiGroup[cityDest] = []
        }
        destiGroup[cityDest].push(gData[cityTo])
        }
        return destiGroup
    })
    .catch((error) => console.error('ERROR: Fetch error', error));
    return { searchData }
}