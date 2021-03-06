import {createSlice} from '@reduxjs/toolkit';

type stateType = {
  name: string;
  email: string;
  accessToken: string;
  test: boolean;
  phoneToken: string;
};

const initialState: stateType = {
  name: '',
  email: '',
  accessToken: '',
  test: true,
  phoneToken: '',
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
    setPhoneToken(state, action) {
      state.phoneToken = action.payload.phoneToken;
    },
  },

  extraReducers: _builder => {},
});

export default userSlice;
