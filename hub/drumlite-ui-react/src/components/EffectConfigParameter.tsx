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

export interface EffectConfigParameterProps {
    parameter: EffectParameter<any>

    onChange: Function
}

function onSubmit(props: EffectConfigParameterProps, prevVal: any, newVal: any) {
    if (prevVal !== newVal) {
        props.onChange(props.parameter, newVal);
    }
}

function renderFieldValue(props: EffectConfigParameterProps, type: string) {
    switch (type) {
        case "boolean":
            return <BooleanEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: boolean) => onSubmit(props, undefined, newValue)}
            />
        case "rgb":
            return <ColorEffectPicker
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, undefined, newValue)}
            />
        case "number":
            return <NumberEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, undefined, newValue)}
            />
        case "target":
            return <TargetEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, undefined, newValue)}
            />
        case "hittype":
            return <HitTypeEffectValue
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, undefined, newValue)}
            />
        case "priority":
            return <PriorityEditor
                parameter={props.parameter}
                onSubmit={(newValue: any) => onSubmit(props, undefined, newValue)}
            />
        default:
            return <div>UNKNOWN TYPE {type}</div>
    }
}

export const EffectConfigParameter: FunctionComponent<EffectConfigParameterProps> = (props: EffectConfigParameterProps) => {
    const type = props.parameter.options.type || "number";
    return <React.Fragment>
        <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
            <div style={parameterLabelStyle}><InputLabel>{props.parameter.paramName}</InputLabel></div>
            {renderFieldValue(props, type)}
        </Box>
    </React.Fragment>
}