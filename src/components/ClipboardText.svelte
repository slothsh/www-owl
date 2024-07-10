<script lang="ts">
export let text: string = "";
export let clipboardText = text;
export let href = "";
export let target = "_blank";

$: copyButtonText = "Copy";

const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    copyButtonText = "Copied!";
    setTimeout(() => {
        copyButtonText = "Copy";
    }, 5000);
};
</script>


<a class="button-box" href={href} target={target}>
    <div class="anchor-box">
        <div class="button">
            <slot name="icon" />
        </div>
        <span>{text}</span>
    </div>
    <button class="copy-button"
        on:click|preventDefault={() => copyToClipboard(clipboardText)}>
        {copyButtonText}
    </button>
</a>


<style lang="scss">
a.button-box,
button.copy-button {
    padding: 0px;
    text-decoration: none;
    background: none;
    color: inherit;
    padding: 0px;
    font: inherit;
    outline: inherit;
    cursor: pointer;
    border: none;
    transition: background-color 300ms ease-in-out,
                color 300ms ease-in-out;
}

a.button-box {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    max-height: 2.5rem;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    text-align: center;
    margin: 0px;
    overflow: hidden;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);

    > * {
        margin: 0.5rem 0rem;
    }

    &:hover {
        color: $font-normal;
        background-color: rgba(255, 255, 255, 0.05);

        > .anchor-box > span {
            color: $font-normal;
        }
    }

    > .anchor-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        flex-grow: 1;

        > span {
            width: 100%;
            text-align: left;
            color: $font-dimmed;
            font-family: "Jetbrains Mono", monospace;
            font-size: 1rem;
            margin-left: 1rem;
            margin-right: 1rem;
            user-select: none;
            overflow: hidden;
            transition: background-color 300ms ease-in-out,
                        color 300ms ease-in-out;
        }

        > .button {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            right: 0px;
            padding: 0rem 0.5rem;
        }
    }
}

button.copy-button {
    color: $font-dimmed;
    position: relative;
    right: 0rem;
    height: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: bold;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.5rem 0.5rem;
    margin: 0px;

    &:hover {
        color: $font-normal;
        background-color: rgba(255, 255, 255, 0.05);
    }
}
</style>
