import supabase from '$lib/db'
import moment from 'moment'

export async function updateProgress(bookID, progress, totalPages) {
   const session = supabase.auth.session()
   const id = session.user.id
   const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', id);
   if (error) {
      return error
   } else {
      let newData = data[0].bookshelf.filter(function (e) {
         if (e.id == bookID) {
            if (Number(progress) < totalPages + 1) {
               e.progress = Number(progress)
            } else {
               e.progress = totalPages
            }
         }
         return e
      });
      const { updatedData, updatedError } = await supabase.from('profiles').update({ bookshelf: newData }).eq('id', id)
      if (updatedError) {
         return updatedError
      }
   }
}

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
            if (tag == 'reading') {
               e.progress = 0
            }
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
let commonBookFriends = [];
let id; 
export async function isInFriendsBookshelf(friends, bookID, bookshelf) {
   if (id != bookID) {
      id = bookID
      commonBookFriends = []
      friends.forEach(async friend => {
         let friendBookshelf = await supabase.from('profiles').select('bookshelf').eq('id', friend.friendID)
         friendBookshelf = friendBookshelf.data[0].bookshelf;
         friendBookshelf.forEach(book => {
            //if (book.id == bookID && containsObject(book, bookshelf)) {
            if (book.id == bookID) {
               friend.bookTagged = book.tag
               friend.friendURL = `/user/${friend.friendID}`
               commonBookFriends.push(friend)
            }
         })
      })
      return commonBookFriends
   }
   else {
      return commonBookFriends
   }
}
function containsObject(obj, list) {
   var i;
   for (i = 0; i < list.length; i++) {
       if (list[i].id === obj.id) {
           return true;
       }
   }

   return false;
}
// let n = 1
// export async function isInFriendsBookshelf(friends, bookID) {
//    console.log(n)
//    n = n + 1
//    console.log(n)
//    return []
// }