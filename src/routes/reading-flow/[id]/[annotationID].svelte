<script context="module">
   import supabase from '$lib/db';
   let userID;
   export async function load({params}){
      try{
         const session = supabase.auth.session()
         userID = session.user.id
      }catch{}
      const flowID = params.id;
      let flow = await supabase.from('reading_flow').select('annotations').eq('id', flowID)
      let flowAuthor = await supabase.from('reading_flow').select('user_id').eq('id', flowID)
      flowAuthor = flowAuthor.data[0].user_id
      flow = flow.data[0].annotations
      let annotation = flow.filter(e => e.annotationID == params.annotationID )
      annotation = annotation[0]
      return {props:{annotation, flowID, flowAuthor, userID}}
   }
</script>

<script>
   import { removeAnnotation } from '$lib/readingFlow';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { annotations } from '$lib/readingFlow';
   import { goto } from '$app/navigation';
   export let annotation;
   export let flowID, flowAuthor, userID

   async function invokeRemoveAnnotation(){
      let res = await removeAnnotation(annotation, flowID)
      console.log(res)
      if(res == 'problem'){
         addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         annotations.set(res.reverse())
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         goto(`/reading-flow/${flowID}`)
      }
   }
</script>


<h1>{annotation.annotationTitle}</h1>
<p>Annotation added on {annotation.annotationMoment}</p>  
<div class="annotationContainer">
   {#if annotation.annotationQuote}
      <div class="quote">
         <h2>Quote</h2>
         <p class="quote_content">{annotation.annotationQuote}</p>
      </div>
   {/if}
  {#if annotation.annotationContent}
      <div class="notes">
         <h2>Notes</h2>
         <p>{annotation.annotationContent}</p>
      </div>
   {/if}
</div>
<br>
{#if userID == flowAuthor}
   <button class="buttonAuth share" on:click={invokeRemoveAnnotation}>Edit annotation</button>
   <button class="buttonAuth remove" on:click={invokeRemoveAnnotation}>Remove annotation</button>
{/if}

<style>
   .annotation_page{
      margin-top:-20px;
      font-size: 17px;
      font-weight: 400;
   }
   .quote_content{
      font-style: italic;
      opacity: 0.7;
   }
   .annotationContainer{
      display: flex;
      gap:10px;
   }
   .quote, .notes{
      flex-basis: 50%;
   }
   @media(max-width:550px){
      .annotationContainer{
         display: block;
      }
   }
</style>