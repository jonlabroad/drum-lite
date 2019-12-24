import { EffectParameters } from "drumlite-js/dist/light/effect/PartialEffect";
import { ConstantAmplitudeParams } from "drumlite-js/dist/light/effect/amplitude/ConstantAmplitude";
import { CubicFadeOutParameters } from "drumlite-js/dist/light/effect/amplitude/CubicFadeOut";
import { LinearFadeOutEffectParams } from "drumlite-js/dist/light/effect/amplitude/LinearFadeOutEffect";
import { LinearColorTransitionParams } from "drumlite-js/dist/light/effect/color/LinearColorTransition";
import { SingleColorEffectParams } from "drumlite-js/dist/light/effect/color/SingleColorEffect";
import { TripleCubicColorTransitionParams } from "drumlite-js/dist/light/effect/color/TripleCubicColorTransition";
import { TripleLinearColorTransitionParams } from "drumlite-js/dist/light/effect/color/TripleLinearColorTransition";
import { ConstantSpinParams } from "drumlite-js/dist/light/effect/positional/ConstantSpin";
import { ConstantTargetsEffectParams } from "drumlite-js/dist/light/effect/positional/ConstantTargetsEffect";
import { CubicSingleSpiralParams } from "drumlite-js/dist/light/effect/positional/CubicSingleSpiral";
import { SymmetricalLedsParams } from "drumlite-js/dist/light/effect/positional/SymmetricalLeds";
import { SparkleParams } from "drumlite-js/dist/light/effect/positional/Sparkle";

export default class EffectRegistry {
    
    public static effects: EffectParameters[] = [
        new ConstantAmplitudeParams(),
        new CubicFadeOutParameters(),
        new LinearFadeOutEffectParams(),

        new LinearColorTransitionParams(),
        new SingleColorEffectParams(),
        new TripleCubicColorTransitionParams(),
        new TripleLinearColorTransitionParams(),

        new ConstantSpinParams(),
        new ConstantTargetsEffectParams(),
        new CubicSingleSpiralParams(),
        new SparkleParams(),
        new SymmetricalLedsParams()
    ];
}