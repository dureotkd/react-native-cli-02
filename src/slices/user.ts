import {createSlice} from '@reduxjs/toolkit';

type stateType = {
  name: string;
  email: string;
  accessToken: string;
  test: boolean;
};

const initialState: stateType = {
  name: '',
  email: '',
  accessToken: '',
  test: true,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('setUser', action);
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.test = action.payload.test;
    },
  },

  extraReducers: _builder => {},
});

export default userSlice;
