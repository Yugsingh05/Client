import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { RootStackParams } from '../navigation/RootNavigation'

type LoginScreenNavigationProps = NativeStackNavigationProp<RootStackParams,'Login'>
interface LoginScreenProps {
    navigation : LoginScreenNavigationProps
}

const LoginScreen : React.FC<LoginScreenProps>= ({navigation}) => {
  return (
   <View>
     <Text>LoginScreen</Text>
     <Button title='Login' onPress={() => navigation.navigate('HomeScreen')}/>
   </View>

  )
}

export default LoginScreen