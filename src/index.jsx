import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import initApp from './initMockedApp';

const init = async () => {
  ReactDOM.render(
    <React.StrictMode>
      {await initApp()}
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

init();
