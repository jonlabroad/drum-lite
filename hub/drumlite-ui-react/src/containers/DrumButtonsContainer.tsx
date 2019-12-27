import { FunctionComponent } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { handleDrumTrigger, enableLeds } from "../actions"
import { DrumButtons } from "../components/DrumButtons"
import { HitType } from "@jonlabroad/drum-lite/dist/midi/HitType";

export interface DrumButtonsContainerProps {
    connected: boolean
    runLeds: boolean

    handleDrumTrigger: any
    enableLeds: any
    
}

export const DrumButtonsContainer: FunctionComponent<DrumButtonsContainerProps> = (props: DrumButtonsContainerProps) => {
    return (
        <DrumButtons
            ledsRunning={props.runLeds}
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