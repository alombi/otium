<script>
    import { session } from '$app/stores';
    import supabase from '$lib/db';
    let email, password;
    async function signUp(){
        const { user, supabaseSession, error } = await supabase.auth.signUp({
         email: email,
         password: password
        });
        if(error){
            alert(error.message)
        }else{
            if(user){
                $session = supabaseSession
            }
        }
    }
</script>

<div id="loginFromPage">
    <h1>Login</h1>
    <form class="" on:submit|preventDefault={signUp}> 
       <input type="email" class="textForm" placeholder="Email address" required="required" bind:value={email}>
       <input type="password" class="textForm" placeholder="Password" required="required" bind:value={password}>
       <button class="buttonAuth" type="submit">Sign UP</button>
    </form>
 </div>
 
 <style>
    form{
       text-align: center;
    }
  </style>