import { TransitionType, EffectType, Easings, WipeDirection, SlideDirection } from 'midori-bg'

export const getTransitionConfig = function (type) {
    switch (type) {
        case TransitionType.Blend:
            return {
                duration: 1.5,
                easing: Easings.Quartic.InOut,
            };
        case TransitionType.Wipe:
            return {
                duration: 1.5,
                easing: Easings.Quartic.InOut,
                gradient: 0.5,
                angle: 15,
                direction: WipeDirection[Object.keys(WipeDirection)[Math.floor(Math.random() * Object.keys(WipeDirection).length)]],
            };
        case TransitionType.Blur:
            return {
                duration: 1,
                easing: Easings.Quintic.InOut,
                intensity: 1.5,
            };
        case TransitionType.Slide:
            return {
                duration: 1.5,
                easing: Easings.Quintic.InOut,
                slides: 2,
                intensity: 5,
                direction: SlideDirection[Object.keys(SlideDirection)[Math.floor(Math.random() * Object.keys(SlideDirection).length)]],
            };
        case TransitionType.Glitch:
            return {
                seed: Math.random(),
                duration: 1.5,
                easing: Easings.Cubic.InOut,
            };
        default:
            return {};
    }
}

export const setEffects = function (background, effects) {
    const { effects: backgroundEffects } = background;
    backgroundEffects.removeAll();
    for (const effect of effects) {
        switch (effect) {
            case EffectType.Blur:
                backgroundEffects.set(EffectType.Blur, { radius: 1.5, passes: 2 });
                break;
            case EffectType.MotionBlur:
                backgroundEffects.set(EffectType.MotionBlur, { intensity: 1, samples: 32 });
                break;
            case EffectType.Bloom:
                backgroundEffects.set(EffectType.Bloom, { radius: 1, passes: 2 });
                break;
            case EffectType.RgbShift:
                backgroundEffects.set(EffectType.RgbShift, { amount: 0.005, angle: 135 });
                break;
            case EffectType.Vignette:
                backgroundEffects.set(EffectType.Vignette, { darkness: 1, offset: 1 });
                break;
            case EffectType.VignetteBlur:
                backgroundEffects.set(EffectType.VignetteBlur, { size: 3, radius: 1.5, passes: 2 });
                break;
        }
    }
}

export const setParticlesAway = function (background) {
    const { particles } = background;
    particles.generate([
        {
            name: 'small',
            amount: 200,
            maxSize: 5,
            maxOpacity: 0.8,
            minGradient: 0.75,
            maxGradient: 1.0,
        },
        {
            name: 'medium',
            amount: 50,
            maxSize: 12,
            maxOpacity: 0.8,
            minGradient: 0.75,
            maxGradient: 1.0,
            smoothing: 0.8,
        },
        {
            name: 'large',
            amount: 30,
            minSize: 100,
            maxSize: 125,
            maxOpacity: 0.04,
            minGradient: 1.0,
            maxGradient: 1.0,
            smoothing: 0.65,
        },
    ]);
    particles.move('small', { distance: 0.5, angle: 25 }, { duration: 5, loop: true });
    particles.move('medium', { distance: 0.3, angle: 45 }, { duration: 5, loop: true });
    particles.move('large', { distance: 0.4, angle: 35 }, { duration: 5, loop: true });
    particles.sway('small', { x: 0.025, y: 0.025 }, { duration: 1.5, easing: Easings.Sinusoidal.InOut, loop: true });
    particles.sway('medium', { x: 0.025, y: 0.025 }, { duration: 1.5, easing: Easings.Sinusoidal.InOut, loop: true });
    particles.sway('large', { x: 0.025, y: 0.025 }, { duration: 1.5, easing: Easings.Sinusoidal.InOut, loop: true });
}

export const setParticlesGlow = function (background) {
    const { particles } = background
    particles.generate([
        {
            name: "small",
            amount: 60,
            maxSize: 5,
            maxOpacity: 1,
            minGradient: 0.75,
            maxGradient: 1.0,
            color: 0xffffff
        },
        {
            name: "large",
            amount: 15,
            minSize: 50,
            maxSize: 100,
            maxOpacity: 0.1,
            minGradient: 1.0,
            maxGradient: 1.0,
            color: 0xffffff
        }
    ]);
    particles.sway(
        "large",
        { x: 0.025, y: 0.025 },
        { duration: 1.5, easing: Easings.Sinusoidal.InOut, loop: true }
    );
    particles.sway(
        "small",
        { x: 0.025, y: 0.025 },
        { duration: 1.5, easing: Easings.Sinusoidal.InOut, loop: true }
    );
}

export const getEffectTypeString = function (effectType) {
    switch (effectType) {
        case EffectType.RgbShift:
            return 'RGB Shift';
        case EffectType.MotionBlur:
            return 'Motion Blur';
        case EffectType.VignetteBlur:
            return 'Vignette Blur';
        default:
            return effectType;
    }
}