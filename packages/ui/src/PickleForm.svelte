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

<form class="pk-dialog" on:submit|preventDefault={onSubmit}>
  <h1 class="pk-dialog__title">Save current pickle</h1>
  <label>
    name
    <input class="pk-input" name="name" required />
  </label>
  <div class="pk-dialog__options">
    <button
      type="reset"
      class="pk-button"
      on:click={() => dispatch("cancel")}
    >
      cancel
    </button>
    <button class="pk-button pk-button--primary">
      save
    </button>
  </div>
</form>