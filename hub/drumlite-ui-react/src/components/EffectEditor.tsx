import { FunctionComponent, useState } from "react"
import React from "react"
import { Box, List, Typography } from "@material-ui/core"
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig"
import { CSSProperties } from "@material-ui/styles"
import EffectConfigParameterContainer from "../containers/EffectConfigParameterContainer"
import { EffectParameters } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { EffectHeader } from "./EffectHeader"
import EffectConfig from "@jonlabroad/drum-lite/dist/effects/EffectConfig"

export interface EffectsConfigProps {
    config: FullEffectConfig
    effect: EffectConfig<any>
    level: number
}

const effectContainerStyle: CSSProperties = {
    borderRadius: "10px",
    marginBottom: "10px",
    backgroundColor: "#FFFFFF"
}

const maxChildLevel = 0;

function renderEffectHeader(name: string, params: EffectParameters, expanded: boolean, setExpanded: Function) {
    return <EffectHeader
        name={name}
        params={params}
        expanded={expanded}
        onExpand={(expanded: boolean) => setExpanded(expanded)}
    />
}

function renderParameters(effectName: string, params: EffectParameters) {
    return Object.keys(params.params).filter(k => !params.params[k].options.isHidden).map((paramKey: string) => {
        const param = params.params[paramKey];
        return (
                <EffectConfigParameterContainer 
                    parameter={param}
                />
        )
    })
}

export const EffectEditor: FunctionComponent<EffectsConfigProps> = (props: EffectsConfigProps) => {
    const [expanded, setExpanded] = useState(false);

    const elements: JSX.Element[] = [];
    const { effect } = props;
    if (effect.effect) {
        elements.push(
            <Box key={props.effect.name} style={effectContainerStyle} display="flex" flexDirection="column">
                {renderEffectHeader(effect.name, effect.params, expanded, setExpanded)}
                {(effect.effect ? effect.effect.partialEffects : []).map((e: any) => {
                    return renderParameters(effect.name, e.params)
                })}
            </Box>
        );
    }
    else if (effect.params) {
        elements.push(
            <Box key={effect.name} style={effectContainerStyle} display="flex" flexDirection="column">
                {renderEffectHeader(effect.name, effect.params, expanded, setExpanded)}
                {expanded ? renderParameters(effect.name, effect.params) : null}
            </Box>
        )
    }

    if (effect.children && props.level < maxChildLevel) {
        elements.push(...effect.children.map((child: any) => <EffectEditor config={props.config} effect={child} level={props.level + 1}/>));
    }

    return (
        <div>
            {elements}
        </div>
    )
}