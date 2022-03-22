<script>
    import { session } from '$app/stores';
    import supabase from '$lib/db';
    import { openModal } from 'svelte-modals'
    import Modal from '$components/Modal.svelte';
    let email, password;
    async function signUp(){
        const { user, supabaseSession, error } = await supabase.auth.signUp({
         email: email,
         password: password
        });
        document.getElementById('waiting').style.display = 'fixed'
        if(error){
            alert(error.message)
        }else{
            if(user){
                openModal(Modal, { title: "Verify your account", message:'Thank you for joining Otium! An email has been sent to you in order to verify your account.' })
            }
        }
    }
</script>

<div id="loginFromPage">
    <h1>Create an account</h1>
    <form class="" on:submit|preventDefault={signUp}> 
       <input type="email" class="textForm" placeholder="Email address" required="required" bind:value={email}>
       <input type="password" class="textForm" placeholder="Password" required="required" bind:value={password}>
       <button class="buttonAuth" type="submit">Sign UP</button>
    </form>
 </div>
 <div id="waiting"></div>
 
 <style>
    form{
       text-align: center;
    }
    #waiting{
        position: none;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0,0,0,0.50)
    }
  </style>