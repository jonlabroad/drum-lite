import { FunctionComponent } from "react"
import React from "react"
import { Box } from "@material-ui/core"
import BaseEffectConfig from "@jonlabroad/drum-lite/dist/effects/BaseEffectConfig"
import { CSSProperties } from "@material-ui/styles"
import { List, ListHeader, ListItem } from "react-onsenui"
import PartialEffectConfig from "@jonlabroad/drum-lite/dist/effects/PartialEffectConfig";

export interface EffectsConfigEditorProps {
    config: BaseEffectConfig
}

const effectBoxStyle: CSSProperties = {
    border: "1px",
    borderStyle: 'solid'
}

function renderEffects(config: BaseEffectConfig): JSX.Element {
    return (
    <List
        dataSource={config.effects}
        renderHeader={() => <ListHeader>{"EFFECT NAME"}</ListHeader>}
        renderRow={(effect: PartialEffectConfig) => <ListItem>
        <Box display="flex" flexDirection="row">
            <List
                dataSource={effect.effect}
                renderHeader={() => <ListHeader>{effect.triggerEvents.map(t => t.toString())}</ListHeader>}
                renderRow={(e) => {
                    return (
                        <ListItem>
                        <Box display="flex" flexDirection="column">
                            <div>{e.params.effectName}</div>
                            <div>{Object.keys(e.params.params).map((key: any) => <div>{`${e.params.params[key].paramName}: ${e.params.params[key].val.toString()}`}</div>)}</div>
                        </Box>
                        </ListItem>

                    );
                }}
            />
        </Box>
    </ListItem>}
    />
    );

    return (
        <div>
        {config.effects.map(effect => {
        return <Box style={effectBoxStyle} display="flex" flexDirection="column">
            <div>{effect.isAmbient ? <div>Ambient</div> : effect.triggerEvents.map(trigger => <div>{trigger.toString()}</div>)}</div>
            {effect.effect.map(effectElement => {
                console.log(effectElement.params);
                return <div>
                        {effectElement.params.effectName}
                        {Object.keys(effectElement.params.params).map(key => {
                            return <div>
                                    {effectElement.params.params[key].paramName}
                                </div>
                        })}
                    </div>
            })}
        </Box>
    })}
    </div>
    );
}


export const EffectsConfigEditor: FunctionComponent<EffectsConfigEditorProps> = (props: EffectsConfigEditorProps) => {
    
    return (
        <React.Fragment>
        <Box display="flex" flexDirection="column" justifyContent="center">
            <div>Effects Config Editor</div>
            {renderEffects(props.config)}
        </Box>
        </React.Fragment>
    )
}