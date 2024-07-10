import { Result, ok } from "@utilities/result";
import App from "@components/App.svelte";
import { initialize } from "./procs/initialize";

const appReady = initialize();

const app = new App({
    target: document.getElementById("mountApp")!,
    props: {
        appReady: appReady,
    },
});

export default app;
