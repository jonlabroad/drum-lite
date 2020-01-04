import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Input, Box, TextField } from "@material-ui/core";
import { NumberInputRange } from "./NumberInputRange";

export interface NumberEffectValueProps {
    parameter: EffectParameter<any>

    onSubmit: Function
}

const inputStyle: CSSProperties = {
    width: "100px",
    marginRight: "20px"
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

export const NumberEffectValue: FunctionComponent<NumberEffectValueProps> = (props: NumberEffectValueProps) => {
    const val = props.parameter.val;

    const [currentVal, setCurrentVal] = useState(val);

    const type = props.parameter.options.type || "number";
    return <React.Fragment>
        <Box display="flex" flexDirection="row">
            <TextField
                style={inputStyle}
                value={currentVal}
                type={getInputType(type)}
                onChange={(event) => { setCurrentVal(event.target.value) } }
                onBlur={(event) => props.onSubmit(currentVal)}
                placeholder={props.parameter.paramName}
            />
            {props.parameter.options.type === "number" &&
            <NumberInputRange
                value={currentVal}
                range={props.parameter.options.range || defaultAmplitudeRange}
                onChange={(val: number) => {
                    setCurrentVal(val);
                    props.onSubmit(val);
                }}
            />}
        </Box>
        </React.Fragment>
}