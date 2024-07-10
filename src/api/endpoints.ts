export namespace Api {
    // TODO: production & development environment
    // export const DOMAIN = "stefanolivier.com" // TODO: Get from environment / config
    export const DOMAIN = "localhost:8000" // TODO: Get from environment / config
    export const BASE = new URL(`http://${DOMAIN}`);
    export const ASSETS = new URL("assets", BASE);
    export const SCRIPTS = new URL("scripts", BASE);
}
