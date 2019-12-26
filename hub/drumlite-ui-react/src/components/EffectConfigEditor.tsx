import { FunctionComponent } from "react"
import React from "react"
import { Box } from "@material-ui/core"
import BaseEffectConfig from "@jonlabroad/drum-lite/dist/effects/BaseEffectConfig"
import { CSSProperties } from "@material-ui/styles"
import { List, ListHeader, ListItem } from "react-onsenui"
import PartialEffectConfig from "@jonlabroad/drum-lite/dist/effects/PartialEffectConfig";
import EffectConfigParameterContainer from "../containers/EffectConfigParameterContainer"

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
        renderHeader={() => <ListHeader>{"Config Name"}</ListHeader>}
        renderRow={(effect: PartialEffectConfig) => <ListItem>
        <Box display="flex" flexDirection="row">
            <List
                dataSource={effect.effect}
                renderHeader={() => <ListHeader>{effect.name}</ListHeader>}
                renderRow={(e) => {
                    return (
                        <ListItem>
                        <Box display="flex" flexDirection="column">
                            <div>{e.params.effectName}</div>
                            <div>{Object.keys(e.params.params).map((key: any) => <EffectConfigParameterContainer 
                                parameter={e.params.params[key]}
                            />)}</div>
                        </Box>
                        </ListItem>
                    );
                }}
            />
        </Box>
    </ListItem>}
    />
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