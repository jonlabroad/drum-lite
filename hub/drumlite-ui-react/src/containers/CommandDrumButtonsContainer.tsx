import { FunctionComponent, useRef, useEffect } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { handleDrumTrigger, enableLeds, socketConnect } from "../actions"
import { DrumButtons } from "../components/DrumButtons"
import { HitType } from "@jonlabroad/drum-lite/dist/midi/HitType";
import CommandSender from "../util/CommandSender"
import { RunCommand } from "@jonlabroad/drum-lite/dist/util/CommandHandler"
import { CommandDrumButtons } from "../components/CommandDrumButtons"
import GlobalConfig from "../config/GlobalConfig"

export interface CommandDrumButtonsContainerProps {
    connected: boolean
    runLeds: boolean

    handleDrumTrigger: any
    enableLeds: any
    socketConnect: any
}

export const CommandDrumButtonsContainer: FunctionComponent<CommandDrumButtonsContainerProps> = (props: CommandDrumButtonsContainerProps) => {
    //const commandSender = useRef(new CommandSender("ws://localhost:3003"));
    const commandSender = useRef(new CommandSender(
        GlobalConfig.commandMessageHost,
        () => props.socketConnect(true),
        () => props.socketConnect(false)
        ));

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
            disabled={!props.connected}
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
    enableLeds: (enable: boolean) => dispatch(enableLeds({enable})),
    socketConnect: (connected: boolean) => dispatch(socketConnect({connected}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandDrumButtonsContainer);