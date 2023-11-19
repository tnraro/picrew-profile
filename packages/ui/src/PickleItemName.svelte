<script lang="ts">
  import { pickle, picrew } from "@pickle/model";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  let name = "";
  let pickleId = "";
  let picrewId = "";
  const context =
    getContext<Writable<{ name: string; pickleId: string; picrewId: string }>>(
      "context"
    );
  $: {
    name = $context.name;
    pickleId = $context.pickleId;
    picrewId = $context.picrewId;
  }
  const applyPickle = async () => {
    const p = await pickle.getPickle(picrewId, pickleId);
    if (p == null) throw new Error(`pickle "${pickleId}" is empty`);
    await picrew.setParts(picrewId, p.parts);
    location.reload();
  };
</script>

<button class="pk-button pk-name" on:click={applyPickle} title={name}>
  <span class="pk-name__value">
    {name}
  </span>
</button>

<style lang="scss">
  .pk-name {
    flex: 1;
    ---bg-l: 100%;
    max-width: 200px;
    justify-content: start;
    &__value {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
