import { Api } from "@api/endpoints";
import { Result, ok, err } from "@utilities/result";

export const PRELOAD_ASSETS = [
    "owlsh.png",
];

export function initialize(): Promise<Array<Result>> {
    const assetResponses = fetchPreloadAssets();
    const initializationDone = Promise.all(assetResponses);
    return initializationDone;
}

function fetchPreloadAssets(): Array<Promise<Result>> {
    const responses: Array<Promise<Result>> = [];

    for (const assetFileName of PRELOAD_ASSETS) {
        try {
            const assetUrl = new URL(Api.ASSETS.href + "/" + assetFileName);

            const cacheResult = window.caches
                .open("v1")
                .then((cache) => {
                    const assetRequest = new Request(assetUrl, { method: "GET" });
                    const result = cache.addAll([assetRequest])
                        .then(() => {
                            return ok();
                        })
                        .catch((reason) => {
                            return err(reason);
                        });

                    return result;
                });

            responses.push(cacheResult);
        } catch (error: any) {
            responses.push(
                new Promise(
                    (rs, rj) => rj(err(`could not fetch asset file "${assetFileName}", either because it forms an invalid URL or an error occurred when querying the API`))
                )
            );
        }
    }

    return responses;
}
