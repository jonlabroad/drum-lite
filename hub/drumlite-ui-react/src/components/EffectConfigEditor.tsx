import { FunctionComponent } from "react"
import React from "react"
import { Box } from "@material-ui/core"
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig"
import { CSSProperties } from "@material-ui/styles"
import { List, ListHeader, ListItem } from "react-onsenui"
import EffectConfigParameterContainer from "../containers/EffectConfigParameterContainer"
import EffectConfig from "@jonlabroad/drum-lite/dist/effects/EffectConfig"
import PartialEffect from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"

export interface EffectsConfigEditorProps {
    config: FullEffectConfig

    configChanged: any
}

const effectBoxStyle: CSSProperties = {
    border: "1px",
    borderStyle: 'solid'
}

function renderEffect(effect: EffectConfig<any>): JSX.Element {
    const elements: JSX.Element[] = [];
    if (effect.effect) {
        elements.push(
            <List
                dataSource={effect.effect ? effect.effect.partialEffects : []}
                renderHeader={() => <ListHeader>{effect.name}</ListHeader>}
                renderRow={(e: PartialEffect<any>) => {
                    return (
                        <ListItem>
                        <Box display="flex" flexDirection="column">
                            <div>{e.params.effectName}</div>
                            <div>{Object.keys(e.params.params)
                                        .filter((key: string) => !e.params.params[key].options.isHidden)
                                        .map((key: string) => <EffectConfigParameterContainer 
                                parameter={e.params.params[key]}
                            />)}</div>
                        </Box>
                        </ListItem>
                    );
                }}
            />
        )
    }
    else if (effect.params) {
        elements.push(
            <List
                dataSource={Object.keys(effect.params.params).filter(k => !effect.params.params[k].options.isHidden)}
                renderHeader={() => <ListHeader>{effect.name}</ListHeader>}
                renderRow={(paramKey: string) => {
                    const param = effect.params.params[paramKey];
                    return (
                        <ListItem>
                            <Box display="flex" flexDirection="column">
                                <div>{param.paramName}</div>
                                <EffectConfigParameterContainer 
                                    parameter={param}
                                />
                            </Box>
                        </ListItem>
                    )
                }
            }/>
        )
    }

    if (effect.children) {
        elements.push(...effect.children.map(child => renderEffect(child)));
    }

    return (
        <div>
            {elements}
        </div>
    )
}

function renderEffects(config: FullEffectConfig): (JSX.Element | null)[] {
    return config.effects.map(effect => renderEffect(effect));
}


export const EffectsConfigEditor: FunctionComponent<EffectsConfigEditorProps> = (props: EffectsConfigEditorProps) => {
    console.log({props});
    return (
        <React.Fragment>
        <Box display="flex" flexDirection="column" justifyContent="center">
            <div>Effects Config Editor</div>
            {renderEffects(props.config)}
        </Box>
        </React.Fragment>
    )
}