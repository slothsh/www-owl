<script lang="ts">
import SvgIcon from "@components/SvgIcon.svelte";
import ClipboardText from "@components/ClipboardText.svelte";
import Grid from "@components/Grid.svelte";
import {
    emailIconPaths,
    githubIconPaths,
    linkedinIconPaths,
} from "@store/icons";
    import { beforeUpdate } from "svelte";
    import { document } from "postcss";

let innerWidth = 1;
let innerHeight = 1;
$: innerAspectRatio = innerWidth / innerHeight;

let devicePixelRatio: number = 1.0;

let cardWidth: number = 1;
let cardHeight: number = 1;

const gridSize = 12;

const socialItems = [
    {
        name: "Email",
        content: "s.olivier1194@gmail.com",
        clipboardContent: "s.olivier1194@gmail.com",
        iconPaths: emailIconPaths,
        anchorHref: "mailto:s.olivier1194@gmail.com",
        anchorTarget: "",
    },
    {
        name: "Github",
        content: "github.com/slothsh",
        clipboardContent: "https://github.com/slothsh",
        iconPaths: githubIconPaths,
        anchorHref: "https://github.com/slothsh",
        anchorTarget: "_blank",
    },
    {
        name: "LinkedIn",
        content: "linkedin.com/in/stefan-olivier-628261145",
        clipboardContent: "https://linkedin.com/in/stefan-olivier-628261145",
        anchorHref: "https://linkedin.com/in/stefan-olivier-628261145",
        anchorTarget: "_blank",
        iconPaths: linkedinIconPaths,
    },
]
</script>


<svelte:window bind:innerWidth bind:innerHeight bind:devicePixelRatio />

<Grid width={innerWidth} height={innerHeight}
    rows={gridSize} columns={Math.floor(gridSize * innerAspectRatio)}
    strokeColor="#262b2b"/>

<main>
    <div class="card" bind:clientWidth={cardWidth} bind:clientHeight={cardHeight}>
        <div class="avatar-box">
            <img class="avatar-layer2 avatar-layer0" src="assets/owlsh.png" alt="avatar owl" />
        </div>
        <section class="about">
            <h4 class="title">Stefan Olivier</h4>
            <p class="caption">Software Engineer</p>
            <div class="details">
                <p class="description">
                    I create desktop and web applications that contain the happiest bits, nibbles and bytes.
                </p>
                <div class="contact">
                    {#each socialItems as item}
                        {#if innerWidth / innerHeight <= 2/1.5}
                            <a target={item.anchorTarget ?? ""} href={item.anchorHref ?? ""}>
                                <SvgIcon paths={item.iconPaths ?? []}
                                    iconPixelSize={38} fillDuration={300} fillColour="#AAAAAA" hoverColour="#DEDEDE" />
                            </a>
                        {:else}
                            <div>
                                <ClipboardText href={item.anchorHref ?? ""} target={item.anchorTarget ?? ""}
                                    text={item.content ?? ""}
                                    clipboardText={item.clipboardContent ?? item.content ?? ""}>
                                    <SvgIcon slot="icon" class="icon" paths={item.iconPaths ?? []} iconPixelSize={24}
                                        fillDuration={300} fillColour="#AAAAAA" hoverColour="#DEDEDE" />
                                </ClipboardText>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </section>
    </div>
</main>

<style lang="scss">
:global(html) {
    background: $bg-gradient;
    animation-name: keyframes-bg-gradient;
    animation-duration: 20s;
    animation-iteration-count: infinite;
}

main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

a:link,
a:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(64px);
    box-shadow: 0px 1rem 24px rgba(0, 0, 0, 0.1);
    max-width: 32rem;
    height: fit-content;
    padding: 4rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
}

.card > :first-child {
    margin-bottom: 1rem;
}

.about {
    color: $font-normal;
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

.about > .details {
    width: 100%;
}

.about > :last-child {
    margin-top: 1rem;
}

.about .title,
.about p {
    text-align: center;
}

.about p {
    font-size: 1.25rem;
}

.about .caption {
    color: $font-dimmed;
}

.about .description {
    margin-bottom: auto;
    width: 100%;
}

.about .contact {
    margin-top: 2rem;
}

.about .contact {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.avatar-box {
    border-radius: 50%;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-box > img {
    object-fit: contain;
    object-position: center;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5),
                inset 0 0 4px rgba(255, 255, 255, 0.25),
                inset 0 0 4px rgba(255, 255, 255, 0.25),
                inset 0 0 4px rgba(255, 255, 255, 0.25);
}

@media screen and (aspect-ratio >= 2.0 / 1.5)  {
    .card > :first-child {
        margin-bottom: 0px;
    }

    .card {
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        min-width: 75%;
    }

    .about {
        max-width: 50%;
        align-items: start;
    }

    .about > :first-child {
        margin-top: 0px;
    }

    .about .title {
        font-size: 3rem;
    }

    .about .title,
    .about p {
        text-align: left;
    }

    .about .contact {
        display: block;
        white-space: nowrap;
    }

    .about .description {
        margin-bottom: 4rem;
    }

    .contact > :not(:last-child) {
        margin-bottom: 1rem;
    }

    .avatar-box {
        justify-content: end;
    }

    .avatar-box > img {
        width: 75%;
        height: 75%;
    }
}

@media screen and (max-width: 720px) {
    :global(html) {
        font-size: 12px;
    }
}

</style>
