import { FunctionComponent } from "react"
import React from "react"
import { Box, List } from "@material-ui/core"
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig"
import { CSSProperties } from "@material-ui/styles"
import EffectConfigParameterContainer from "../containers/EffectConfigParameterContainer"
import EffectConfig from "@jonlabroad/drum-lite/dist/effects/EffectConfig"

export interface EffectsConfigEditorProps {
    config: FullEffectConfig

    configChanged: any
}

const effectBoxStyle: CSSProperties = {
    border: "1px",
    borderStyle: 'solid'
}

const maxChildLevel = 0;

function renderEffect(effect: EffectConfig<any>, level: number): JSX.Element {
    const elements: JSX.Element[] = [];
    if (effect.effect) {
        elements.push(
            <Box key={effect.name} display="flex" flexDirection="column">
                <div>{effect.name}</div>
                <div>
                    {(effect.effect ? effect.effect.partialEffects : []).map(e => {
                        return (
                        <div>{Object.keys(e.params.params)
                                .filter((key: string) => !e.params.params[key].options.isHidden)
                                .map((key: string) => <EffectConfigParameterContainer 
                                    key={`${effect.name}${key}`}
                                    parameter={e.params.params[key]}
                    />)}</div>
                        );
                    })}
                </div>
            </Box>
        );
    }
    else if (effect.params) {
        elements.push(
            <Box key={effect.name} display="flex" flexDirection="column">
                <div>{effect.name}</div>
                {Object.keys(effect.params.params).filter(k => !effect.params.params[k].options.isHidden).map((paramKey: string) => {
                    const param = effect.params.params[paramKey];
                    return (
                        <div key={`${param.paramName}${effect.name}`}>
                            <Box display="flex" flexDirection="column">
                                <EffectConfigParameterContainer 
                                    parameter={param}
                                />
                            </Box>
                        </div>
                    )
                })}
            </Box>
        )
    }

    if (effect.children && level < maxChildLevel) {
        elements.push(...effect.children.map(child => renderEffect(child, level +  1)));
    }

    return (
        <div>
            {elements}
        </div>
    )
}

function renderEffects(config: FullEffectConfig): (JSX.Element | null)[] {
    return config.effects.map(effect => renderEffect(effect, 0));
}


export const EffectsConfigEditor: FunctionComponent<EffectsConfigEditorProps> = (props: EffectsConfigEditorProps) => {
    console.log({props});
    return (
        <React.Fragment>
        <Box display="flex" flexDirection="column" justifyContent="center">
            {renderEffects(props.config)}
        </Box>
        </React.Fragment>
    )
}