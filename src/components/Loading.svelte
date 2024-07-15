<script lang="ts">
import { mod } from "@utilities/math";
import { onDestroy, onMount } from "svelte";

const messages = [
    "loading"
];

$: messageIndex = 0;
$: message = messages[messageIndex];
let intervalId: NodeJS.Timeout;

function nextMessage(): void {
    messageIndex = mod(++messageIndex, messages.length);
    message = messages[messageIndex];
}

onMount(() => {
    intervalId = setInterval(nextMessage, 5000);
})

onDestroy(() => {
    clearInterval(intervalId);
});
</script>

<div class='example'>
    <div class='block'>
        <div class='item'></div>
        <div class='item'></div>
        <div class='item'></div>
        <div class='item'></div>
        <div class='item'></div>
        <div class='item'></div>
        <div class='item'></div>
        <div class='item'></div>
    </div>
</div>

<span class="message">{message} ...</span>

<style lang="scss">
$font-size: 1rem;
$duration: 1.0s;
$size: 1rem;

.message {
    font-size: $font-size;
    font-weight: bold;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%); 
    margin-top: calc($size * 2 + $font-size);
}

.example {
    position: fixed;
    top: 50%;
    left: 50%;
    height: $size;
    width: $size;
    transform: translateX(-50%) translateY(-50%); 
}

.block {
    position: absolute;
    top: 0;
    left: 0;
    height: $size;
    width: $size;

    > .item {
        position: absolute;
        height: $size;
        width: $size;
        background: #fff;
        animation: move $duration linear infinite;

        &:nth-of-type(1) {
            top: -$size;
            left: -$size;
            animation-delay: 0s;
        }

        &:nth-of-type(2) {
            top: -$size;
            left: 0;
            animation-delay: -$duration / 8;
        }

        &:nth-of-type(3) {
            top: -$size;
            left: $size;
            animation-delay: -2 * $duration / 8;
        }

        &:nth-of-type(4) {
            top: 0;
            left: $size;
            animation-delay: -3 * $duration / 8;
        }

        &:nth-of-type(5) {
            top: $size;
            left: $size;
            animation-delay: -4 * $duration / 8;
        }

        &:nth-of-type(6) {
            top: $size;
            left: 0;
            animation-delay: -5 * $duration / 8;
        }

        &:nth-of-type(7) {
            top: $size;
            left: -$size;
            animation-delay: -6 * $duration / 8;
        }

        &:nth-of-type(8) {
            top: 0;
            left: -$size;
            animation-delay: -7 * $duration / 8;
        }
    }
}

@keyframes move {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    70% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}
</style>
