import { EffectParameter } from "./effects/EffectParameter";

export default class EffectConfig {
    public params: {[key: string]: EffectParameter<any>};
    public values: {[key: string]: any};

    constructor(values?: {[key: string]: any}) {
        this.params = {
        };

        this.values = values ?? {};

        // TODO set values
    }
}