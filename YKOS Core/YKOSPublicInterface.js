// FILE: YKOS Core/YKOSPublicInterface.js

const state = {
  mode: "static",
  flow: 1,
  phase: 0,
  color: {
    theme: "neutral",
    intensity: 1,
    saturation: 1,
  },
  transition: null,
  running: false,
};

const listeners = new Set();
let animationId = null;
let lastTime = 0;

function notify() {
  const snapshot = getState();

  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (error) {
      console.error("YKOS listener hatası:", error);
    }
  });

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("ykos:update", {
        detail: snapshot,
      })
    );
  }
}

function getState() {
  return {
    ...state,
    color: { ...state.color },
    transition: state.transition
      ? { ...state.transition }
      : null,
  };
}

function setState(nextState = {}) {
  if (!nextState || typeof nextState !== "object") return getState();

  Object.assign(state, nextState);

  if (nextState.color) {
    state.color = {
      ...state.color,
      ...nextState.color,
    };
  }

  notify();
  return getState();
}

function setMode(mode) {
  state.mode = mode;
  notify();
  return getState();
}

function setFlow(value = 1) {
  const numericValue = Number(value);
  state.flow = Number.isFinite(numericValue) ? numericValue : 1;
  notify();
  return getState();
}

function setPhase(value = 0) {
  const numericValue = Number(value);
  state.phase = Number.isFinite(numericValue) ? numericValue : 0;
  notify();
  return getState();
}

function setColor(theme = "neutral", intensity = 1, saturation = 1) {
  state.color = {
    theme,
    intensity: Number(intensity) || 1,
    saturation: Number(saturation) || 1,
  };

  notify();
  return getState();
}

function fadeTo(mode, duration = 1) {
  state.transition = {
    type: "fade",
    targetMode: mode,
    duration,
    startedAt: Date.now(),
  };

  state.mode = mode;
  notify();
  return getState();
}

function blendTo(mode, duration = 1) {
  state.transition = {
    type: "blend",
    targetMode: mode,
    duration,
    startedAt: Date.now(),
  };

  state.mode = mode;
  notify();
  return getState();
}

function tick(time) {
  if (!state.running) return;

  if (!lastTime) lastTime = time;

  const delta = Math.min((time - lastTime) / 1000, 0.1);
  lastTime = time;

  if (state.mode !== "static") {
    state.phase += delta * state.flow;
  }

  notify();
  animationId = window.requestAnimationFrame(tick);
}

function startLoop() {
  if (
    typeof window === "undefined" ||
    state.running
  ) {
    return;
  }

  state.running = true;
  lastTime = 0;
  animationId = window.requestAnimationFrame(tick);
  notify();
}

function stopLoop() {
  state.running = false;

  if (
    typeof window !== "undefined" &&
    animationId !== null
  ) {
    window.cancelAnimationFrame(animationId);
  }

  animationId = null;
  lastTime = 0;
  notify();
}

function subscribe(listener) {
  if (typeof listener !== "function") {
    return () => {};
  }

  listeners.add(listener);
  listener(getState());

  return () => listeners.delete(listener);
}

export const YKOS = {
  startLoop,
  stopLoop,
  setMode,
  fadeTo,
  blendTo,
  setFlow,
  setPhase,
  setColor,
  getState,
  setState,
  subscribe,
};