<script lang="ts">
    import { beforeUpdate } from "svelte";

export let rows = 12;
export let columns = 12;
export let width: number = 512;
export let height: number = 512;
export let strokeColor: string = "#FFFFFF";
export let strokeWidth: number = 1;

$: rowGap = height / rows;
$: columnGap = width / columns;

type GridPath = [string, string];
$: gridPaths = new Array<Array<GridPath>>(rows)
    .fill(new Array<GridPath>(columns).fill(["", ""]))
    .map((_, y) => {
        return new Array<GridPath>(columns)
            .fill(["", ""])
            .map((_, x) => {
                return [
                    `M 0 ${y * rowGap} L ${width} ${y * rowGap}`,
                    `M ${x * columnGap} 0 L ${x * columnGap} ${height}`,
                ]
            })
    });
</script>

<svg class="grid" width={width} height={height}
    xmlns="http://www.w3.org/2000/svg">
    {#each gridPaths as row, y}
        {#each row as column, x}
            {#if y > 0 && x > 0}
                <path d={column[0]} stroke={strokeColor} stroke-width={strokeWidth}/>
                <path d={column[1]} stroke={strokeColor} stroke-width={strokeWidth}/>
            {/if}
        {/each}
    {/each}
</svg>


<style lang="scss">
.grid {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
}
</style>
