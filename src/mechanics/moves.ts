import type {SvelteComponent} from "svelte";
// import FaceDangerModal from "../move-modals/FaceDangerModal.svelte";

export enum MoveType {
  // FaceDanger,
}

const moveToModalComponentMap: {[key in MoveType]: typeof SvelteComponent} = {
  // [MoveType.FaceDanger]: FaceDangerModal,
}

export const moveToModalComponent = (type: MoveType): typeof SvelteComponent => {
  return moveToModalComponentMap[type];
}
