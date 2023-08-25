<script lang="ts">
  import { pickle } from "@pickle/model";
  import Modal from "./libs/Modal.svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import Icon from "./Icon.svelte";
  let top = 0;
  let left = 0;
  let isOpen = false;
  export let onChange = () => {};
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
    pickle.removePickle(picrewId, pickleId).then(onChange);
    isOpen = false;
  };
  const context =
    getContext<Writable<{ pickleId: string; picrewId: string; name: string }>>(
      "context"
    );
  let pickleId = "";
  let picrewId = "";
  let name = "";
  context.subscribe((context) => {
    pickleId = context.pickleId;
    picrewId = context.picrewId;
    name = context.name;
  });
</script>

<button class="pickle-item__remove-button" on:click={openDialog}>
  <Icon icon="heart-off" size={16} />
</button>
<Modal bind:isOpen {top} {left}>
  <div class="pickle-item-dialog" role="dialog">
    <h1 class="pickle-item-dialog__title">
      <div class="pickle-item-dialog__title-icon">
        <Icon icon="alert-triangle" size={20} />
      </div>
      Delete "{name}"
    </h1>
    <div class="pickle-item-dialog__options">
      <button
        class="pickle-item-dialog__option"
        on:click={() => (isOpen = false)}
      >
        cancel
      </button>
      <button
        class="pickle-item-dialog__option pickle-item-dialog__option--error"
        on:click={removePickleItem}
      >
        delete
      </button>
    </div>
  </div>
</Modal>

<style lang="scss">
  @use "./base.scss";
  .pickle-item {
    &__remove-button {
      @include base.button;
      @include base.button--error;
    }
    &-dialog {
      @include base.dialog;

      &__title {
        @include base.dialog__title;

        &-icon {
          flex-shrink: 0;
        }
      }

      &__options {
        @include base.dialog__options;
      }

      &__option {
        @include base.button;
      }

      &__option--error {
        @include base.button--error;
      }
    }
  }
</style>
