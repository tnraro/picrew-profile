import { Pickle, PicrewParts } from "../types";
import { pickle_pickles, pickle_picrew_id } from "./consts";
import { pickleDb } from "./db";

const db = pickleDb;

export const getPickles = async (picrewId: string) => {
  const tx = db.transaction(pickle_pickles);
  const index = tx.store.index(pickle_picrew_id);
  const pickles: Pickle[] = [];
  for await (const cursor of index.iterate(picrewId)) {
    pickles.push(structuredClone(cursor.value));
  }
  await tx.done;
  return pickles;
}

export const getPickle = async (picrewId: string, pickleId: string) => {
  return await db.get(pickle_pickles, [picrewId, pickleId]);
}

export const setPickle = async (picrewId: string, pickleId: string, pickleName: string, parts: PicrewParts[]) => {
  await db.put(pickle_pickles, {
    picrew_id: picrewId,
    pickle_id: pickleId,
    pickle_name: pickleName,
    parts
  });
}

window.api_pickle_model = {
  getPickles,
  setPickle,
}