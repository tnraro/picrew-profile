<script lang="ts">
  import { icons, type Icon } from "./icons";

  export let icon: Icon;
  export let size = 24;
  let content = "";
  $: content = icons.get(icon) ?? "";
</script>

<svg class="icon"
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
>
  {@html content}
</svg>

<style>
  .icon {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
