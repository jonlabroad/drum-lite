import { FunctionComponent } from "react"
import React from "react"
import { Grid, Box } from "@material-ui/core"
import DrumButtonsContainer from "../containers/DrumButtonsContainer"
import CommandDrumButtonsContainer from "../containers/CommandDrumButtonsContainer"

export interface LightControlMainProps {
    disabled: boolean
    editorMode: boolean

    onDrumButtonClick: any
    onEnableClick: any
}

export const LightControlMain: FunctionComponent<LightControlMainProps> = (props: LightControlMainProps) => {
    return (
        <Box style={{marginTop: "10px"}} flexDirection={"column"} justifyContent={"center"}>
            {props.editorMode && <DrumButtonsContainer />}
            {!props.editorMode && <CommandDrumButtonsContainer />}
        </Box>
    )
}