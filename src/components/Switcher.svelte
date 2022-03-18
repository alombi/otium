<!-- CREDITS TO https://github.com/alex-knyaz/Miscellaneous-svelte-components FOR THIS COMPONENT -->

<script>
   export let items = [];
   export let value;
 </script>
 
 <div>
   {#each items as { l, v }}
     <label class:checked-item={value == v}>
       <input type="radio" value={v} bind:group={value} />
       {l}
     </label>
   {/each}
 </div>
 
 <style>
   div {
     overflow: hidden;
   }
 
   label {
     display: inline-block;
     cursor: pointer;
     padding: 0px 15px;
     line-height: 34px;
     background-color: #3b42521a;
     border-right: none;
     user-select: none;
     border: 2px solid #3b4252;
     font-size: 15px;
   }
 
   input {
     display: none;
   }
 
   label:first-child {
     border-radius: 6px 0 0 6px;
   }
   label:last-child {
     border-radius: 0 6px 6px 0;
     border: 2px solid #3b4252;
   }
 
   label:hover {
     background-color: #434c5e;
   }
 
   .checked-item {
     background: #3b4252;
   }
 </style>