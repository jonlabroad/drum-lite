import { EffectParameters } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";
import { ConstantAmplitudeParams } from "@jonlabroad/drum-lite/dist/light/effect/amplitude/ConstantAmplitude";
import { CubicFadeOutParameters } from "@jonlabroad/drum-lite/dist/light/effect/amplitude/CubicFadeOut";
import { LinearFadeOutEffectParams } from "@jonlabroad/drum-lite/dist/light/effect/amplitude/LinearFadeOutEffect";
import { LinearColorTransitionParams } from "@jonlabroad/drum-lite/dist/light/effect/color/LinearColorTransition";
import { SingleColorEffectParams } from "@jonlabroad/drum-lite/dist/light/effect/color/SingleColorEffect";
import { TripleCubicColorTransitionParams } from "@jonlabroad/drum-lite/dist/light/effect/color/TripleCubicColorTransition";
import { TripleLinearColorTransitionParams } from "@jonlabroad/drum-lite/dist/light/effect/color/TripleLinearColorTransition";
import { ConstantSpinParams } from "@jonlabroad/drum-lite/dist/light/effect/positional/ConstantSpin";
import { ConstantTargetsEffectParams } from "@jonlabroad/drum-lite/dist/light/effect/positional/ConstantTargetsEffect";
import { CubicSingleSpiralParams } from "@jonlabroad/drum-lite/dist/light/effect/positional/CubicSingleSpiral";
import { SymmetricalLedsParams } from "@jonlabroad/drum-lite/dist/light/effect/positional/SymmetricalLeds";
import { SparkleParams } from "@jonlabroad/drum-lite/dist/light/effect/positional/Sparkle";

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