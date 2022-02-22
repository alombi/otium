<script context="module">
   import supabase from '$lib/db';
   export async function load({params}){
      const id = params.id
      const session = await supabase.auth.session()
      const {data, error} = await supabase.from('profiles').select('*').eq('id', id)
      return {props:{data}}
   }
</script>

<script>
   export let data;
</script>

<div>
   <h1>{data[0].username}</h1>
</div>

<!-- Qui si può creare la pagina dell'utente dove si vedono i i libri e dove l'utente stesso può aggiungere nickname e avatar -->