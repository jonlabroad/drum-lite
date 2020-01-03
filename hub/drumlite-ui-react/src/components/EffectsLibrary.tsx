import { FunctionComponent } from "react"
import React from "react"
import { Box } from "@material-ui/core"
import { CSSProperties } from "@material-ui/styles";
import { Add } from "@material-ui/icons";
import EffectUtil from "../util/EffectUtil";
import { EffectParameters } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";

export interface EffectsLibraryProps {
}

const effectsLibraryStyle: CSSProperties = {
    margin: 10,
    height: 50,
    width: 100
};

function renderEffect(param: EffectParameters) {
    return (
        <div>{param.effectName}</div>
    );
}

function renderEffectCategory(type: string) {
    const effects = EffectUtil.getEffectsOfType(type);
    
    return (
        <Box display="flex" flexDirection="column">
            <div>{type}</div>
            {
                effects.map(effect => {
                    return (
                        <Box display="flex" flexDirection="row">
                            <div>{effect.effectName}</div>
                            <Add fontSize="small"></Add>
                        </Box>
                    );
                })
            }
        </Box>
    );
}

function renderAllEffects() {
    const categories = EffectUtil.getAllEffectTypes();
    return categories.map(renderEffectCategory);
}

export const EffectsLibrary: FunctionComponent<EffectsLibraryProps> = (props: EffectsLibraryProps) => {
    return (
        <React.Fragment>
        <Box display="flex" flexDirection="column" justifyContent="center">
            {renderAllEffects()}
        </Box>
        </React.Fragment>
    )
}