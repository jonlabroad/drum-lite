import { FunctionComponent } from "react"
import { Range } from "react-onsenui"
import React from "react"
import { EffectParameterRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";

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
    console.log(val);
    return val;
}

export const NumberInputRange: FunctionComponent<NumberInputRangeProps> = (props: NumberInputRangeProps) => {
    return (
        <Range
            modifier="material"
            value={getSliderValue(props)}
            onChange={(event: any) => props.onChange(getRealValue(props, parseFloat(event.target.value)))}
        />
    )
}