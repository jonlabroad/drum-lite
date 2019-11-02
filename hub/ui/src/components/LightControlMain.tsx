import { FunctionComponent } from "react"
import React from "react"
import { Button, Page, Col, Row } from "react-onsenui"
import { Grid } from "@material-ui/core"
import { DrumButtons } from "./DrumButtons"

export interface LightControlMainProps {
    
}

export const LightControlMain: FunctionComponent<LightControlMainProps> = (props: LightControlMainProps) => {
    return (
        <Page>
            <Grid container spacing={2}>
                <DrumButtons/>
            </Grid>
        </Page>
    )
}