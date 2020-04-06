import { FunctionComponent, useRef, useEffect } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { handleDrumTrigger, enableLeds } from "../actions"
import { DrumButtons } from "../components/DrumButtons"
import { HitType } from "@jonlabroad/drum-lite/dist/midi/HitType";
import CommandSender from "../util/CommandSender"
import { RunCommand } from "@jonlabroad/drum-lite/dist/util/CommandHandler"
import { CommandDrumButtons } from "../components/CommandDrumButtons"

export interface CommandDrumButtonsContainerProps {
    connected: boolean
    runLeds: boolean

    handleDrumTrigger: any
    enableLeds: any
    
}

export const CommandDrumButtonsContainer: FunctionComponent<CommandDrumButtonsContainerProps> = (props: CommandDrumButtonsContainerProps) => {
    //const commandSender = useRef(new CommandSender("ws://localhost:3003"));
    const commandSender = useRef(new CommandSender("ws://10.0.0.27:3003"));

    useEffect(() => {
        commandSender.current.connect();
    }, [])

    function runLeds() {
        commandSender.current.send(new RunCommand("RUN"));
    }

    function stopLeds() {
        commandSender.current.send(new RunCommand("STOP"));
    }

    return (
        <CommandDrumButtons
            onRunClick={runLeds}
            onStopClick={stopLeds}
            onTriggerClick={(note: number) => console.log(note)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CommandDrumButtonsContainer);