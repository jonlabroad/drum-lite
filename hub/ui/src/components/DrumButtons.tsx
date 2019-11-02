import { FunctionComponent } from "react"
import React from "react"
import { Button, Page } from "react-onsenui"
import { Grid } from "@material-ui/core"

export interface DrumButtonsProps {
    
}

export const DrumButtons: FunctionComponent<DrumButtonsProps> = (props: DrumButtonsProps) => {
    return (
        <Page>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button modifier="cta">Tom 1</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button modifier="cta">Tom 2</Button>
                </Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={1}>
                    <Button modifier="cta">Snare</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button modifier="cta">Tom 3</Button>
                </Grid>
                <Grid item xs={10}></Grid>
            </Grid>
        </Page>
    )
}