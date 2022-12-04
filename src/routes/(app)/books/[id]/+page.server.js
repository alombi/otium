import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export async function load(event){
    const { session, supabaseClient } = await getSupabase(event);
    const id = event.params.id;
    let book;
    try{
        let request = await fetch(event.url.origin + '/api/book?id=' + id)
        book = await request.json()
    }catch(e){    
        book = null
    }
    // Requesting data from Otium DB
    let dataFiltered, bookshelf, friends = [], flows = []
    if (session) {
		const { data, error } = await supabaseClient.from('profiles').select('bookshelf').eq('id', session.user.id)
        bookshelf = data[0].bookshelf
        dataFiltered = data[0].bookshelf
        dataFiltered = dataFiltered.filter(function(e){
            return e.id == id
        })
        if(dataFiltered.length == 0){
            dataFiltered = null
        }
        let friendship = await supabaseClient.from('friendship').select('*');
        friendship = friendship.data;
        friendship.filter(function (e){
            if(e.sender_id == session.user.id || e.receiver_id == session.user.id){
                if(e.status != 'declined'){
                    friends.push(e)
                }
            }
        })
        friends.forEach(friend => {
        if(session.user.id != friend.receiver_id){
            friend.friendName = friend.receiver_name
            friend.friendID = friend.receiver_id
            friend.friendURL = `/user/${friend.receiver_id}`
        }else{
            friend.friendName = friend.sender_name
            friend.friendID = friend.sender_id
            friend.friendURL = `/user/${friend.sender_id}`
        }
        });
        flows = await supabaseClient.from('reading_flow').select('*').eq('book_id', id)
        flows = flows.data
        flows = flows.filter(function (e){
            return e.isPublic
        })
        // e.user_id != userID
        flows.forEach(async flow=>{
            flow.url = '/reading-flow/' + flow.id
        })
    
        var tags = {
            unset: 'Added to bookshelf',
            read: 'Read',
            to_read: 'Marked as to read',
            reading: 'Reading now'
        }
	}
    return {
        book,
        dataFiltered, 
        tags, 
        friends, 
        id, 
        bookshelf, 
        flows,
        session: session
    }
}