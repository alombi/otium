import supabase from '$lib/db';
import { notifsUnread } from '$lib/tag_store';

export async function makeUserStats(data) {
   let stats = {
      reading: 0,
      to_read: 0,
      read: 0,
      untagged: 0,
      favorites:0
   }
   let bookshelf = data[0].bookshelf;
   bookshelf.forEach(book => {
      if (book.tag == 'reading') {
         stats.reading += 1
      } else if(book.tag == 'to_read') {
         stats.to_read += 1
      } else if (book.tag == 'read') {
         stats.read += 1
      } else if (book.tag == 'unset') {
         stats.untagged += 1
      }
      if (book.starred) {
         stats.favorites += 1
      }
   });
   return stats
}


export async function changeUsernameServer(username, id) {
   let result;
   const { data, error } = await supabase.from('profiles').update({ 'username': username }).eq('id', id)
   if (error) {
      result = error
   }
   return result
}

export async function sendFriendRequest(targetID) {
   const session = supabase.auth.session()
   const userID = session.user.id
   const receiverName = await supabase.from('profiles').select('username').eq('id', targetID);
   const senderName = await supabase.from('profiles').select('username').eq('id', userID); 
   const { data, error } = await supabase.from('friendship').insert([
      {
         sender_id: userID,
         sender_name: senderName.data[0].username,
         receiver_id: targetID,
         receiver_name: receiverName.data[0].username,
         pending: true,
         status: null
      }
   ])
   if (error) {
      console.log(error, userID)
      return error
   }

}

export async function answerFriendRequest(hasAccepted, friendship) {
   if (hasAccepted) {
      friendship.pending = false;
      friendship.status = 'accepted'
   } else {
      friendship.pending = false;
      friendship.status = 'declined'
   }
   delete friendship.friendName;
   delete friendship.friendURL
   const { updatedData, updatedError } = await supabase.from('friendship').update(friendship).eq('id', friendship.id)
      if (updatedError) {
         return updatedError
      }
}
let finalBooks = []
export async function whatAreFriendsReading(friends) {
   if (finalBooks.length === 0) {
      friends.forEach(async friend => {
         var books = await supabase.from('profiles').select('bookshelf').eq('id', friend.friendID)
         books = books.data[0].bookshelf
         books = books.filter(function (e) {
            return e.tag == 'reading'
         })
         books.forEach(book => {
            book.user = friend.friendName
            book.userID = friend.friendID
            finalBooks.push(book)
         })
      });
      return finalBooks;
   } else {
      return finalBooks
   }
}

export async function sendNotification(target, content, link, type) {
   var obj = {
      user: target,
      content: content,
      link: link,
      isRead: false,
      type: type
   }
   const { data, error } = await supabase.from('notifications').insert(obj)
   if (error) {
      return error
   }
}

export async function markAsRead(id) {
   const { data, error } = await supabase.from('notifications').update({'isRead':true}).eq('id', id)
   if (error) {
      console.error(error)
   } else {
      let unreadNotifications = await supabase.from('notifications').select('*').is('isRead', false)
      unreadNotifications = unreadNotifications.data
      if (unreadNotifications.length == 0) {
         notifsUnread.set(false)
      }
   }
   
}