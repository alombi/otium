<script context="module">
   import supabase from '$lib/db';
   export async function load({page}){
      const id = page.params.id
      const session = await supabase.auth.session()
      const {data, error} = await supabase.from('profiles').select('id').eq(id, 'id')
      return {props:{data}}
   }
</script>

<script>
   export let data;
</script>

<div>
   {data}
</div>

<!-- Qui si può creare la pagina dell'utente dove si vedono i i libri e dove l'utente stesso può aggiungere nickname e avatar -->