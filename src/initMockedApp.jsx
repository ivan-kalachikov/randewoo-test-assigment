import initApp from './initApp';
import axiosMock from './mock/index';

const init = async () => {
  axiosMock();
  const App = await initApp();
  return App;
};

export default init;
