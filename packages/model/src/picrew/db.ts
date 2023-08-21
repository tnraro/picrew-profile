import { DBSchema, openDB } from "idb/with-async-ittr";
import { picrew_database_name, picrew_parts_store_name } from "./consts";
import type { PicrewParts } from "../types";

export interface PicrewSchema extends DBSchema {
  image_maker_parts: {
    key: [string, number];
    indexes: { image_maker_id: string };
    value: PicrewParts;
  }
}
export const picrewDb = await openDB<PicrewSchema>(picrew_database_name);

if (!picrewDb.objectStoreNames.contains(picrew_parts_store_name)) {
  throw new Error("Not found image_maker_parts in picrew DB");
}

window.api_picrew_database = picrewDb;
