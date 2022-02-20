import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, TouchableHighlight, View} from 'react-native';
import {useCallback, useState} from 'react';
import {Auth, Join, Orders} from './src/pages';
export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Auth: undefined;
  Join: undefined;
  Orders: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Auth');
  }, [navigation]);

  return (
    <View>
      <TouchableHighlight onPress={onClick}>
        <Text>Home Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View>
      <TouchableHighlight onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer>
      {isLogin ? (
        <Tab.Navigator>
          <Tab.Screen name="Orders" component={Orders} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="Join"
            component={Join}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
