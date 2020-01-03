import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Box, Checkbox, Input } from "@material-ui/core";
import { PhotoshopPicker, ColorResult } from "react-color";
import RGB from "@jonlabroad/drum-lite/dist/light/RGB";

export interface ColorEffectPickerProps {
    parameter: EffectParameter<any>

    onSubmit: Function
}

const colorIconStyle: CSSProperties = {
    width: "25px",
    height: "25px"
}

export const ColorEffectPicker: FunctionComponent<ColorEffectPickerProps> = (props: ColorEffectPickerProps) => {
    const val = props.parameter.val;

    const [currentVal, setCurrentVal] = useState(val);
    const [prevVal, setPrevVal] = useState(val);
    const [isOpen, setIsOpen] = useState(false);

    const type = props.parameter.options.type || "number";
    return <React.Fragment>
        <Box display="flex">
            {isOpen && 
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
                        props.onSubmit(rgb);
                    }
                }}
                onChangeComplete={(color: ColorResult) => {
                    if (color.rgb) {
                        const rgb = new RGB(color.rgb.r, color.rgb.b, color.rgb.g);
                        setCurrentVal(rgb);
                        props.onSubmit(rgb);
                    }
                }}
                onAccept={(color: ColorResult) => {
                    setPrevVal(currentVal);
                    setIsOpen(false);
                }}
                onCancel={() => {
                    setCurrentVal(prevVal);
                    props.onSubmit(prevVal);
                    setIsOpen(false);
                }}
            />
        }
        {!isOpen && 
            <div style={{...colorIconStyle, backgroundColor: `rgba(${currentVal.r},${currentVal.g},${currentVal.b},1)`}} onClick={() => setIsOpen(!isOpen)}></div>
        }
    </Box>
    </React.Fragment>
}