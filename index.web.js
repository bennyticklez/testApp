import {AppRegistry} from 'react-native';
// import './fonts/styles.css';
import App from './App';

if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent('React Native Web', () => App);
AppRegistry.runApplication('React Native Web', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
