import supabase from '$lib/db'
import moment from 'moment'

export async function addToBookshelf(bookID, tag, isStarred) {
   const session = supabase.auth.session()
   const id = session.user.id
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id)
   if (error) {
      return error
   } else {
      var obj = {
         id: bookID,
         added: moment().format(),
         tag: tag,
         starred: isStarred
      }
      let newData = data[0].bookshelf
      newData.push(obj)
      const { updatedData, updatedError } = await supabase.from('profiles').update({ bookshelf: newData }).eq('id', id)
      if (updatedError) {
         return updatedError
      }
   }
}

export async function removeFromBookshelf(bookID) {
   const session = supabase.auth.session()
   const id = session.user.id
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id)
   if (error) {
      return error
   } else {
      let newData = data[0].bookshelf.filter(function (e) {
         return e.id != bookID
      })
      const { updatedData, updatedError } = await supabase.from('profiles').update({ bookshelf: newData }).eq('id', id)
      if (updatedError) {
         return updatedError
      }
   }
}

export async function changeTag(bookID, tag) {
   const session = supabase.auth.session()
   const id = session.user.id
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id);
   if (error) {
      return error
   } else {
      let newData = data[0].bookshelf.filter(function (e) {
         if (e.id == bookID) {
            e.tag = tag
         }
         return e
      });
      const { updatedData, updatedError } = await supabase.from('profiles').update({ bookshelf: newData }).eq('id', id)
      if (updatedError) {
         return updatedError
      }
   }
}

export async function toggleStar(bookID) {
   const session = supabase.auth.session()
   const id = session.user.id
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id);
   if (error) {
      return error
   } else {
      let newData = data[0].bookshelf.filter(function (e) {
         if (e.id == bookID) {
            e.starred = !e.starred
         }
         return e
      });
      const { updatedData, updatedError } = await supabase.from('profiles').update({ bookshelf: newData }).eq('id', id)
      if (updatedError) {
         return updatedError
      }
   }
}