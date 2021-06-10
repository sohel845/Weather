import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import HomeScreenDetail from '../screens/homeScreenDetail';
import {COLOR} from '../constants/themeContant';

const Stack = createStackNavigator();
const options = {
  title: 'WeatherApp',
  headerBackTitleVisible: false,
  headerTintColor: COLOR.white,
  headerTitleStyle: {
    alignSelf: 'center',
  },
  headerStyle: {
    backgroundColor: COLOR.navigation,
  },
};

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={options} />
        <Stack.Screen
          name="HomeScreenDetail"
          component={HomeScreenDetail}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
