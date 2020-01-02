import { FunctionComponent } from "react"
import React from "react"
import { Button } from "react-onsenui"
import { Box } from "@material-ui/core"
import { CSSProperties } from "@material-ui/styles";

export interface DrumButtonsProps {
    disabled: boolean
    ledsRunning: boolean

    onClick: any
    onRunLedsClick: any
}

const drumButtonStyle: CSSProperties = {
    margin: 10,
    height: 50,
    width: 100
};

export const DrumButtons: FunctionComponent<DrumButtonsProps> = (props: DrumButtonsProps) => {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center">
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onRunLedsClick(!props.ledsRunning)}>{props.ledsRunning ? 'Stop' : 'Run'}</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onClick(55)}>Crash 1</Button>
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onClick(52)}>Crash 2</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onClick(48)}>Tom 1</Button>
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onClick(45)}>Tom 2</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onClick(38)}>Snare</Button>
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onClick(43)}>Tom 3</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button style={drumButtonStyle} modifier="cta" disabled={props.disabled} onClick={() => props.onClick(36)}>Kick</Button>
            </Box>

        </Box>
    )
}