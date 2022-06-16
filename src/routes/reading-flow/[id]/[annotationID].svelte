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
   import { Jumper } from 'svelte-loading-spinners';
   import { removeAnnotation, editAnnotation } from '$lib/readingFlow';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { annotations } from '$lib/readingFlow';
   import { goto } from '$app/navigation';
   export let annotation;
   export let flowID, flowAuthor, userID

   async function invokeRemoveAnnotation(){
      let isConfirmed = window.confirm('Are you sure you want to delete the annotation?')      
      if(isConfirmed){
         document.getElementById('annotation').style.display = 'none';
         document.getElementById('loader').style.display = 'flex'
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
   }
   let isEditing = false;

   function invokeEditMode(){
      isEditing = !isEditing
   }
   async function invokeEditAnnotation(){
      document.getElementById('new_annotation_form').style.display = 'none';
      document.getElementById('loader').style.display = 'flex'
      let res = await editAnnotation(annotation, flowID)
      if(res == 'problem'){
         addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         annotations.set(res.reverse())
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         invokeEditMode()
      }
   }
</script>


{#if !isEditing}
   <div id="loader" class="loader"><Jumper size="120" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>
   <div id="annotation">
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
         <button class="buttonAuth share" on:click={invokeEditMode}>Edit annotation</button>
         <button class="buttonAuth remove" on:click={invokeRemoveAnnotation}>Remove annotation</button>
      {/if}
   </div>
{:else}
   <h1>Editing {annotation.annotationTitle}</h1>
   <p>Annotation added on {annotation.annotationMoment}</p> 
   <div id="loader" class="loader"><Jumper size="120" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>  
   <form id="new_annotation_form" on:submit|preventDefault={invokeEditAnnotation} >
      <input required="required" type="text" name="title" class="textForm" placeholder="Title" bind:value={annotation.annotationTitle}>
      <input required="required" type="text" name="page" class="textForm" placeholder="Page, section or chapter" bind:value={annotation.annotationPage}>
      <h2>Quote</h2>
         <textarea name="quote" class="textForm" id="quote" placeholder="Type in a quote (if you would not like to insert a quote, live this field blank)" bind:value={annotation.annotationQuote}></textarea>
      <h2>Annotation</h2>
         <textarea name="quote" class="textForm" id=""placeholder="Write your annotations here (if you would not like to insert an annotation, leave this field blank" bind:value={annotation.annotationContent}></textarea>
      <h2>Edit</h2>
         <button on:click={invokeEditMode} class="toolsButton">Cancel</button>
         <button class="buttonAuth" type="submit">Edit annotation</button>
         <br><br>
   </form>
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
   #loader{
      display: none;
   }
</style>