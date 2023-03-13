<script>
    import { Github } from 'lucide-svelte';
</script>

<div class="footer">
    <span>
        <small>Sviluppato da <a href="https://alombi.xyz">alombi</a> - © 2023</small>
        <small><a href="https://github.com/alombi/otium"><Github size=15 /> Codice sorgente</a></small>
    </span>
</div>


<style>
    .footer{
        margin-bottom: 20px;
        font-size: 14px;
    }
    span{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-top: 10px;
        margin-left: 30px;
        margin-right: 30px;
    }
</style>