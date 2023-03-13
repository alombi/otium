<script>
    export let firstBook;
</script>

<a href={firstBook.url} style="text-decoration: none; color:unset;">
    <article id="now_reading">
        <span class="img"><img src={firstBook.cover} alt=""></span>
        <div class="progress"><progress value="{firstBook.progress}" max="{firstBook.pages}"></progress></div>
        <h3>{firstBook.title}</h3>
        <p class="author">{firstBook.author}</p>
    </article>
</a>


<style>

.progress{
        padding-top: 15px;
        width: 35%;
        margin: auto;
    }
    .author{
        margin-top:-45px
    }
    #now_reading{
        text-align: center;
    }
    .img{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>