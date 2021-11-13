import { GOOGLE_BOOKS_KEY } from '$lib/env'
export async function get({ params }) {
   if (process.env.NODE_ENV === 'production') {
      // For production
      googleKey = process.env.GOOGLE_BOOKS_KEY;
   } else {
      // For development
      googleKey = GOOGLE_BOOKS_KEY;
   }
   const id = params.id
   const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${googleKey}`
   let req = await fetch(url)
   var data = await req.json()
   return {
      body: {
         results: data
      }
   }
}