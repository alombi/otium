export async function get({query}) {
   const params = query.get('q');
   var dataFiltered = [];
   const key = process.env.VITE_GOOGLE_BOOKS_KEY
   const url = `https://www.googleapis.com/books/v1/volumes?q=${params}&key=${key}&maxResults=10&printType=books`
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