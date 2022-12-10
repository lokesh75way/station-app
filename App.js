import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login'
import Dashboard from './src/pages/Dashboard';
import ListDetails from './src/pages/ListDetails';
import Logout from './src/pages/Logout';
import GlobalState from './src/context/GlobalState';

const Stack = createNativeStackNavigator();


const App = () => {

  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
          <Stack.Screen initialParams={{isLogout:false}} name="Login" component={Login} /> 
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Listdetails" component={ListDetails} />
          <Stack.Screen name="logout" component={Logout} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  )
}

export default App
