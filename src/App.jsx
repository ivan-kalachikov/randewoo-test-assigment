import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer from './slices';
import Main from './components/Main';
import axiosMock from './mock/index';

import './App.scss';

const store = configureStore({
  reducer: rootReducer,
});

axiosMock();

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
