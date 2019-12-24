import * as constants from '../constants';
import GlobalConfig from '../config/GlobalConfig';
import { MainState } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { HitType } from 'drumlite-js/dist/midi/HitType';
import { createAction, Actions } from '@reduxjs/toolkit';

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
    connected: boolean;
}
export const socketConnect = createAction<SocketConnect>('SOCKET_CONNECT');


export interface EnableLeds {
    enable: boolean;
}
export const enableLeds = createAction<EnableLeds>("ENABLE_LEDS");

export function handleDrumTrigger(hitType: HitType): any {
    return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
        const state = getState() as MainState;

        if (GlobalConfig.effectActivator) {
            GlobalConfig.effectActivator.handleNote(hitType);
        }
    }
}

export type MainActions = 
    SocketConnect |
    EnableLeds;