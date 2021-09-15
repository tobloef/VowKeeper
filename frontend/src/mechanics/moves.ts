import type {SvelteComponent} from "svelte";
import FaceDangerModal from "../move-modals/FaceDangerModal.svelte";
import SecureAnAdvantageModal from "../move-modals/SecureAnAdvantageModal.svelte";

export enum MoveType {
  FaceDanger,
  SecureAnAdvantage,
}

const moveToModalComponentMap: {[key in MoveType]: typeof SvelteComponent} = {
  [MoveType.FaceDanger]: FaceDangerModal,
  [MoveType.SecureAnAdvantage]: SecureAnAdvantageModal,
}

export const moveToModalComponent = (type: MoveType): typeof SvelteComponent => {
  return moveToModalComponentMap[type];
}
