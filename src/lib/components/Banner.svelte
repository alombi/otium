<script>
   export let desc, button, advancedTitle;
   export let func = () => {}

   function expandBanner(){
      if(document.getElementById('advancedButton').innerText == button){
         document.getElementById('advancedButton').innerText = 'Dismiss';
         document.getElementById('advancedBanner').style.display = 'block';
      }else{
         document.getElementById('advancedButton').innerText = button;
         document.getElementById('advancedBanner').style.display = 'none';
      }
   }
</script>

<div class="banner">
   <div class="bannerTitle">
      <div>
         <p>{desc}</p>
      </div>
      <a id="advancedButton" class="buttonAuth" on:click={expandBanner}>{button}</a>
   </div>
   <div id="advancedBanner">
      <h2>{advancedTitle}</h2>
      <input type="text" name="input" id="bannerInput" class="textForm">
      <button id="ready" class="buttonAuth" on:click={func}>{button}</button>
   </div>
</div>