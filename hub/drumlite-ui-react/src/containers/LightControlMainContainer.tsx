import { FunctionComponent } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { LightControlMain } from "../components/LightControlMain"
import { handleDrumTrigger, enableLeds } from "../actions"
import { HitType } from "@jonlabroad/drum-lite/dist/midi/HitType"

export interface LightControlMainContainerProps {
    connected: boolean

    handleDrumTrigger: any
    enableLeds: any
}

export const LightControlMainContainer: FunctionComponent<LightControlMainContainerProps> = (props: LightControlMainContainerProps) => {
    return (
        <LightControlMain
            disabled={!props.connected}
            onDrumButtonClick={props.handleDrumTrigger}
            onEnableClick={props.enableLeds}
        />
    )
}

const mapStateToProps = (state: MainState) => {
    return {
        connected: state.data.connected
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    handleDrumTrigger: (hitType: HitType) => dispatch(handleDrumTrigger(hitType)),
    enableLeds: (enable: boolean) => dispatch(enableLeds({enable}))
});

export default connect(mapStateToProps, mapDispatchToProps)(LightControlMainContainer);