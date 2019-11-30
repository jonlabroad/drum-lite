import React, { useEffect, useState, useRef } from 'react';
import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import LightControlMainContainer from './containers/LightControlMainContainer';

import TronConfig from "drumlite-js/dist/effects/TronConfig";
import EffectCompiler from "drumlite-js/dist/effect/EffectCompiler";
import EffectActivator from "drumlite-js/dist/effect/EffectActivator";
import MidiMessageHandler from "drumlite-js/dist/midi/MidiMessageHandler";
import EffectRunner from "drumlite-js/dist/effect/EffectRunner";
import WebsocketsDriver from './driver/WebsocketsDriver';
import WebsocketContainer from './containers/WebsocketContainer';
import { HitType } from 'drumlite-js/dist/midi/HitType';
import GlobalConfig from './config/GlobalConfig';
import { TestEffectSelector } from './components/TestEffectSelector';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const driver = useRef(new WebsocketsDriver());
  const config = useRef(new TronConfig());
  const compiled = useRef(new EffectCompiler(config.current).compile());
  const effectActivator = useRef(new EffectActivator(compiled.current));
  GlobalConfig.effectActivator = effectActivator.current;

  const runner = useRef(new EffectRunner(effectActivator.current, driver.current));

  useEffect(() => {
    async function run() {
      await runner.current.run();
    }

    run();
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <WebsocketContainer driver={driver.current}>
          <LightControlMainContainer/>
        </WebsocketContainer>
      </div>
    </React.Fragment>
  );
}

export default App;
