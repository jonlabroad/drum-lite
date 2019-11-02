import React from 'react';
import './App.css';
import { LightControlMain } from './components/LightControlMain';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <div className="App">
        <LightControlMain/>
      </div>
    </React.Fragment>
  );
}

export default App;
