export async function get({ params }) {
   const id = params.id
   //const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY
   const key = process.env.VITE_GOOGLE_BOOKS_KEY
   const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${key}`
   let req = await fetch(url)
   var data = await req.json()
   return {
      body: {
         results: data
      }
   }
}