import { FunctionComponent, CSSProperties } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { EffectsLibrary } from "../components/EffectsLibrary"
import { EffectConfigParameter } from "../components/EffectConfigParameter"
import { EffectParameter } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import ParameterHelpers from "../util/ParameterHelpers"
import { configurationChanged } from "../actions"

export interface EffectConfigParameterContainerProps {
    parameter: EffectParameter<any>

    configChanged: any
}

const style: CSSProperties = {
    //marginTop: "5px",
    //marginBottom: "5px"
}

function onChange(parameter: EffectParameter<any>, val: any) {
    ParameterHelpers.setValue(parameter, val);
    
}

export const EffectConfigParameterContainer: FunctionComponent<EffectConfigParameterContainerProps> = (props: EffectConfigParameterContainerProps) => {
    return (
        <div style={style}>
            <EffectConfigParameter
                parameter={props.parameter}

                onChange={(parameter: EffectParameter<any>, val: any) => {
                    onChange(parameter, val);
                    props.configChanged();
                }}
            />
        </div>
    )
}

const mapStateToProps = (state: MainState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    configChanged: () => dispatch(configurationChanged({}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EffectConfigParameterContainer);