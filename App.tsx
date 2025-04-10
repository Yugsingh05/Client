
import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';



function App(): React.JSX.Element {


  return (
   <NavigationContainer>
    <RootNavigation/>

   </NavigationContainer>
  );
}


export default App;
