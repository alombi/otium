import supabase from '$lib/db'
import { session } from '$app/stores';
import { getNotificationsContext } from 'svelte-notifications';

export async function addToBookshelf() {
   const { addNotification } = getNotificationsContext();
   
   const id = $session.user.id
   const { data, error } = await supabase.from('profiles').select('unset').eq('id', id)
   console.log(data)

   addNotification({text:'Added!', position:'bottom-right', type:'success', removeAfter: '2000'})
}