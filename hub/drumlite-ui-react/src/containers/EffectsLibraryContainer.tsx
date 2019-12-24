import { FunctionComponent } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { EffectsLibrary } from "../components/EffectsLibrary"

export interface EffectsLibraryContainerProps {
}

export const EffectsLibraryContainer: FunctionComponent<EffectsLibraryContainerProps> = (props: EffectsLibraryContainerProps) => {
    return (
        <EffectsLibrary
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