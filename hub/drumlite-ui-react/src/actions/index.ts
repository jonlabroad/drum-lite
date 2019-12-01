import * as constants from '../constants';
import GlobalConfig from '../config/GlobalConfig';
import { MainState } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { HitType } from 'drumlite-js/dist/midi/HitType';

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

export interface EnableLeds {
    type: constants.ENABLE_LEDS;
    enable: boolean;
}
export type EnableLedsAction = EnableLeds;
export function enableLeds(enable: boolean): EnableLeds {
    return {
        type: constants.ENABLE_LEDS,
        enable: enable
    }
};

export function handleDrumTrigger(hitType: HitType): any {
    return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
        const state = getState() as MainState;

        if (GlobalConfig.effectActivator) {
            GlobalConfig.effectActivator.handleNote(hitType);
        }
    }
}

export type RootAction =
TestAction |
SocketConnectAction |
EnableLedsAction
;
