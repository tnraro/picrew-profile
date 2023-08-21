import { DBSchema, openDB } from "idb/with-async-ittr";
import { pickle_pickle_id, pickle_picrew_id, pickle_pickles } from "./consts";
import type { Pickle } from "../types";

export interface PickleSchema extends DBSchema {
  pickles: {
    key: [string, string];
    indexes: { picrew_id: string };
    value: Pickle
  }
}

export const pickleDb = await openDB<PickleSchema>("pickle", undefined, {
  upgrade(db) {
    const store = db.createObjectStore(pickle_pickles, {
      keyPath: [pickle_picrew_id, pickle_pickle_id],
    });
    store.createIndex(pickle_picrew_id, pickle_picrew_id);
  }
});

if (!pickleDb.objectStoreNames.contains(pickle_pickles)) {
  throw new Error("Not found parts in pickle DB");
}

window.api_pickle_database = pickleDb;
