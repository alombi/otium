import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (session) {
		throw redirect(303, '/');
	}
}

export const actions = {
	async default(event){
		const { request, url } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			return fail(400, {
				error: 'Inserisci un\'email'
			});
		}
		if (!password) {
			return fail(400, {
				error: 'Inserisci una password',
				values: {
					email
				}
			});
		}

		const { error } = await supabaseClient.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: url.origin }
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Credenziali non valide',
					values: {
						email
					}
				});
			}

			return fail(500, {
				error: 'Errore nel server. Riprova più tardi',
				values: {
					email
				}
			});
		}

		throw redirect(303, '/signup/username');
	}
};
