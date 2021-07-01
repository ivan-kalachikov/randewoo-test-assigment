import { combineReducers } from '@reduxjs/toolkit';
import objectsReducers, { actions as objectsActions, getObjects } from './objects';
import movementsReducer, { actions as movementsActions, getMovements } from './movements';

export default combineReducers({
  objects: objectsReducers,
  movements: movementsReducer,
});

const actions = {
  ...objectsActions,
  ...movementsActions,
};

const asyncActions = { getObjects, getMovements };

export { actions, asyncActions };
