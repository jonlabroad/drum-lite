import { FunctionComponent, useState, CSSProperties } from "react"
import React from "react"
import { EffectParameter, ParameterType, defaultAmplitudeRange } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Box, Checkbox, Input, Typography } from "@material-ui/core";
import { EffectTarget } from "@jonlabroad/drum-lite/dist/light/effect/EffectTarget";

export interface TargetEffectValueProps {
    parameter: EffectParameter<any>

    onSubmit: Function
}

const allTargets = [
    EffectTarget.SNARE,
    EffectTarget.TOM1,
    EffectTarget.TOM2,
    EffectTarget.TOM3
]

export const TargetEffectValue: FunctionComponent<TargetEffectValueProps> = (props: TargetEffectValueProps) => {
    const val = props.parameter.options.isArray ? props.parameter.val : [props.parameter.val];

    const [currentVal, setCurrentVal] = useState(val);
    return <React.Fragment>
        {allTargets.map(target => {
            return <React.Fragment>
                <div>
                    <Typography>{target.toString()}</Typography>
                </div>
                <Checkbox
                    checked={currentVal.includes(target)}
                    onChange={() => {
                        const valSet = new Set<EffectTarget>(currentVal);
                        if (valSet.has(target)) {
                            valSet.delete(target);
                        } else {
                            valSet.add(target);
                        }
                        const newVal = [...valSet.keys()];
                        setCurrentVal(newVal);
                        props.onSubmit(newVal);
                    }}
                />
            </React.Fragment>
        })}
    </React.Fragment>
}