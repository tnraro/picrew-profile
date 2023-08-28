<script lang="ts">
  import { pickle, picrew } from "@pickle/model";
  import { createEventDispatcher } from "svelte";
  import { currentPicrewId, hashObject } from "./libs/utils";
  const dispatch = createEventDispatcher();
  const onSubmit = async (e: Event) => {
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const name = data.get("name")?.toString().trim() ?? "";
    if (name.length === 0) return;
    const picrewId = currentPicrewId();
    const parts = import.meta.env.DEV
      ? ([...Array((Math.random() * 10 + 1) | 0)].map((x) => ({
          image_maker_id: picrewId,
          parts_id: Math.random(),
          parts_data: [],
        })) as any)
      : await picrew.getParts(picrewId);
    const pickleId = hashObject(parts);
    await pickle.setPickle(picrewId, pickleId, name, parts);
    dispatch("change");
  };
</script>

<form class="pickle-form" on:submit|preventDefault={onSubmit}>
  <h1 class="pickle-form__title">Save current pickle</h1>
  <label class="pickle-form__label">
    name
    <input class="pickle-form__input" name="name" required />
  </label>
  <div class="pickle-form__options">
    <button
      type="reset"
      class="pickle-form__option"
      on:click={() => dispatch("cancel")}
    >
      cancel
    </button>
    <button class="pickle-form__option pickle-form__option--primary">
      save
    </button>
  </div>
</form>

<style lang="scss">
  @use "./base.scss";
  .pickle-form {
    @include base.dialog;
    &__title {
      @include base.dialog__title;
    }

    &__options {
      @include base.dialog__options;
    }

    &__option {
      @include base.button;

      &--primary {
        @include base.button--primary;
      }
    }
  }
</style>
