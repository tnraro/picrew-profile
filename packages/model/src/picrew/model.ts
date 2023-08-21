import { PicrewParts } from "../types";
import { picrew_parts_index, picrew_parts_store_name } from "./consts";
import { picrewDb } from "./db";

const db = picrewDb;

export const getParts = async (picrewId: string) => {
  const tx = db.transaction(picrew_parts_store_name);
  const index = tx.store.index(picrew_parts_index);
  const parts: PicrewParts[] = [];
  for await (const cursor of index.iterate(picrewId)) {
    parts.push(structuredClone(cursor.value));
  }
  await tx.done;
  return parts;
}

export const setParts = async (picrewId: string, parts: PicrewParts[]) => {
  await clearParts(picrewId);
  const tx = db.transaction(picrew_parts_store_name, "readwrite");
  const store = tx.store;
  await Promise.all([
    ...parts.map(part => store.add(part)),
    tx.done,
  ]);
}

export const clearParts = async (picrewId: string) => {
  const tx = db.transaction(picrew_parts_store_name, "readwrite");
  const store = tx.store;
  const index = store.index(picrew_parts_index);
  for await (const cursor of index.iterate(picrewId)) {
    console.log(cursor.value);
    await cursor.delete();
  }
}

window.api_picrew_model = {
  getParts,
  setParts,
  clearParts,
};