import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Input, Box, TextField, Select, MenuItem } from "@material-ui/core";
import { NumberInputRange } from "./NumberInputRange";
import { EffectPriorityString } from "@jonlabroad/drum-lite/dist/light/effect/EffectPriority"

export interface PriorityEditorProps {
    parameter: EffectParameter<any>

    onSubmit: Function
}

const inputStyle: CSSProperties = {
    width: "100px",
    marginRight: "20px"
}

export const PriorityEditor: FunctionComponent<PriorityEditorProps> = (props: PriorityEditorProps) => {
    const val = props.parameter.val;
    const [currentVal, setCurrentVal] = useState(val);

    return <React.Fragment>
        <Box display="flex" flexDirection="row">
            <Select
                value={currentVal}
                onChange={(event) => {
                    setCurrentVal(event.target.value);
                    props.onSubmit(event.target.value);
                }}
            >
                {Object.keys(EffectPriorityString).map(priorityString => <MenuItem value={parseInt(priorityString)}>{EffectPriorityString[parseInt(priorityString)]}</MenuItem>)}
            </Select>
        </Box>
        </React.Fragment>
}