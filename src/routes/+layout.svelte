<script lang="ts">
    import '../style.css';
    import poweredByStrava from '$lib/assets/poweredByStrava.png'

    export let data;
</script>
<nav class="navbar">
    <a href="/">Route Recommender</a>
    {#if data.profile}
        <img src={data.profile} alt="User Profile" height="40px" />
    {/if}
    <img src={poweredByStrava} alt="Powered by Strava" height="40px" />
</nav>
<slot />