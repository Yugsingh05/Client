import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/Login';
import SIgnUpScreen from '../screen/SignUpScreen';
import ReciepeDetails from '../screen/ReciepeDetails';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export type RootStackParams = {
  HomeScreen: undefined;
  Login: undefined;
  SignUpScreen: undefined;
  ReciepeDetails: {recipeId: string};
};

const Stack = createNativeStackNavigator<RootStackParams>();
type NavigationProp = NativeStackNavigationProp<RootStackParams>; 

const RootNavigation = () => {

  const navigation = useNavigation<NavigationProp>();
  const {isLoading,isAuthenticated} = useContext(AuthContext);

  useEffect(() => {
    if(!isLoading){
      if(isAuthenticated){
        console.log('Authenticated');
        navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]})
      }
      else {
        console.log('Not Authenticated');
        navigation.reset({index: 0, routes: [{name: 'Login'}]})
      }
    }


  },[isLoading,navigation,isAuthenticated]);
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
