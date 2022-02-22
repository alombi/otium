import { GOOGLE_BOOKS_KEY } from '$lib/env'
export async function get({ url }) {
   if (process.env.NODE_ENV === 'production') {
      // For production
      googleKey = process.env.GOOGLE_BOOKS_KEY;
   } else {
      // For development
      googleKey = GOOGLE_BOOKS_KEY;
   }
   const params = url.searchParams.q
   const lang = url.searchParams.lang
   var dataFiltered = [];
   //const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY
   const reqUrl = `https://www.googleapis.com/books/v1/volumes?q=${params}&key=${googleKey}&maxResults=10&printType=books&langRestrict=${lang}`
   let req = await fetch(reqUrl)
   var data = await req.json()
   data = data.items
   data.forEach(book => {
      dataFiltered.push(book)
   });
   return {
      body: {
         results: dataFiltered
      }
   }
}
