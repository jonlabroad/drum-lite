import { FunctionComponent, useEffect, useRef, useState } from "react"
import React from "react"
import { Button, Page, Col, Row } from "react-onsenui"
import { Grid, Box } from "@material-ui/core"
import { connect } from "react-redux"
import { MainState } from "../types"
import { LightControlMain } from "../components/LightControlMain"
import { handleDrumTrigger, enableLeds } from "../actions"
import { HitType } from "@jonlabroad/drum-lite/dist/midi/HitType"
import { DrumButtons } from "../components/DrumButtons"
import WebsocketContainer from "./WebsocketContainer"
import LightControlMainContainer from "./LightControlMainContainer"
import WebsocketsDriver from "../driver/WebsocketsDriver"
import TronConfig from "@jonlabroad/drum-lite/dist/effects/TronConfig"
import EffectCompiler from "@jonlabroad/drum-lite/dist/effect/EffectCompiler"
import EffectActivator from "@jonlabroad/drum-lite/dist/effect/EffectActivator"
import GlobalConfig from "../config/GlobalConfig"
import EffectRunner from "@jonlabroad/drum-lite/dist/effect/EffectRunner"
import EffectsLibraryContainer from "./EffectsLibraryContainer"
import EffectsConfigEditorContainer from "./EffectsConfigEditorContainer"
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig"

export interface PageContainerProps {
    runLeds: boolean
}

function compileAndRun(config: FullEffectConfig, effectActivator: EffectActivator, runner: EffectRunner) {
    const compiled = new EffectCompiler(config).compile();
    effectActivator.setEffects(compiled);
    runner.run();
}

export const PageContainer: FunctionComponent<PageContainerProps> = (props: PageContainerProps) => {
    const driver = useRef(new WebsocketsDriver());
    const config = useRef(new TronConfig());
    const compiled = useRef(new EffectCompiler(config.current).compile());
    const effectActivator = useRef(new EffectActivator(compiled.current));
    GlobalConfig.effectActivator = effectActivator.current;
    GlobalConfig.config = config.current;
  
    const runner = useRef(new EffectRunner(effectActivator.current, driver.current, {
        periodMillis: 25
    }));
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
        function run() {
            if (!isRunning && props.runLeds) {
                setIsRunning(true);
                compileAndRun(config.current, effectActivator.current, runner.current);
            }
            
            if (isRunning && !props.runLeds) {
                runner.current.stop();
                setIsRunning(false);
            }
        }
        run();
    });

    return (
        <Page>
            <div className="App">
            <WebsocketContainer driver={driver.current}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Box display="flex" flexDirection="column">
                            <LightControlMainContainer/>
                            <EffectsLibraryContainer/>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <EffectsConfigEditorContainer
                            config={config.current}
                        />
                    </Grid>
                </Grid>
            </WebsocketContainer>
            </div>
        </Page>
    )
}

const mapStateToProps = (state: MainState) => {
    return {
        connected: state.data.connected,
        runLeds: state.nav.runLeds
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    handleDrumTrigger: (hitType: HitType) => dispatch(handleDrumTrigger(hitType)),
    enableLeds: (enable: boolean) => dispatch(enableLeds({enable}))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);