export async function load({ url }) {
    const query = url.searchParams.get('q');
    const lang = url.searchParams.get('lang');
    if(query){
        const reqUrl = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${query}&maxResults=10&printType=books&langRestrict=${lang}`;
        let req = await fetch(reqUrl)
        let data = await req.json()
        data = data.items
        var dataFiltered = [];
        data.forEach(book => {
            dataFiltered.push(book)
        });
        return {
            results: data,
            query: query
        }
    }else{
        return {
            results: [],
            query: ''
        }
    }
}