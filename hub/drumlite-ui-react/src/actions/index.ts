import * as constants from '../constants';
import GlobalConfig from '../config/GlobalConfig';
import { MainState } from '../types';
import { ThunkDispatch } from 'redux-thunk';

export interface Test {
    type: constants.TEST;
}
export type TestAction = Test;
export function test(): Test {
    return {
        type: constants.TEST
    }
};

export interface SocketConnect {
    type: constants.SOCKET_CONNECT;
    connected: boolean;
}
export type SocketConnectAction = SocketConnect;
export function socketConnect(connected: boolean): SocketConnect {
    return {
        type: constants.SOCKET_CONNECT,
        connected: connected
    }
};

export function handleDrumTrigger(note: number): any {
    return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
        const state = getState() as MainState;

        GlobalConfig.socket.emit("trigger_note", JSON.stringify({
            note: note,
            velocity: 100
          }));
    }
}

export type RootAction =
TestAction |
SocketConnectAction
;
