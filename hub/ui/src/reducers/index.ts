import { Reducer } from "react";
import { MainState } from "../types";
import { RootAction } from "../actions";

export const initialState: MainState = {
    data: {

    },
    nav: {
    }
};

export const trackerReducer: Reducer<MainState, RootAction> = (state = initialState, action) => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
/*
        case API_REQUEST_IN_PROGRESS:
            const newState = { ...state, data: { ...state.data, actionsInProgress: new Set<string>(state.data.actionsInProgress).add(action.key) }}
            return newState;
*/
        default:
            console.log(`Don't know how to process ${action.type}`)
        }
    return state;
}
