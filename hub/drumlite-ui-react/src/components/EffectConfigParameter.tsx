import { FunctionComponent } from "react"
import React from "react"
import { Input } from "react-onsenui"
import { EffectParameter, ParameterType } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"

export interface EffectConfigParameterProps {
    parameter: EffectParameter<any>

    onChange: Function
}

function getInputType(paramType: ParameterType): string {
    switch(paramType) {
        case 'string':
        case 'number':
            return 'text';
        case 'boolean':
            return 'checkbox';
        default:
            return 'text';
    }
}

export const EffectConfigParameter: FunctionComponent<EffectConfigParameterProps> = (props: EffectConfigParameterProps) => {
    const val = props.parameter.type === "number" ||
                props.parameter.type === "string" ? props.parameter.val : JSON.stringify(props.parameter.val);
    
    return (
        <div>
        <Input
            value={val} float
            type={getInputType(props.parameter.type)}
            onChange={(event) => { props.onChange(event.target.value) } }
            modifier='material'
            placeholder={props.parameter.paramName} />
        </div>
    );
}