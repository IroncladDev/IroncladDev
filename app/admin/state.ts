import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const PageId = atomWithStorage("pageId", null);
export const CurrentKey = atomWithStorage("currentKey", null);
export const CreatingKey = atom(false);
