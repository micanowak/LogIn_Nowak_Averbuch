import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './src/screens/LogIn';
import Home from './src/screens/Home';
import {
  NavigationContainer,
  StackRouter,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import SignIn from './src/screens/SignIn';
import Perfil from './src/screens/Perfil';


export default function App() {   
  
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#1A4B8E",
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ title: "Log In" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "Sign In" }}
        /> 
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ title: "Perfil" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
