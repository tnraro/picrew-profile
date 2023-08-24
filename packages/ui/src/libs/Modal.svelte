<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Portal from "./Portal.svelte";
  import { focusTrap } from "../actions/focusTrap";
  export let isOpen = false;
  export let top = 0;
  export let left = 0;
  const close = () => {
    isOpen = false;
  };

  const escHandler = (e: KeyboardEvent) => {
    if (isOpen) {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        e.preventDefault();
        close();
      }
    }
  };
  onMount(() => {
    window.addEventListener("keydown", escHandler);
  });
  onDestroy(() => {
    window.removeEventListener("keydown", escHandler);
  });
</script>

{#if isOpen}
  <Portal>
    <div use:focusTrap class="modal" class:modal--is-open={isOpen}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="modal__backdrop" on:click={close} />
      <div
        class="modal__content"
        style:top={`${top}px`}
        style:left={`${left}px`}
      >
        <slot />
      </div>
    </div>
  </Portal>
{/if}

<style lang="scss">
  .modal {
    display: none;

    &--is-open {
      display: block;
    }

    &__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100dvw;
      height: 100dvh;
      background: hsl(0deg 0% 0% / 0.2);
    }

    &__content {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
