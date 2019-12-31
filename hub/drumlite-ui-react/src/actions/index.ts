import * as constants from '../constants';
import GlobalConfig from '../config/GlobalConfig';
import { MainState } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { createAction } from '@reduxjs/toolkit';
import { HitType } from '@jonlabroad/drum-lite/dist/midi/HitType';
import FullEffectConfig from '@jonlabroad/drum-lite/dist/effects/FullEffectConfig';
import EffectCompiler from '@jonlabroad/drum-lite/dist/effect/EffectCompiler';

export interface SocketConnect {
    connected: boolean;
}
export const socketConnect = createAction<SocketConnect>('SOCKET_CONNECT');


export interface EnableLeds {
    enable: boolean;
}
export const enableLeds = createAction<EnableLeds>("ENABLE_LEDS");

export interface ConfigurationChanged {
    config?: FullEffectConfig;
}
export function configurationChanged(params: ConfigurationChanged): any {
    return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
        const state = getState() as MainState;
        if (GlobalConfig.effectActivator && GlobalConfig.config) {
            GlobalConfig.config.init();
            GlobalConfig.effectActivator.setEffects(new EffectCompiler(GlobalConfig.config).compile());
        }
    }
}

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
    EnableLeds |
    ConfigurationChanged;