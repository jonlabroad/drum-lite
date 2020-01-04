import { FunctionComponent, useState } from "react"
import React from "react"
import { Box, List, Typography } from "@material-ui/core"
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig"
import { CSSProperties } from "@material-ui/styles"
import EffectConfigParameterContainer from "../containers/EffectConfigParameterContainer"
import EffectConfig from "@jonlabroad/drum-lite/dist/effects/EffectConfig"
import { EffectParameters } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect"
import { EffectHeader } from "./EffectHeader"
import { EffectEditor } from "./EffectEditor"

export interface EffectsConfigEditorProps {
    config: FullEffectConfig

    configChanged: any
}

const paramStyle: CSSProperties = {
    marginBottom: "10px"
}

function renderEffects(config: FullEffectConfig): (JSX.Element | null)[] {
    return config.effects.map(effect => <EffectEditor
        config={config}
        effect={effect}
        level={0}
    />);
}

export const EffectsConfigEditor: FunctionComponent<EffectsConfigEditorProps> = (props: EffectsConfigEditorProps) => {
    return (
        <React.Fragment>
        <Box display="flex" flexDirection="column" justifyContent="center">
            {renderEffects(props.config)}
        </Box>
        </React.Fragment>
    )
}