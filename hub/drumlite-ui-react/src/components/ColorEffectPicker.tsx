import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Box, Checkbox, Input } from "@material-ui/core";
import { PhotoshopPicker, ColorResult } from "react-color";
import RGB from "@jonlabroad/drum-lite/dist/light/RGB";

export interface ColorEffectPickerProps {
    val: RGB

    onSubmit: Function
}

const colorIconStyle: CSSProperties = {
    width: "25px",
    height: "25px"
}

export const ColorEffectPicker: FunctionComponent<ColorEffectPickerProps> = (props: ColorEffectPickerProps) => {
    const { val } = props;

    const [currentVal, setCurrentVal] = useState(val);
    const [prevVal, setPrevVal] = useState(val);
    const [isOpen, setIsOpen] = useState(false);

    return <React.Fragment>
        <Box display="flex">
            {isOpen && 
            <PhotoshopPicker
                color={{
                    r: currentVal.r,
                    b: currentVal.b,
                    g: currentVal.g
                }}
                onChange={(color: ColorResult) => {
                    if (color.rgb) {
                        const rgb = new RGB(color.rgb.r, color.rgb.g, color.rgb.b);
                        setCurrentVal(rgb);
                        props.onSubmit(rgb);
                    }
                }}
                onChangeComplete={(color: ColorResult) => {
                    if (color.rgb) {
                        const rgb = new RGB(color.rgb.r, color.rgb.g, color.rgb.b);
                        setCurrentVal(rgb);
                        props.onSubmit(rgb);
                    }
                }}
                onAccept={() => {
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