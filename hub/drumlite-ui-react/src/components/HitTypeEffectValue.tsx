import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Box, Checkbox, Input, Typography, Icon, InputLabel } from "@material-ui/core";
import { HitTypeString, HitType } from "@jonlabroad/drum-lite/dist/midi/HitType";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

export interface HitTypeEffectValueProps {
    parameter: EffectParameter<any>

    onSubmit: Function
}

export const HitTypeEffectValue: FunctionComponent<HitTypeEffectValueProps> = (props: HitTypeEffectValueProps) => {
    const val: HitType[] = props.parameter.options.isArray ? props.parameter.val : [props.parameter.val];

    const [currentVal, setCurrentVal] = useState(val);
    const [collapsed, setCollapsed] = useState(true);

    if (collapsed) {
        return <div onClick={() => setCollapsed(!collapsed)}><ExpandLess/></div>
    }

    return <React.Fragment>
        <InputLabel onClick={() => setCollapsed(!collapsed)}><ExpandMore /></InputLabel>
        <Box display="flex" flexDirection="column">
            {Object.keys(HitTypeString).filter(k => k !== '0').map((hitTypeStr: string) => {
                const hitType: HitType = parseInt(hitTypeStr);
                return <React.Fragment>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <div>
                            <Typography>{HitTypeString[hitType]}</Typography>
                        </div>
                        <Checkbox
                            checked={currentVal.includes(hitType)}
                            onChange={() => {
                                const valSet = new Set<HitType>(currentVal);
                                if (valSet.has(hitType)) {
                                    valSet.delete(hitType);
                                } else {
                                    valSet.add(hitType);
                                }
                                const newVal = [...valSet.keys()];
                                setCurrentVal(newVal);
                                props.onSubmit(newVal);
                            }}
                        />
                    </Box>
                </React.Fragment>
            })}
        </Box>
    </React.Fragment>
}