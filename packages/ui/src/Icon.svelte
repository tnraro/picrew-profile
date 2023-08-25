<script lang="ts">
  import { onMount } from "svelte";
  import { icons, type Icon } from "./icons";

  export let icon: Icon;
  export let size = 24;
  let ref: HTMLElement;
  const update = (icon: Icon, size: number) => {
    if (ref == null) return;
    ref.innerHTML =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
      (icons.get(icon) ?? "") +
      "</svg>";
  };
  $: update(icon, size);
  onMount(() => {
    update(icon, size);
  });
</script>

<i bind:this={ref} />

<style>
  i {
    display: flex;
  }
</style>