import { FunctionComponent } from "react"
import React from "react"
import { Button, Page, Col, Row } from "react-onsenui"
import { Grid } from "@material-ui/core"
import { connect } from "react-redux"
import { MainState } from "../types"
import { LightControlMain } from "../components/LightControlMain"
import { handleDrumTrigger } from "../actions"
import { HitType } from "drumlite-js/dist/midi/HitType"

export interface LightControlMainContainerProps {
    connected: boolean

    handleDrumTrigger: any
}

export const LightControlMainContainer: FunctionComponent<LightControlMainContainerProps> = (props: LightControlMainContainerProps) => {
    return (
        <LightControlMain
            disabled={!props.connected}
            onDrumButtonClick={props.handleDrumTrigger}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LightControlMainContainer);