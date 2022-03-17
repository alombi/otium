<script>
   export let stats;
</script>

<div id="tag_container">
   <p class="reading" id="tag">Reading: {stats.reading}</p>
   <p class="to_read" id="tag">To read: {stats.to_read}</p>
   <p class="read" id="tag">Read: {stats.read}</p>
   <p class="favorite" id="tag">Starred: {stats.favorites}</p>
   <p class="unset" id="tag">Untagged: {stats.untagged}</p>
</div>

<style>
   #tag_container{
      margin-bottom: 30px;
      justify-content: left;
      margin-top:-20px;
   }
   @media(max-width:550px){
      #tag_container{
         display:grid;
         grid-template-columns: repeat(3, 32%);
      }
      #tag_container > p:last-child{
         width:75%
      }
      #tag_container > p:nth-child(4), #tag_container > p:nth-child(5){
         margin-top:-12px;
      }
   }
</style>