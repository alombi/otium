<script>
    export let bookshelf;
</script>

{#each bookshelf as book}
<a href={book.url} style="text-decoration: none; color:unset;">
    <article class="other_now_reading">
        <span class="img"><img src={book.cover} alt=""></span>
        <div>
            <h3>{book.title}</h3>
            <p class="author">{book.author}</p>
            <div class="progress"><progress value="{book.progress}" max="{book.pages}"></progress></div>
        </div>
    </article>
</a>
{/each}


<style>
    .other_now_reading{
        display: flex;
        gap:10px;
        align-items: baseline;
    }
    .author{
        margin-top:-45px
    }
    .progress{
        margin-top: -25px;
        min-width: 105px;
    }
</style>