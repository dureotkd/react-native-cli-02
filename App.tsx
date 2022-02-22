import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppIndex from './AppIndex';
import {NavigationContainer} from '@react-navigation/native';

// export type RootStackParamList = {
//   Home: undefined;
//   Details: undefined;
//   Auth: undefined;
//   Join: undefined;
//   Orders: undefined;
// };

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppIndex />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
