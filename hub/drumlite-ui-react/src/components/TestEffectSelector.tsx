import { FunctionComponent } from "react";
import React from "react";
import PartialEffect, { EffectParameters } from "drumlite-js/dist/light/effect/PartialEffect";
import ConstantAmplitude, { ConstantAmplitudeParams } from "drumlite-js/dist/light/effect/amplitude/ConstantAmplitude";
import { Box } from "@material-ui/core";


export interface TestEffectSelectorProps {

}

function renderParams(effect: PartialEffect<any>): JSX.Element[] {
    const rendered: JSX.Element[] = [];
    console.log(effect);
    console.log(effect.params);
    for (let prop in effect.params) {
        console.log(prop);
        rendered.push(
            <Box display="flex" flexDirection="row">
                <div>{`${effect.params[prop].paramName}`}</div>
                <div>{`${effect.params[prop].type}`}</div>
            </Box>
        );
    }
    return rendered;
}

function renderEffect(effect: PartialEffect<any>): JSX.Element {
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column">
                <div><b>{effect.typeName}</b></div>
                {renderParams(effect)}
            </Box>
        </React.Fragment>
    )
}

export const TestEffectSelector: FunctionComponent<TestEffectSelectorProps> = (props: TestEffectSelectorProps) => {
    return (
        <React.Fragment>
            {renderEffect(new ConstantAmplitude(new ConstantAmplitudeParams()))}
        </React.Fragment>
    );
}