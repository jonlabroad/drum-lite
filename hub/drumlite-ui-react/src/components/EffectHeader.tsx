import React, { CSSProperties, FunctionComponent } from "react";
import { EffectParameter, ParameterType, defaultAmplitudeRange, EffectParameters } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { Box, Checkbox, Input, Typography } from "@material-ui/core";
import { EffectTarget } from "@jonlabroad/drum-lite/dist/light/effect/EffectTarget";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import RGB from "@jonlabroad/drum-lite/dist/light/RGB";
import { HitType, HitTypeString } from "@jonlabroad/drum-lite/dist/midi/HitType";


export interface EffectHeaderProps {
    name: string
    params: EffectParameters

    expanded: boolean
    onExpand: Function
}

const column1Style: CSSProperties = {
    width: "20%"
}

const column2Style: CSSProperties = {
    width: "35%"
}

const column3Style: CSSProperties = {
    width: "40%"
}

const column4Style: CSSProperties = {
    width: "5%"
}

const effectNameStyle: CSSProperties = {
    margin: "10px"
}

const colorIconStyle: CSSProperties = {
    width: "20px",
    height: "20px",
    marginRight: "5px"
}

const triggerStyle: CSSProperties = {
    fontSize: "10px",
    marginRight: "7px"
}

function renderColor(rgb: RGB) {
    return <div style={{...colorIconStyle, backgroundColor: `rgba(${rgb.r},${rgb.g},${rgb.b},1)`}}></div>
}

function renderTriggers(params: EffectParameters) {
    const triggers = params.params.triggers || [];
    return <Box style={{...column2Style}} display="flex" flexDirection="row" alignItems="center">
        {triggers.val.map((trigger: HitType) => {
            return <Typography style={triggerStyle} variant="overline">{HitTypeString[trigger]}</Typography>
        })}
    </Box>
}

function renderExpandable(props: EffectHeaderProps) {
    return <Box style={{...column4Style}} display="flex" onClick={() => props.onExpand(!props.expanded)} >
        {props.expanded ? <ExpandMore/> : <ExpandLess/>}
    </Box>
}

export const EffectHeader: FunctionComponent<EffectHeaderProps> = (props: EffectHeaderProps) => {
    const { params } = props;

    return <React.Fragment>
        <Box display="flex" style={effectNameStyle} flexDirection="row" justifyContent="space-between" alignContent="center">
            <Typography style={{...column1Style}} variant="body1">{props.name}</Typography>
            {params.params.isAmbient.val ? <Typography style={{...column2Style}} variant="overline">Ambient</Typography> : renderTriggers(params)}
            <Box style={{...column3Style}} display="flex" flexDirection="row" alignItems="center">
                {Object.keys(params.params).filter(k => params.params[k].options.type === "rgb" && !params.params[k].options.isArray).map(colorParamKey => {
                return renderColor(params.params[colorParamKey].val);
            })}
            </Box>
            {renderExpandable(props)}
        </Box>
    </React.Fragment>
}