import { FunctionComponent, CSSProperties } from "react"
import React from "react"
import { connect } from "react-redux"
import { MainState } from "../types"
import { EffectsLibrary } from "../components/EffectsLibrary"
import { EffectConfigParameter } from "../components/EffectConfigParameter"
import { EffectParameter } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"

export interface EffectConfigParameterContainerProps {
    parameter: EffectParameter<any>
}

const style: CSSProperties = {
    marginTop: "20px",
    marginBottom: "25px"
}

function onChange(val: any) {
    // TODO? Change config value. Done here or up a level?
}

export const EffectConfigParameterContainer: FunctionComponent<EffectConfigParameterContainerProps> = (props: EffectConfigParameterContainerProps) => {
    return (
        <div style={style}>
            <EffectConfigParameter
                parameter={props.parameter}

                onChange={onChange}
            />
        </div>
    )
}

const mapStateToProps = (state: MainState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EffectConfigParameterContainer);