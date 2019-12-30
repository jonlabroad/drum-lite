import { FunctionComponent, useState } from "react"
import React from "react"
import { Input } from "react-onsenui"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { NumberInputRange } from "./NumberInputRange";

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

function onSubmit(props: EffectConfigParameterProps, prevVal: any, newVal: any) {
    if (prevVal !== newVal) {
        props.onChange(props.parameter, newVal);
    }
}

export const EffectConfigParameter: FunctionComponent<EffectConfigParameterProps> = (props: EffectConfigParameterProps) => {
    const val = props.parameter.options.type === "number" ||
                props.parameter.options.type === "string" ? props.parameter.val : JSON.stringify(props.parameter.val);

    const [currentVal, setCurrentVal] = useState(val);
    
    return (
        <div>
        <Input
            value={currentVal} float
            type={getInputType(props.parameter.options.type || "number")}
            onChange={(event) => { setCurrentVal(event.target.value) } }
            onBlur={(event) => onSubmit(props, val, currentVal)}
            modifier='material'
            placeholder={props.parameter.paramName} />
        {props.parameter.options.type === "number" &&
            <NumberInputRange
                value={currentVal}
                range={props.parameter.options.range || defaultAmplitudeRange}
                onChange={(val: number) => {
                    setCurrentVal(val);
                    onSubmit(props, currentVal, val);
                }}
            />
        }
        </div>
    );
}