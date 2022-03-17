import supabase from '$lib/db'

export async function getBooksByTag(tag, userID) {
   let DBbookshelf, id;
   try {
      if (!userID) {
         const session = supabase.auth.session()
         id = session.user.id
      } else {
         id = userID
      }
      const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id)
      DBbookshelf = data[0].bookshelf.filter(function (e) {
         return e.tag == tag
      })
   }catch(e) {
      console.log(e);
      DBbookshelf = []
   }
   return DBbookshelf
}

export async function getStarredBooks(userID) {
   let DBbookshelf, id;
   try {
      if (!userID) {
         const session = supabase.auth.session()
         id = session.user.id
      } else {
         id = userID
      }
      const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id)
      DBbookshelf = data[0].bookshelf.filter(function (e) {
         return e.starred == true
      })
   }catch(e) {
      console.log(e);
      DBbookshelf = []
   }
   return DBbookshelf
}