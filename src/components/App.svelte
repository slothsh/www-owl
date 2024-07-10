<script context="module" lang="ts">
import Loading from "@components/Loading.svelte";
import Main from "@components/Main.svelte";
import { Result } from "@utilities/result";
</script>


<script lang="ts">
export let appReady: Promise<Array<Result>>;
</script>


{#await appReady}
    <Loading />
{:then}
    <Main />
{/await}


<style lang="scss">
:global(#mountApp) {
    width: 100vw;
    height: 100vh;
}
</style>
