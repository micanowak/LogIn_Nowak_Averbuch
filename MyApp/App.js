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
import SignIn from './src/screens/SignIn';
import Perfil from './src/screens/Perfil';

//Firebase
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const Stack = createNativeStackNavigator();



// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDYzKjC_JD3imqZjacsJvEsp8nvb6KkPLo",
  authDomain: "login-nowak-averbuch-smaevich.firebaseapp.com",
  projectId: "login-nowak-averbuch-smaevich",
  storageBucket: "login-nowak-averbuch-smaevich.appspot.com",
  messagingSenderId: "290640125257",
  appId: "1:290640125257:web:dbad063d65630f10c3ce98",
  measurementId: "G-5NNCX5BSP0"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Inicializo Firebase

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
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
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
