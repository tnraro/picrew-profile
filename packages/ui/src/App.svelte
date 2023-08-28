<script lang="ts">
  import { pickle, type Pickle as PickleModel } from "@pickle/model";
  import { onMount } from "svelte";
  import Modal from "./libs/Modal.svelte";
  import { currentPicrewId } from "./libs/utils";
  import PickleForm from "./PickleForm.svelte";
  import Pickle from "./PickleItem.svelte";
  import PickleItemList from "./PickleItemList.svelte";
  import PickleItemName from "./PickleItemName.svelte";
  import PickleItemRemoveButton from "./PickleItemRemoveButton.svelte";
  import Icon from "./Icon.svelte";

  let isFormOpen = false;
  let formTop = 0;
  let formLeft = 0;
  const openForm = (e: Event) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    formTop = rect.y + rect.height;
    formLeft = rect.x;
    isFormOpen = true;
  };
  let isListOpen = true;

  let pickles: PickleModel[] = [];

  const updatePickles = async () => {
    const picrewId = currentPicrewId();
    pickles = await pickle.getPickles(picrewId);
  };

  onMount(() => {
    queueMicrotask(updatePickles);
  });
</script>

<div class="pickle">
  <a
    href="https://github.com/tnraro/pickle"
    target="_blank"
    rel="noopener noreferrer"
  >
    Pickle
  </a>
  <nav class="pickle__nav">
    <button
      class="pickle__button"
      class:pickle__button--open={isListOpen}
      on:click={() => (isListOpen = !isListOpen)}
      title="Toggle Pickle List"
    >
      <Icon icon="layout-list" size={16} />
    </button>
    <button
      class="pickle__button"
      class:pickle__button--open={isFormOpen}
      on:click={openForm}
      title="Save Current Pickle"
    >
      <Icon icon="heart" size={16} />
    </button>
    <Modal bind:isOpen={isFormOpen} top={formTop} left={formLeft}>
      <PickleForm
        on:change={() => {
          isFormOpen = false;
          updatePickles();
        }}
        on:cancel={() => (isFormOpen = false)}
      />
    </Modal>
  </nav>
  {#if isListOpen}
    <PickleItemList>
      {#each pickles as p (p.pickle_id)}
        <Pickle
          picrewId={p.picrew_id}
          pickleId={p.pickle_id}
          name={p.pickle_name}
        >
          <PickleItemName />
          <PickleItemRemoveButton on:change={updatePickles} />
        </Pickle>
      {/each}
    </PickleItemList>
  {/if}
</div>

<style lang="scss">
  @use "./base.scss";
  .pickle {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    &__nav {
      display: flex;
      gap: 0.5rem;
    }
    &__button {
      @include base.button;
      &--open {
        @include base.button--active;
      }
    }
  }
</style>
