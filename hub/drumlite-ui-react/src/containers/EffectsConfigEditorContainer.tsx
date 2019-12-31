import { FunctionComponent } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { EffectsConfigEditor } from "../components/EffectConfigEditor"
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig"
import { configurationChanged } from "../actions"

export interface EffectsConfigEditorContainerProps {
    config: FullEffectConfig // TODO move to state

    configChanged: any
}

export const EffectsLibraryContainer: FunctionComponent<EffectsConfigEditorContainerProps> = (props: EffectsConfigEditorContainerProps) => {
    return (
        <EffectsConfigEditor
            config={props.config}
            configChanged={props.configChanged}
        />
    )
}

const mapStateToProps = (state: MainState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    configChanged: (config: FullEffectConfig) => dispatch(configurationChanged({config}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EffectsLibraryContainer);