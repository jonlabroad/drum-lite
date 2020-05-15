import { EffectParameter } from "./effects/EffectParameter";

export default class EffectConfig {
    public params: {[key: string]: EffectParameter<any>};

    constructor(values?: {[key: string]: any}) {
        this.params = {
        };

        // TODO set values
    }
}