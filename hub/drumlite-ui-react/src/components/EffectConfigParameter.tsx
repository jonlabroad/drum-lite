import { FunctionComponent } from "react"
import React from "react"
import { Input } from "react-onsenui"
import { EffectParameter } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"

export interface EffectConfigParameterProps {
    parameter: EffectParameter<any>

    onChange: Function
}

export const EffectConfigParameter: FunctionComponent<EffectConfigParameterProps> = (props: EffectConfigParameterProps) => {
    const val = props.parameter.type === "number" ||
                props.parameter.type === "string" ? props.parameter.val : JSON.stringify(props.parameter.val);
    
    return (
        <Input
            value={val}
            onChange={(event) => { props.onChange(event.target.value) } }
            modifier='material'
            placeholder={props.parameter.paramName} />
    );
}