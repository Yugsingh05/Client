import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screen/HomeScree';
import LoginScreen from '../screen/Login';
import SIgnUpScreen from '../screen/SignUpScreen';
import ReciepeDetails from '../screen/ReciepeDetails';

export type RootStackParams = {
  HomeScreen: undefined;
  Login: undefined;
  SignUpScreen: undefined;
  ReciepeDetails: {recipeId: string};
};

const Stack = createNativeStackNavigator<RootStackParams>();
const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown : false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}} />
      <Stack.Screen name="SignUpScreen" component={SIgnUpScreen} options={{headerShown : false}}/>
      <Stack.Screen name="ReciepeDetails" component={ReciepeDetails}  />
    </Stack.Navigator>
  );
};

export default RootNavigation;
