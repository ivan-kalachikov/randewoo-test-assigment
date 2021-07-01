import { MIN_MOVEMENT_DELAY, MAX_MOVEMENT_DELAY } from '../constants';

const data = [{
  timestamp: Date.now(),
  coordinates: {
    latitude: 55.7537583,
    longitude: 37.6198118,
  },
}];

const genNewCoordinate = (key) => {
  const lastCoordinate = data[data.length - 1].coordinates[key];
  const getRandomOperation = () => (Math.floor(Math.random() * 2) === 0 ? '-' : '+');
  const getRandomStep = () => parseFloat(((Math.random() * 9) * 0.0001).toFixed(7));
  const newCoordinate = getRandomOperation() === '-'
    ? lastCoordinate - getRandomStep()
    : lastCoordinate + getRandomStep();
  return newCoordinate;
};

const genRequestDelay = () => MIN_MOVEMENT_DELAY
      + (Math.random() * MAX_MOVEMENT_DELAY - MIN_MOVEMENT_DELAY);

const genData = () => {
  data.push({
    timestamp: Date.now(),
    coordinates: {
      latitude: genNewCoordinate('latitude'),
      longitude: genNewCoordinate('longitude'),
    },
  });
  return data;
};

const createObjectsMock = (mock) => {
  mock
    .onGet('/api/v1/objects/1/movements')
    .reply(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, genData()]);
      }, genRequestDelay());
    }));
};
export default createObjectsMock;
