import React, { useEffect, useState, useRef } from 'react';
import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import PageContainer from './containers/PageContainer';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <PageContainer />
    </React.Fragment>
  );
}

export default App;
