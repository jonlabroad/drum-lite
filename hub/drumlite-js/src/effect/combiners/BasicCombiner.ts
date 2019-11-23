import CompiledEffect from "../CompiledEffect"

export default class BasicCombiner {
    public combine(existingEffects: Record<number, CompiledEffect[]>) {
        this.combineAmplitude(existingEffects);
    }

    private combineAmplitude(existingEffects: Record<number, CompiledEffect[]>) {
        for (let ledId in existingEffects) {
            const modifiers = existingEffects[ledId].filter(e => e.isModifier);
            const ledEffects = existingEffects[ledId].filter(e => !e.isModifier);
            if (ledEffects.length > 1) {
                console.log("MULTIPLE NON-MODIFIERS FOUND DURING COMBINATION: " + ledEffects);
            }

            if (modifiers.length > 1) {
                console.log("MULTIPLE MODIFIERS FOUND DURING COMBINATION: " + modifiers);
            }

            if (ledEffects.length <= 0) {
                continue;
            }

            for (let ledEffect of ledEffects) {
                if (!ledEffect.amplitude) {
                    continue;
                }

                for (let modifier of modifiers) {
                    if (!modifier.amplitude) {
                        continue;
                    }

                    if (modifier.amplitude > 0.0) {
                        if (ledEffect.priority <= modifier.priority) {
                            ledEffect.amplitude = ledEffect.amplitude * (1 + modifier.amplitude);
                        }
                    }
                }
            }
        }
    }
}
