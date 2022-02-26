import supabase from '$lib/db'

export async function getBooksByTag(tag) {
   let DBbookshelf;
   try {
      const session = supabase.auth.session()
      const id = session.user.id
      const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id)
      DBbookshelf = data[0].bookshelf.filter(function (e) {
         return e.tag == tag
      })
   } catch (e) {
      console.log(e)
      DBbookshelf = []
   }
   return DBbookshelf
}