import { FunctionComponent } from "react"
import React from "react"
import { Button, Page, Col, Row } from "react-onsenui"
import { Grid } from "@material-ui/core"
import { connect } from "react-redux"
import { MainState } from "../types"
import { LightControlMain } from "../components/LightControlMain"
import { handleDrumTrigger, enableLeds } from "../actions"
import { HitType } from "drumlite-js/dist/midi/HitType"
import { DrumButtons } from "../components/DrumButtons"

export interface DrumButtonsContainerProps {
    connected: boolean
    runLeds: boolean

    handleDrumTrigger: any
    enableLeds: any
    
}

export const DrumButtonsContainer: FunctionComponent<DrumButtonsContainerProps> = (props: DrumButtonsContainerProps) => {
    return (
        <DrumButtons
            onClick={props.handleDrumTrigger}
            onRunLedsClick={props.enableLeds}
            disabled={!props.connected}
        />
    )
}

const mapStateToProps = (state: MainState) => {
    return {
        connected: state.data.connected,
        runLeds: state.nav.runLeds
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    handleDrumTrigger: (hitType: HitType) => dispatch(handleDrumTrigger(hitType)),
    enableLeds: (enable: boolean) => dispatch(enableLeds({enable}))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrumButtonsContainer);