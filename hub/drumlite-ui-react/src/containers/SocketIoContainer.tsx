import { FunctionComponent, ReactNode, useEffect } from "react"
import React from "react"
import { Button, Page, Col, Row } from "react-onsenui"
import { Grid } from "@material-ui/core"
import { connect } from "react-redux"
import { MainState } from "../types"
import { LightControlMain } from "../components/LightControlMain"
import { handleDrumTrigger, socketConnect } from "../actions"
import GlobalConfig from "../config/GlobalConfig"

export interface SocketIoContainerProps {
    children: ReactNode
    
    connected: boolean

    socketConnect: any
}

export const SocketIoContainer: FunctionComponent<SocketIoContainerProps> = (props: SocketIoContainerProps) => {
    useEffect(() => {
        const sio = GlobalConfig.socket;
        sio.on('connect', function() {
            props.socketConnect(true);
        });
        sio.on('disconnect', function() {
            props.socketConnect(false);
        })
    }, []);

    return (
        <div>
            {props.children}
        </div>
    )
}

const mapStateToProps = (state: MainState) => {
    return {
        connected: state.data.connected
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    socketConnect: (connected: boolean) => dispatch(socketConnect(connected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketIoContainer);