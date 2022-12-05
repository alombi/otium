import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { invalid, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const { session } = await getSupabase(event);
	if (session) {
		throw redirect(303, '/dashboard');
	}
};

export const actions = {
	async default(event){
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			return invalid(400, {
				error: 'Please enter your email'
			});
		}
		if (!password) {
			return invalid(400, {
				error: 'Please enter your password',
				values: {
					email
				}
			});
		}

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return invalid(400, {
					error: 'Invalid credentials.',
					values: {
						email
					}
				});
			}
			return invalid(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			});
		}

		throw redirect(303, '/dashboard');
	}
};
