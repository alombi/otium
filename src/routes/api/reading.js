import supabase from '$lib/db'
export async function get({ url }) {
   let userBookshelf;
   const userID = url.searchParams.get('user');
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', userID)
   userBookshelf = data[0].bookshelf.filter(function (e) {
      return e.tag == 'reading'
   })
   userBookshelf = userBookshelf.reverse()[0] 

   let request = await fetch('https://otium.vercel.app/api/book-' + userBookshelf.id)
   book = await request.json()
   book = book.results
   return {
      body: {
         db: userBookshelf,
         book: book
      }
   }
}