import { FunctionComponent } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { EffectsLibrary } from "../components/EffectsLibrary"
import { EffectsConfigEditor } from "../components/EffectConfigEditor"
import TronConfig from "drumlite-js/dist/effects/TronConfig"

export interface EffectsConfigEditorContainerProps {
}

export const EffectsLibraryContainer: FunctionComponent<EffectsConfigEditorContainerProps> = (props: EffectsConfigEditorContainerProps) => {
    return (
        <EffectsConfigEditor
            config={new TronConfig()}
        />
    )
}

const mapStateToProps = (state: MainState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EffectsLibraryContainer);