import {writable} from "svelte/store";

const createCharacter = () => {
  const {subscribe, set, update} = writable({
    stats: {
      edge: 0,
      heart: 0,
      iron: 0,
      shadow: 0,
      wits: 0,
    },
    experience: 0,
    health: 0,
    spirit: 0,
    supply: 0,
    momentum: {
      value: 0,
      reset: 2,
      max: 10,
    },
    vows: [],
    bonds: 0,
    debilities: {
      conditions: {
        wounded: false,
        unprepared: false,
        shaken: false,
        encumbered: false,
      },
      banes: {
        maimed: false,
        corrupted: false,
      },
      burdens: {
        cursed: false,
        tormented: false,
      }
    },
  });

  const takeMomentum = (momentumToAdd: number) => update((prev) => ({
    ...prev,
    momentum: {
      ...prev.momentum,
      value: Math.min(prev.momentum.value + momentumToAdd, 10)
    },
  }));

  const sufferMomentum = (momentumToLose: number) => update((prev) => ({
    ...prev,
    momentum: {
      ...prev.momentum,
      value: Math.max(prev.momentum.value - momentumToLose, -6),
    }
  }));

  const burnMomentum = () => update((prev) => ({
    ...prev,
    momentum: {
      ...prev.momentum,
      value: prev.momentum.reset
    }
  }));

  const _setMomentum = (newVal: number) => update((prev) => ({
    ...prev,
    momentum: {
      ...prev.momentum,
      value: Math.max(Math.min(newVal, 10), -6),
    }
  }));

  return {
    subscribe,
    momentum: {
      takeMomentum,
      sufferMomentum,
      burnMomentum,
      _setMomentum,
    },
  }
};
