<script>
    import { session } from '$app/stores';
    import supabase from '$lib/db';
    import { openModal } from 'svelte-modals'
    import Modal from '$components/Modal.svelte';
    import { Jumper } from 'svelte-loading-spinners'
    let email, password;
    async function signUp(){
        const { user, supabaseSession, error } = await supabase.auth.signUp({
         email: email,
         password: password
        });
        document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.display = 'flex';
        document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.justifyContent = 'center';
        if(error){
            console.log(error.message)
            document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.display = 'none';
            addNotification({text:error.message, position:'bottom-right', type:'danger', removeAfter: '2000'})
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
       <button class="buttonAuth" type="submit">Sign Up</button>
    </form>
 </div>
 <div id="waitingForEmailToBeSentIndicatorFromAuth" class="loader"><Jumper size="120" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>
 
 <style>
    form{
       text-align: center;
    }
    #waitingForEmailToBeSentIndicatorFromAuth{
        display: none;
    }
  </style>