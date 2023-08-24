<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let pickleId = "";
  export let picrewId = "";
  export let name = "";

  const context = writable({
    pickleId,
    picrewId,
    name,
  });

  $: context.update((context) => ({ ...context, pickleId }));
  $: context.update((context) => ({ ...context, picrewId }));
  $: context.update((context) => ({ ...context, name }));

  setContext("context", context);
</script>

<div class="pickle-item">
  <slot />
</div>

<style lang="scss">
  .pickle-item {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
  }
</style>
