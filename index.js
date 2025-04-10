import 'react-native-reanimated'; // 👈 first!
import 'react-native-gesture-handler'; // 👈 second!

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
