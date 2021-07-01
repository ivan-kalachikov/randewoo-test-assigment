import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createObjectsMock from './objects';
import createMovementsMock from './movements';

const mock = new MockAdapter(axios);

const mockAxiosRequests = () => {
  createObjectsMock(mock);
  createMovementsMock(mock);
};

export default mockAxiosRequests;
