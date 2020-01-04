import { FunctionComponent, CSSProperties } from "react"
import React from "react"
import { EffectParameterRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";
import { Slider } from "@material-ui/core";

export interface NumberInputRangeProps {
    value: number
    range: EffectParameterRange

    onChange: any
}

const sliderStyle: CSSProperties = {
    width: "140px"
}

export const NumberInputRange: FunctionComponent<NumberInputRangeProps> = (props: NumberInputRangeProps) => {
    return (
        <Slider
            style={sliderStyle}
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