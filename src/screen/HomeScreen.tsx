import React, {useContext, useEffect} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/RootNavigation';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {userId, token,logout} = useContext(AuthContext);

  console.log(userId, token);


  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
    }
  }, [token, navigation]);

  const handleLogout = async() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', onPress:async () => {
        await logout();
        console.log(true);
        navigation.navigate('Login');
      }},
    ]);
  };

  return (
  <View style={{marginTop : 50}}>
    <Text>HomeScreen</Text>;
    <Button title="Logout" onPress={handleLogout} />
  </View>
  );
};

export default HomeScreen;
