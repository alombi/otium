import { supabaseClient } from '$lib/db';

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
   const { updatedData, updatedError } = await supabaseClient.from('friendship').update(friendship).eq('id', friendship.id)
   if (updatedError) {
      return updatedError
   }
}

export async function changeUsernameServer(username, id) {
   let result;
   const { data, error } = await supabaseClient.from('profiles').update({ 'username': username }).eq('id', id)
   if (error) {
      result = error
   }
   return result
}

export async function sendNotification(target, content, link, type) {
   var obj = {
      user: target,
      content: content,
      link: link,
      isRead: false,
      type: type
   }
   const { data, error } = await supabaseClient.from('notifications').insert(obj)
   if (error) {
      return error
   }
}