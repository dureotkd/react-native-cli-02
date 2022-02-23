import {combineReducers} from 'redux';
import userSlice from '../slices/user';
import articleSlice from '../slices/article';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  article: articleSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
