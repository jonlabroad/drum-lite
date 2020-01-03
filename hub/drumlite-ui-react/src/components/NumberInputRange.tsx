import { FunctionComponent } from "react"
import React from "react"
import { EffectParameterRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";
import { Slider } from "@material-ui/core";

export interface NumberInputRangeProps {
    value: number
    range: EffectParameterRange

    onChange: any
}

function getSliderValue(props: NumberInputRangeProps) {
    const relative = (props.value - props.range.min)/(props.range.max - props.range.min);
    return relative * 100;
}

function getRealValue(props: NumberInputRangeProps, sliderValue: number) {
    let val = sliderValue/100 * (props.range.max - props.range.min) + props.range.min;
    if (val < 1e-3) {
        val = 0;
    }
    if (val >= props.range.max - 1e-3) {
        val = props.range.max;
    }
    return val;
}

export const NumberInputRange: FunctionComponent<NumberInputRangeProps> = (props: NumberInputRangeProps) => {
    return (
        <Slider
            min={props.range.min}
            max={props.range.max}
            step={props.range.inc}
            value={props.value}
            valueLabelDisplay="auto"
            onChange={(event: any, newValue: any) => {
                props.onChange(newValue)
            }}
        />
    )
}