import { FunctionComponent } from "react"
import React from "react"
import { Page } from "react-onsenui"
import { Grid } from "@material-ui/core"
import DrumButtonsContainer from "../containers/DrumButtonsContainer"

export interface LightControlMainProps {
    disabled: boolean

    onDrumButtonClick: any
    onEnableClick: any
}

export const LightControlMain: FunctionComponent<LightControlMainProps> = (props: LightControlMainProps) => {
    return (
        <Grid container spacing={2}>
            <DrumButtonsContainer />
        </Grid>
    )
}