/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

export interface PicrewPartsData {
  cId: number;
  itmId: number;
  rotaCnt: number;
  sNo: number;
  spCnt: number;
  xCnt: number;
  yCnt: number;
}
export interface PicrewParts {
  image_maker_id: string;
  parts_id: number;
  parts_data: PicrewPartsData;
}
export interface Pickle {
  picrew_id: string; // link to image_maker_id
  pickle_id: string; // UUID
  parts: PicrewParts[];
}

import { PicrewModel } from "./model";

declare global {
  interface Window {
    api_pickle_database: IDBPDatabase<unknown>,
    api_pickle_model: PicrewModel,
    api_picrew_database: IDBPDatabase<unknown>,
    api_picrew_model: PicrewModel,
  }
}