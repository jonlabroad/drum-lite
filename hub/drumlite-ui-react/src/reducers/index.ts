import { Reducer } from "react";
import { MainState } from "../types";
import { socketConnect, SocketConnect, EnableLeds, enableLeds } from "../actions";
import { createReducer, Actions, Action, PayloadAction } from "@reduxjs/toolkit";

export const initialState: MainState = {
    data: {
        connected: false
    },
    nav: {
        runLeds: false
    }
};

export const mainReducer: Reducer<MainState, any> = createReducer(initialState, {
    [socketConnect.type]: (state: MainState, action: PayloadAction<SocketConnect>) => {
        console.log(action);
        const newState = { ...state, data: { ...state.data, connected: action.payload.connected } };
        return newState;
    },
    [enableLeds.type]: (state: MainState, action: PayloadAction<EnableLeds>) => {
        const newState = { ...state, nav: { ...state.nav, runLeds: action.payload.enable } };
        return newState;
    }
});
