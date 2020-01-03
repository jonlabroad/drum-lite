import { FunctionComponent } from "react"
import React from "react"
import { Grid, Button } from "@material-ui/core"

export interface DrumButtonsProps {
    disabled: boolean

    onClick: any
}

export const DrumButtons: FunctionComponent<DrumButtonsProps> = (props: DrumButtonsProps) => {
    return (
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button disabled={props.disabled} onClick={() => props.onClick(48)}>Tom 1</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button disabled={props.disabled} onClick={() => props.onClick(45)}>Tom 2</Button>
                </Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={1}>
                    <Button disabled={props.disabled} onClick={() => props.onClick(38)}>Snare</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button disabled={props.disabled} onClick={() => props.onClick(43)}>Tom 3</Button>
                </Grid>
            </Grid>
    )
}