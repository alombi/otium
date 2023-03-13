import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { makeUserStats } from '$lib/userActions';

export async function load(event){
    const baseUrl = event.url.origin
    const { session, supabaseClient } = await getSupabase(event);
    const id = event.params.id;

    const { data, error } = await supabaseClient.from('profiles').select('*').eq('id', id)
    let user;
    if(session){
        user = await supabaseClient.from('profiles').select('*').eq('id', session.user.id)
        user = user.data
    }else{
        user = null
    }
    let friends = [];
    let friendship = await supabaseClient.from('friendship').select('*');
    friendship = friendship.data;
    friendship.filter(function (e){
        if(e.sender_id == id || e.receiver_id == id){
        if(e.status != 'declined'){
            friends.push(e)
        }
        }
    })
    let isFriend = false;
    friends.forEach(friend =>{
        try{
        if(session.user.id === friend.sender_id || session.user.id === friend.receiver_id){
            if(friend.status != 'declined'){
                isFriend = true
            }
        }
        }catch{}
    })
    friends.forEach(friend => {
        if(id != friend.receiver_id){
           friend.friendName = friend.receiver_name
           friend.friendURL = `/user/${friend.receiver_id}`
        }else{
           friend.friendName = friend.sender_name
           friend.friendURL = `/user/${friend.sender_id}`
        }
    });
    let stats = await makeUserStats(data)
    let bookshelf = []
    try{
        
        for(let book of data[0].bookshelf){
            var bookFinal = {};
            bookFinal.tag = book.tag
            bookFinal.starred = book.starred
            bookFinal.id = book.id
            book = await requestBook(book.id, baseUrl)
            
            if(book.volumeInfo.imageLinks){
                bookFinal.cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
            } else{
                bookFinal.cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
            };
            bookFinal.title = book.volumeInfo.title;
            bookFinal.author = book.volumeInfo.authors[0];
            bookFinal.publisher = book.volumeInfo.publisher;
            bookFinal.year = book.volumeInfo.publishedDate.split('-')[0]
            bookFinal.url = `/books/${book.id}`
            bookshelf.push(bookFinal)
        }
        bookshelf = bookshelf.reverse()
    }catch(e){}

    return {
        dbData: data, 
        id, 
        friends, 
        isFriend, 
        user,
        stats,
        bookshelf
    }
}


async function requestBook(id, baseUrl){
    let request = await fetch(baseUrl + '/api/book?id=' + id)
    var book = await request.json()
    return book
}