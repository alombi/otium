import supabase from '$lib/db'

export async function getBooksById(tag) {
   let DBbookshelf;
   const session = supabase.auth.session()
   const id = session.user.id
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id)
   DBbookshelf = data[0].bookshelf.filter(function (e) {
      return e.tag == tag
   })
   return DBbookshelf
}