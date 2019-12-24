import { FunctionComponent } from "react"
import React from "react"
import { Grid, Box } from "@material-ui/core"
import { CSSProperties } from "@material-ui/styles";
import { EffectParameter, EffectParameters } from "drumlite-js/dist/light/effect/PartialEffect";
import { Add } from "@material-ui/icons";
import EffectUtil from "../util/EffectUtil";
import { List, ListHeader, ListItem } from "react-onsenui";
import Helmet from "react-helmet";

export interface EffectsLibraryProps {
}

const effectsLibraryStyle: CSSProperties = {
    margin: 10,
    height: 50,
    width: 100
};

function renderEffect(param: EffectParameters) {
    return (
        <div>{param.effectName}</div>
    );
}

function renderEffectCategory(type: string) {
    const effects = EffectUtil.getEffectsOfType(type);
    
    return (
        <List dataSource={effects}
            renderHeader={() => <ListHeader>{type}</ListHeader>}
            renderRow={(effect: EffectParameters) => <ListItem>
            <Box display="flex" flexDirection="row">
                <div>{effect.effectName}</div>
                <Add fontSize="small"></Add>
            </Box>
        </ListItem>}
        />
/*
        <Box display="flex" flexDirection="column">
            <h4>{type}</h4>
            {effects.map(renderEffect)}
        </Box>
*/
    );
}

function renderAllEffects() {
    const categories = EffectUtil.getAllEffectTypes();
    console.log({categories});
    return categories.map(renderEffectCategory);
}

export const EffectsLibrary: FunctionComponent<EffectsLibraryProps> = (props: EffectsLibraryProps) => {
    return (
        <React.Fragment>
        <Box display="flex" flexDirection="column" justifyContent="center">
            {renderAllEffects()}
        </Box>
        </React.Fragment>
    )
}