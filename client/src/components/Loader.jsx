export async function resultsLoader ({ request, params }) { 
    const myHeaders = new Headers()
    myHeaders.append("apikey", process.env.REACT_APP_API_KEY)
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Access-Control-Allow-Methods", "GET, POST")
    myHeaders.append("Access-Control-Allow-Origin", "*")
    myHeaders.append("Origin", "http://localhost:3000/")
    myHeaders.append("Content-Encoding", "gzip")
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors',
        }

    const url = new URL(process.env.REACT_APP_SEARCH_URL)
    const newParams = new URLSearchParams(params.searchParams)
    const newUrl = new URL(`${url}?${newParams}`)
    
    const searchData = await fetch(newUrl, requestOptions)
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