import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const getObjects = createAsyncThunk(
  'objects/fetch',
  async (_, thunkAPI) => {
    const url = routes.objects();
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  currentId: null,
  list: [],
  status: 'idle',
  error: null,
};

const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    setCurrentObjectId: (state, action) => {
      state.currentId = action.payload.id;
    },
    changeObjectsStatus: (state, action) => {
      state.status = action.payload.status;
    },
  },
  extraReducers: {
    [getObjects.pending]: (state) => {
      state.status = 'pending';
    },
    [getObjects.fulfilled]: (state, action) => {
      state.list = action.payload.data;
      state.status = 'successful';
    },
    [getObjects.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = objectsSlice;
export { actions };
export default reducer;
