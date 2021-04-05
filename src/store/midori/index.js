import {
  BackgroundRenderer,
  loadImage,
  isWebGLSupported,
  TransitionType,
  Easings,
  EffectType,
} from "midori-bg";
import {
  setParticlesGlow,
  setParticlesAway,
  getTransitionConfig,
} from "./helpers";

export default {
  namespaced: true,
  state: {
    canvas: null,
    background: [],
    midoriRenderer: null,
    isLoaded: false,
    update: false,
    index: 0,
    disabled: false,
  },
  mutations: {
    setTurnBackground(state) {
      if (state.disabled) return;
      const delay = 0.75;
      state.midoriRenderer.setBackground(state.background[state.index], {
        type: TransitionType.Blend,
        delay,
        config: {
          ...getTransitionConfig(TransitionType.Blend),
          onInit: (prevBackground, nextBackground) => {
            prevBackground.camera.move(
              {
                x: Math.random(),
                y: Math.random(),
                z: 0.3 + Math.random() * 0.7,
              },
              {
                duration: 2.5,
                easing: Easings.Quartic.In,
              }
            );
            prevBackground.camera.rotate(-5 + Math.random() * 10, {
              duration: 2.5,
              easing: Easings.Quartic.In,
            });
            nextBackground.camera.move(
              {
                x: Math.random(),
                y: Math.random(),
                z: 0.7 + Math.random() * 0.3,
              },
              {
                duration: 2,
                delay,
                easing: Easings.Quartic.Out,
              }
            );
            nextBackground.camera.sway(
              { x: 0.1, y: 0.05, z: 0.02, zr: 1 },
              {
                duration: 3,
                easing: Easings.Quadratic.InOut,
                loop: true,
              }
            );
            nextBackground.camera.rotate(-5 + Math.random() * 10, {
              duration: 2,
              delay,
              easing: Easings.Quartic.Out,
            });
          },
        },
      });
      const { camera } = state.midoriRenderer.background;

      camera.sway(
        { x: 0.1, y: 0.05, z: 0.02, zr: 1 },
        {
          duration: 2,
          easing: Easings.Quadratic.InOut,
          loop: true,
        }
      );

      const { effects } = state.midoriRenderer.background;
      effects.set(EffectType.MotionBlur, { intensity: 1, samples: 10 });
      effects.set(EffectType.RgbShift, { amount: 0.005, angle: 90 });
      effects.set(EffectType.VignetteBlur, {
        size: 3,
        radius: 1.5,
        passes: 3,
      });

      setParticlesAway(state.midoriRenderer.background);
      if (!state.isLoaded) {
        setTimeout(() => {
          state.isLoaded = true;
        }, 1250);
      }
    },
    setHomeBackground(state, index) {
      if (state.disabled) return;

      state.midoriRenderer.setBackground(
        state.background[index || state.index],
        {
          type: TransitionType.Glitch,
          config: {
            seed: Math.random(),
            duration: 1.5,
            easing: Easings.Cubic.InOut,
          },
        }
      );

      const { camera } = state.midoriRenderer.background;

      camera.sway(
        { x: 0.1, y: 0.05, z: 0.02, zr: 1 },
        {
          duration: 2,
          easing: Easings.Quadratic.InOut,
          loop: true,
        }
      );

      const { effects } = state.midoriRenderer.background;
      effects.set(EffectType.MotionBlur, { intensity: 1, samples: 10 });
      effects.set(EffectType.RgbShift, { amount: 0.005, angle: 90 });
      effects.set(EffectType.VignetteBlur, {
        size: 3,
        radius: 1.5,
        passes: 3,
      });

      setParticlesGlow(state.midoriRenderer.background);

      if (!state.isLoaded) {
        setTimeout(() => {
          state.isLoaded = true;
        }, 1250);
      }
    },
    setCanvas(state, payload) {
      if (!isWebGLSupported) return false;
      if (state.disabled) return false;

      state.background = payload.imgs;
      state.canvas = payload.el;
      state.midoriRenderer = new BackgroundRenderer(state.canvas);
    },
    setUpdate(state, payload) {
      if (state.disabled) return false;
      state.update = payload.value;
      state.index = payload.index;
    },
    enable(state) {
      state.disabled = false;
    },
    disable(state) {
      state.disabled = true;
      if (state.midoriRenderer) {
        state.midoriRenderer.dispose();
      }
    },
    updateCanvas(state, el) {
      if (state.disabled) return false;
      state.canvas = el;
    },
    setBackgroundImage(state, bgURL) {
      if (state.disable) return false;
      state.background = bgURL;
    },
    cleanUp(state) {
      state.midoriRenderer.dispose();
      state.midoriRenderer = null;
      state.canvas = null;
      state.background = [];
      state.midoriRenderer = null;
      state.index = 0;
      state.disabled = false;
    },
  },
  actions: {
    async setCanvas({ commit }, payload) {
      try {
        const i1 = await loadImage(`/themes/${payload.theme}/battleBg1.jpg`);
        const i2 = await loadImage(`/themes/${payload.theme}/battleBg2.jpg`);
        const i3 = await loadImage(`/themes/${payload.theme}/homeBg.jpg`);
        commit("setCanvas", {
          el: payload.canvas,
          imgs: [i1, i2, i3],
        });
        return true;
      } catch (err) {
        alert(err);
        return false;
      }
    },
  },
  getters: {
    updateStatus: function(state) {
      return state.update;
    },
    isDisabled: function(state) {
      return state.disabled;
    },
    canvas: function(state) {
      return state.canvas;
    },
  },
};
