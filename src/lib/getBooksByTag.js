import supabase from '$lib/db';

export async function getBooksByTag(userID, tag) {
   let DBbookshelf;
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', userID)
   DBbookshelf = data[0].bookshelf.filter(function (e) {
      return e.tag == tag
   })
   return DBbookshelf;
}