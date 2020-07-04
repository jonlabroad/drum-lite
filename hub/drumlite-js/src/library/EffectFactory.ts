import EffectConfig from "../config/EffectConfig";
import RacerEffect, { RacerConfig } from "./Racer";
import RunnableEffect from "../effect/RunnableEffect";

export default class EffectFactory {
    public static create(type: string, values: {[key: string]: any}): RunnableEffect | undefined {
        switch(type.toLowerCase()) {
            case "racer": return new RacerEffect(new RacerConfig(values));
            default: console.error(`Do not know effect of type ${type}`);
        }
    }
}