import supabase from '$lib/db'

let session, id;
export async function getBooksByTag(tag) {
   let DBbookshelf;
   try {
      session = supabase.auth.session()
      id = session.user.id
   } catch (e) {
      console.log(e)
      setTimeout(() => {
         session = supabase.auth.session()
         id = session.user.id
      }, 400)
   }
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id)
   DBbookshelf = data[0].bookshelf.filter(function (e) {
      return e.tag == tag
   })
   return DBbookshelf
}