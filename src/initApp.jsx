import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './slices';
import initI18n from './locales/i18n';

import App from './App';

const initApp = async () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  await initI18n();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default initApp;
