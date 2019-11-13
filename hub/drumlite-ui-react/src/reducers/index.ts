import { Reducer } from "react";
import { MainState } from "../types";
import { RootAction } from "../actions";
import { SOCKET_CONNECT } from "../constants";

export const initialState: MainState = {
    data: {
        connected: false
    },
    nav: {
    }
};

export const mainReducer: Reducer<MainState, RootAction> = (state = initialState, action): MainState => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
/*
        case API_REQUEST_IN_PROGRESS:
            const newState = { ...state, data: { ...state.data, actionsInProgress: new Set<string>(state.data.actionsInProgress).add(action.key) }}
            return newState;
*/
        case SOCKET_CONNECT:
            const newState = { ...state, data: { ...state.data, connected: action.connected } };
            return newState;
        default:
            console.log(`Don't know how to process ${action.type}`)
        }
    return state;
}
