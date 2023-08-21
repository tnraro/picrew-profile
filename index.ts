import { pickle, picrew } from "@pickle/model";

const currentPicrewId = location.pathname.match(/\d+$/)![0];

const parts = await picrew.getParts(currentPicrewId)
console.log(parts.length);

const id1 = crypto.randomUUID();

await pickle.setPickle(currentPicrewId, id1, parts);

await picrew.clearParts(currentPicrewId);

const pickle1 = await pickle.getPickle(currentPicrewId, id1);

await picrew.setParts(currentPicrewId, pickle1!.parts);