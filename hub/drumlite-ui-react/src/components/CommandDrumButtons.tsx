import { FunctionComponent } from "react"
import React from "react"
import { Box, Button } from "@material-ui/core"
import { CSSProperties } from "@material-ui/styles";

export interface CommandDrumButtonsProps {
    disabled: boolean
    onRunClick: () => void
    onStopClick: () => void
    onTriggerClick: (note: number) => void
}

const drumButtonStyle: CSSProperties = {
    marginRight: 10,
    marginBottom: 10,
    height: 50,
    width: 100
};

export const CommandDrumButtons: FunctionComponent<CommandDrumButtonsProps> = (props: CommandDrumButtonsProps) => {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center">
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Button variant="contained" color={"primary"} style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onRunClick()}>Run</Button>
                <Button variant="contained" color={"primary"} style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onStopClick()}>Stop</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button variant="contained" color="primary" style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onTriggerClick(55)}>Crash 1</Button>
                <Button variant="contained" color="primary" style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onTriggerClick(52)}>Crash 2</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button variant="contained" color="primary" style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onTriggerClick(48)}>Tom 1</Button>
                <Button variant="contained" color="primary" style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onTriggerClick(45)}>Tom 2</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button variant="contained" color="primary" style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onTriggerClick(38)}>Snare</Button>
                <Button variant="contained" color="primary" style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onTriggerClick(43)}>Tom 3</Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button variant="contained" color="primary" style={drumButtonStyle} disabled={props.disabled} onClick={() => props.onTriggerClick(36)}>Kick</Button>
            </Box>

        </Box>
    )
}