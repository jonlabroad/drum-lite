import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { ColorEffectPicker } from "./ColorEffectPicker";
import { BooleanEffectValue } from "./BooleanEffectValue";
import { NumberEffectValue } from "./NumberEffectValue";
import { Box, Typography, InputLabel } from "@material-ui/core";
import { TargetEffectValue } from "./TargetEffectValue";
import { HitTypeEffectValue } from "./HitTypeEffectValue";
import { PriorityEditor } from "./PriorityEditor";

const parameterLabelStyle: CSSProperties = {
    marginRight: "20px",
    minWidth: "140px",
    textAlign: "right"
}

const paramStyle: CSSProperties = {
    marginBottom: "10px"
}

export interface EffectConfigParameterProps {
    parameter: EffectParameter<any>

    onChange: Function
}

function onSubmit(props: EffectConfigParameterProps, newVal: any, arrayIndex: number | undefined = undefined) {
    if (arrayIndex === undefined) {
        props.onChange(props.parameter, newVal);
    } else {
        console.log({existingVal: props.parameter.val});
        const fullNewVal = props.parameter.val;
        fullNewVal[arrayIndex] = newVal;
        console.log({fullNewVal});
        props.onChange(props.parameter, fullNewVal);
    }
}

function renderFieldValue(props: EffectConfigParameterProps, type: string, arrayIndex: number | undefined = undefined) {
    const val = props.parameter.options.isArray && arrayIndex !== undefined ? props.parameter.val[arrayIndex] : props.parameter.val;
    console.log({val});
    switch (type) {
        case "boolean":
            return <BooleanEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: boolean) => onSubmit(props, newValue)}
            />
        case "rgb":
            return <ColorEffectPicker
                val={val}
                onSubmit={(newValue: any) => onSubmit(props, newValue, arrayIndex)}
            />
        case "number":
            return <NumberEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, newValue)}
            />
        case "target":
            return <TargetEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, newValue)}
            />
        case "hittype":
            return <HitTypeEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, newValue)}
            />
        case "priority":
            return <PriorityEditor
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, newValue)}
            />
        default:
            return <div>UNKNOWN TYPE {type}</div>
    }
}

export const EffectConfigParameter: FunctionComponent<EffectConfigParameterProps> = (props: EffectConfigParameterProps) => {
    const type = props.parameter.options.type || "number";

    const fieldValues: JSX.Element[] = [];
    if (props.parameter.options.isArray) {
        console.log({isArray: props.parameter});
        fieldValues.push(...props.parameter.val.map((param: any, index: number) => renderFieldValue(props, type, index)));
    } else {
        fieldValues.push(renderFieldValue(props, type));
    }

    return <React.Fragment>
        {fieldValues.map((fieldValue, index) => {
            return (
                <div key={`${props.parameter.paramName}${index}`}
                   style={paramStyle}
                >
                    <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                        <div style={parameterLabelStyle}><InputLabel>{props.parameter.paramName + (props.parameter.options.isArray ? `[${index}]` : ``)}</InputLabel></div>
                        {fieldValue}
                    </Box>
                </div>
            );
        })}
    </React.Fragment>
}