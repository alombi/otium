import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
    if (session) {
        const { data: DBnotifications } = await supabaseClient.from('notifications').select('*');
        let notifications = DBnotifications.filter((item)=>{
            return item.user == session.user.id
        })
        return {
            notifications,
            user: session.user
        };
    }
};