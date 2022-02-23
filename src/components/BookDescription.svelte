<script>
   export let description;
   let length = description.length;
   let smallDescription;
   if(length > 1097){
      smallDescription = description.substr(0, 1100) + '...'
   }
   function showFull(){
      document.getElementById('displayed').style.display = 'none';
      document.getElementById('hidden').style.display = 'block'
   }
</script>

{#if length > 1097}
<p id="displayed">{@html smallDescription} <a href="#full" on:click={showFull}>more</a></p>
<p id="hidden">{@html description}</p>
{:else}
   <p>{@html description}</p>
{/if}

<style>
   #hidden{
      display: none;
   }
</style>