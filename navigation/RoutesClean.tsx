import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Login
import Splash from '../screens/Login/Splash';

// export default ({ children }: { children: React.ReactNode }) => {
export default function Routes() {
  const Drawer = createDrawerNavigator();

  const LoggedOutStack = () => {

    return (
      <Drawer.Navigator
        screenOptions={{headerShown: true}}
        initialRouteName="Splash"
        defaultStatus="closed">
        <Drawer.Screen name={'Splash'} component={Splash} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <LoggedOutStack />
    </NavigationContainer>
  );
}
