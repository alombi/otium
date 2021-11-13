import { GOOGLE_BOOKS_KEY } from '$lib/env'
export async function get({ query }) {
   if (process.env.NODE_ENV === 'production') {
      // For production
      googleKey = process.env.GOOGLE_BOOKS_KEY;
   } else {
      // For development
      googleKey = GOOGLE_BOOKS_KEY;
   }
   const params = query.get('q');
   var dataFiltered = [];
   const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY
   const url = `https://www.googleapis.com/books/v1/volumes?q=${params}&key=${googleKey}&maxResults=10&printType=books`
   let req = await fetch(url)
   var data = await req.json()
   data = data.items
   data.forEach(book => {
      if (book.volumeInfo.publisher != undefined && book.volumeInfo.imageLinks != undefined) {
         dataFiltered.push(book)
      }
   });
   return {
      body: {
         results: dataFiltered
      }
   }
}