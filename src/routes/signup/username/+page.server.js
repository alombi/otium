import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';

export const actions = {
	async default(event){
		const { request, url } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();
        const username = formData.get('username');
        let id = await (supabaseClient.auth.getSession()).then((a)=>{return a.data.session.user.id})

        if (!username) {
			return fail(400, {
				error: 'Inserisci un nome utente'
			});
		}

        const { data, error } = await supabaseClient.from('profiles').update({username:username}).eq('id', String(id));
        if(error){
            return fail(500, {
                error: 'Inserisci un username valido'
            })
        }

        throw redirect(303, '/');
    }
}