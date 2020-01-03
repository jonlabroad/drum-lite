import { FunctionComponent, useState } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { NumberInputRange } from "./NumberInputRange";
import { Box, Checkbox, Input } from "@material-ui/core";
import { PhotoshopPicker, ColorResult } from "react-color";
import RGB from "@jonlabroad/drum-lite/dist/light/RGB";

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
        console.log(newVal);
        props.onChange(props.parameter, newVal);
    }
}

export const EffectConfigParameter: FunctionComponent<EffectConfigParameterProps> = (props: EffectConfigParameterProps) => {
    const val = props.parameter.val;

    const [currentVal, setCurrentVal] = useState(val);
    const [prevVal, setPrevVal] = useState(val);

    const type = props.parameter.options.type || "number";
    if (type === "boolean") {
        return (
            <Box display="flex" justifyContent="flex-start" alignItems="center">
                <div style={{marginRight: "10px"}}>
                    <Checkbox
                        checked={currentVal}
                        onChange={(event) => {
                            setCurrentVal(!currentVal);
                            onSubmit(props, currentVal, !currentVal);
                        }}
                    />
                </div>
                <div>
                    <label>{props.parameter.paramName}</label>
                </div>
            </Box>
        );
    } else if (type === "rgb") {
        return (
            <Box display="flex">
                <div>{props.parameter.paramName}</div>
                <PhotoshopPicker 
                    color={{
                        r: props.parameter.val.r,
                        b: props.parameter.val.b,
                        g: props.parameter.val.g
                    }}
                    onChange={(color: ColorResult) => {
                        if (color.rgb) {
                            const rgb = new RGB(color.rgb.r, color.rgb.b, color.rgb.g);
                            setCurrentVal(rgb);
                            onSubmit(props, undefined, rgb);
                        }
                    }}
                    onChangeComplete={(color: ColorResult) => {
                        if (color.rgb) {
                            const rgb = new RGB(color.rgb.r, color.rgb.b, color.rgb.g);
                            setCurrentVal(rgb);
                            onSubmit(props, undefined, rgb);
                        }
                    }}
                    onAccept={(color: ColorResult) => {
                        setPrevVal(currentVal);
                    }}
                    onCancel={() => {
                        console.log({prevVal});
                        setCurrentVal(prevVal);
                        onSubmit(props, undefined, prevVal);
                    }}
                />
            </Box>
        );
    } else {
        return (
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                <Box display="flex" justifyContent="flex-start" style={{width: "400px", marginRight: "20px"}}>
                    <div style={{width: "50%"}}>
                        <label>{props.parameter.paramName}</label>
                    </div>
                    <Input
                        //style={{width: "300px"}}
                        value={currentVal}
                        type={getInputType(props.parameter.options.type || "number")}
                        onChange={(event) => { setCurrentVal(event.target.value) } }
                        onBlur={(event) => onSubmit(props, val, currentVal)}
                        placeholder={props.parameter.paramName} />
                </Box>
                <Box display="flex" justifyContent="flex-start" style={{width: "150px"}}>
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
                </Box>
            </Box>
        );
    };
}