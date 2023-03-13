<script>
    import { onMount } from 'svelte';
    import ISO6391 from 'iso-639-1';
    function search(){
        if(window.localStorage.getItem('language') != undefined){
            langCode = ISO6391.getCode(window.localStorage.getItem('language'))
        }
        const url = '/search?q=' + searchTerm + '&lang=' + langCode;
        window.location.href = url;
    }
    let searchTerm, langCode, languagePreffered, value;
    let options = []
    let languages = ISO6391.getAllNames()
    options.push({value:'any', label:'Choose a language'})
    languages.forEach( lang =>{
        let code = ISO6391.getCode(lang)
        var obj = {
            label: lang,
            value: code
        }
        options.push(obj)
    })
    function showAdvanced(){
        document.getElementsByClassName('advanced')[0].style.display = 'block'
        document.getElementById('langlink').style.display = 'none'
    }
    onMount(()=>{
        if(window.localStorage.getItem('language') != undefined){
            value = window.localStorage.getItem('language')
            languagePreffered = ISO6391.getCode(value)
        }else{
            value = 'any'
        }
    })
    function selectLang(){
        window.localStorage.setItem('language', value);
    }
</script>


<form class="searchBar" on:submit|preventDefault={search}>
    <input type="search" id="search" name="search" placeholder="Search" bind:value={searchTerm} required >
    <a id="langlink" on:click={showAdvanced} href="#">Choose books language</a>
    <select class="advanced" name="languages" id="languages" bind:value={value} on:change={selectLang}>
        {#each options as lang}
            <option value={lang.value}>{lang.label}</option>
        {/each}
    </select>
</form>


<style>
    #languages{
        display: none;
    }
    #langlink{
        font-size: 15px;
    }
    .searchBar{
        margin-bottom: -22px;
    }
</style>