<script lang="ts">
  import { pickle } from "@pickle/model";
  import { createEventDispatcher, getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import Icon from "./Icon.svelte";
  import Modal from "./libs/Modal.svelte";
  let top = 0;
  let left = 0;
  let isOpen = false;
  const dispatch = createEventDispatcher();
  const openDialog = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    top = rect.y;
    left = rect.x + rect.width;
    isOpen = true;
  };
  const removePickleItem = () => {
    if (pickleId == null || picrewId == null) {
      throw new Error("pickleId or picrewId is missing");
    }
    pickle.removePickle(picrewId, pickleId).then(() => {
      dispatch("change");
    });
    isOpen = false;
  };
  const context =
    getContext<Writable<{ pickleId: string; picrewId: string; name: string }>>(
      "context"
    );
  let pickleId = "";
  let picrewId = "";
  let name = "";
  $: {
    name = $context.name;
    pickleId = $context.pickleId;
    picrewId = $context.picrewId;
  }
</script>

<button
  class="pk-button pk-button--error"
  on:click={openDialog}
  title="Delete pickle"
>
  <Icon icon="heart-off" size={16} />
</button>
<Modal bind:isOpen {top} {left}>
  <div class="pk-dialog" role="dialog">
    <h1 class="pk-dialog__title">
      <div class="pk-icon">
        <Icon icon="alert-triangle" size={20} />
      </div>
      Delete "{name}"
    </h1>
    <div class="pk-dialog__options">
      <button
        class="pk-button"
        on:click={() => (isOpen = false)}
      >
        cancel
      </button>
      <button
        class="pk-button pk-button--error"
        on:click={removePickleItem}
      >
        delete
      </button>
    </div>
  </div>
</Modal>

<style lang="scss">
  .pk-icon {
    flex-shrink: 0;
  }
</style>
