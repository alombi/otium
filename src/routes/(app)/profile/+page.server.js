import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { makeUserStats } from '$lib/userActions';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
    let id = session.user.id
    let friends = []

    const { data: userData } = await supabaseClient.from('profiles').select('*').eq('id', id)
    const { data: profiles } = await supabaseClient.from('profiles').select('*');
    let { data: friendship }= await supabaseClient.from('friendship').select('*');
    friendship.filter(function (e){
        if(e.sender_id == id || e.receiver_id == id){
            if(e.status != 'declined'){
                friends.push(e)
            }
        }
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
    let stats = await makeUserStats(userData)

    return { id, profiles, friends, userData, stats }
}