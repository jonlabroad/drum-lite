import React, { useEffect, useState } from 'react';
import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import LightControlMainContainer from './containers/LightControlMainContainer';
import SocketIoContainer from './containers/SocketIoContainer';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <React.Fragment>
      <div className="App">
        <SocketIoContainer>
          <LightControlMainContainer/>
        </SocketIoContainer>
      </div>
    </React.Fragment>
  );
}

export default App;
