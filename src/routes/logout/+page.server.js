import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, json} from '@sveltejs/kit';

export const actions = {
	async default(event) {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();
		throw redirect(303, '/');
	}
};
