import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = async (event ) => {
    const { session, supabaseClient } = await getSupabase(event);
    const { data: profiles } = await supabaseClient.from('profiles').select('*');
    const query = event.url.searchParams.get('q');
    let usernames = [];
    let results = [];
    if(query){
        profiles.forEach(profile => { 
            if(profile.username)
                usernames.push(profile.username) 
            });
            usernames.forEach(username =>{
                if(username.toLowerCase().indexOf(query.toLowerCase()) != -1){
                var obj = {
                name: username
                }
                profiles.forEach(profile =>{ if(profile.username == username){obj.url = '/user/' + profile.id} })
                results.push(obj)
            }
        })
        return {
            results: results,
            query: query
        }
    }else{
        return {
            results: [],
            query: ''
        }
    }
}