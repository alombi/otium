export async function get({query}) {
   const params = query.get('q');
   const lang = query.get('lang')
   var dataFiltered = [];
   const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY
   const url = `https://www.googleapis.com/books/v1/volumes?q=${params}&key=${key}&maxResults=40&printType=books&langRestrict=${lang}`
   let req = await fetch(url)
   var data = await req.json()
   data = data.items
   data = data.slice(0, 16)
   data.forEach(book => {
      dataFiltered.push(book)
   });
   return {
      body: {
         results: dataFiltered
      }
   }
}