import {createSlice} from '@reduxjs/toolkit';

type stateType = {
  seq: number;
  title: string;
  body: string;
  nickName: string;
  createAt: string;
  editAt: string;
};

const initialState: stateType = {
  seq: 0,
  title: `안녕하세요 ㅎㅎ`,
  body: `잘부탁드립니다`,
  nickname: `성민`,
  createAt: `2022-02-22`,
  editAt: `2022-02-22`,
};

const articleSlice = createSlice({
  name: `article`,
  initialState,
  reducers: {
    setArticle(state, action) {
      console.log(`setArticle`, action);
    },
  },

  extraReducers: _builder => {},
});

export default articleSlice;
