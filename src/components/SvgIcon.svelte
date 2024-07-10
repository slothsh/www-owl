<script context="module" lang="ts">
import { replaceSubstring } from "@utilities/string";
import { Css, CssUnitValue } from "@utilities/css";

function scaleAttributeNumber(pathAttribute: string, scaleFactor: number): string {
    // @ts-ignore
    const numbersPart = [...pathAttribute.matchAll(/-?\d+(\.\d+)?/g)];

    let newNodeAttribute = pathAttribute;
    let offset = 0;

    for (const part of numbersPart as Array<RegExpExecArray>) {
        const start = part.index;
        const end = start + part[0].length;

        const scaledNodeWidth = (parseFloat(part[0]) * scaleFactor).toString();
        newNodeAttribute = replaceSubstring(newNodeAttribute, start + offset, end + offset - 1, scaledNodeWidth);
        offset += newNodeAttribute.length - pathAttribute.length;
    }

    return newNodeAttribute;
}

function scaleSvgPath(pathString: Array<{ [key: string]: string }>, scaleFactor: number): Array<{ [key: string]: string }> {
    const scaledStrings: Array<{ [key: string]: string }> = [];

    for (const attributes of pathString) {
        const attributeKeys = Object.keys(attributes);
        const scaledAttributes: { [key: string]: string } = {};

        for (const k of attributeKeys)  {
            const commands: Array<string> = attributes[k].split(" ");
            commands.forEach((value: string) => {
                value.trim();
            });

            const scaledCommands: Array<string> = [];
            for (const c of commands) {
                const scaledCommand = scaleAttributeNumber(c, scaleFactor);
                scaledCommands.push(scaledCommand);
            }
            scaledAttributes[k] = scaledCommands.join(" ");
        }

        scaledStrings.push(scaledAttributes);
    }

    return scaledStrings;
}
</script>

<script lang="ts">
export let tag = "div";
export let paths: Array<{ [key: string]: string } >;
export let iconPixelSize = 38;
export let fillColour: string = "#DDDDDD";
export let hoverColour: string = "#FFFFFF";
export let fillDuration: number | CssUnitValue = Css.ms(250);

const iconDefaultSize = 512;
$: iconScale = iconPixelSize / iconDefaultSize;
$: scaledPaths = scaleSvgPath(paths, iconScale);
const fillDurationString = (typeof fillDuration === "number")
    ? `${fillDuration}ms`
    : fillDuration.toString();
</script>

<svelte:element this={tag}
    class="social-link"
    style:width="{iconPixelSize}px"
    style:height="{iconPixelSize}px"
    {...$$props}>
    <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={iconPixelSize}
        height={iconPixelSize}
        style="--fill-colour: {fillColour}; --hover-colour: {hoverColour}; --fill-duration: {fillDurationString};">
        {#each scaledPaths as path}
            <path {...path}/>
        {/each}
    </svg>
</svelte:element>

<style lang="scss">
svg {
    path {
        fill: var(--fill-colour);
        transition: fill var(--fill-duration) ease-in-out;
    }
        
    &:hover path {
        fill: var(--hover-colour);
    }
}
</style>
