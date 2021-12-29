<div class="container">
   <div>
      <h1>Login to manage your profile</h1>
      <p>An account is required to star, share and manage books. Signup or login now!</p>
      <button on:click={()=>window.location.href ='/auth'} class="buttonAuth">Sign in</button>
   </div>
</div>

<style>
   .container{
      display: flex;
      justify-content: center;
   }
   div{
      text-align: center;
   }
</style>