import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { MOVEMENTS_REQUEST_DELAY } from '../constants';

export const getMovements = createAsyncThunk(
  'movements/fetch',
  async (id, thunkAPI) => {
    const url = routes.objectMovements(id);
    const requestPolling = async () => {
      const timeout = setTimeout(() => {
        if (id === thunkAPI.getState().objects.currentId) {
          thunkAPI.dispatch(getMovements(id));
        } else {
          clearTimeout(timeout);
        }
      }, MOVEMENTS_REQUEST_DELAY);
    };
    try {
      const response = await axios.get(url);
      requestPolling();
      return response.data;
    } catch (error) {
      requestPolling();
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const objectsSlice = createSlice({
  name: 'movements',
  initialState,
  reducers: {
    changeMovementsStatus: (state, action) => {
      state.status = action.payload.status;
    },
  },
  extraReducers: {
    [getMovements.pending]: (state) => {
      state.status = 'pending';
    },
    [getMovements.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = 'successful';
    },
    [getMovements.rejected]: (state, action) => {
      state.list = [];
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = objectsSlice;
export { actions };
export default reducer;
