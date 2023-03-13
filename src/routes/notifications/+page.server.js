import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: DBnotifications } = await supabaseClient.from('notifications').select('*');
    let notifications = DBnotifications.filter((item)=>{
        return item.user == session.user.id
    })

    const { data: profiles } = await supabaseClient.from('profiles').select('*')
    notifications.forEach(notif =>{
        if(notif.type == 'suggestion'){
            profiles.forEach(user =>{
                if(user.username && notif.content.indexOf(user.id) != -1){
                    notif.content = notif.content.replace(user.id, `<span class="notif_username">${user.username}</span>`)
                }
            })
        }
    })
    notifications.sort((a, b)=>{
        return a.id - b.id
    })         
    notifications = notifications.reverse()
	
    return {
		notifications,
		user: session.user
	};
};