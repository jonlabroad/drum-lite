import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Box, Checkbox, Input } from "@material-ui/core";
import { PhotoshopPicker, ColorResult } from "react-color";
import RGB from "@jonlabroad/drum-lite/dist/light/RGB";

export interface BooleanEffectValueProps {
    parameter: EffectParameter<any>

    onSubmit: Function
}

const colorIconStyle: CSSProperties = {
    width: "25px",
    height: "25px"
}

export const BooleanEffectValue: FunctionComponent<BooleanEffectValueProps> = (props: BooleanEffectValueProps) => {
    const val = props.parameter.val;

    const [currentVal, setCurrentVal] = useState(val);
    return <React.Fragment>
            <Checkbox
                checked={currentVal}
                onChange={(event) => {
                    setCurrentVal(!currentVal);
                    props.onSubmit(!currentVal);
                }}
            />
    </React.Fragment>
}