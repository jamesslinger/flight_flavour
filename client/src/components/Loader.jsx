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

    // In production, we need to handle CORS differently since there's no proxy
    if (environment === 'production') {
        requestOptions.mode = 'cors';
        // The API server should handle CORS headers in the response
    }
    // In development, the proxy handles CORS, so no special mode needed

    const url = new URL(searchUrl, window.location.origin)
    const newParams = new URLSearchParams(params.searchParams)
    url.search = newParams.toString()
    
    const searchData = await fetch(url, requestOptions)
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