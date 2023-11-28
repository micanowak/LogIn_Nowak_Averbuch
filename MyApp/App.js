import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
import FinJuego from "./src/screens/FinJuego";
import Juego from './src/screens/Juego';
import unirJuego from './src/screens/unirJuego';
import FinJuegoUnir from './src/screens/FinJuegoUnir';

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

  const headerOptions = {
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: '#1A4B8E',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
    headerLeft: () => (
      <Image
        source={require('./assets/logo.png')}
        style={{ width: 40, height: 40, marginLeft: 10 }}
      />
    ),
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: false,
          //headerShown: false,
        }}
      >
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ title: "FirexStyle", ...headerOptions, headerShown: true }}
        />
        <Stack.Screen
          name="Juego"
          component={Juego}
          options={{ title: "FirexStyle",  ...headerOptions, headerShown: true }}
        />
        <Stack.Screen
          name="FinJuego"
          component={FinJuego}
          options={{ title: "FirexStyle",  ...headerOptions, headerShown: true }}
        />
        <Stack.Screen
          name="FinJuegoUnir"
          component={FinJuegoUnir}
          options={{ title: "FirexStyle",  ...headerOptions, headerShown: true }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "FirexStyle",  ...headerOptions, headerShown: true }}
        />
        <Stack.Screen
          name="unirJuego"
          component={unirJuego}
          options={{ title: "FirexStyle",  ...headerOptions, headerShown: true }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "FirexStyle",  ...headerOptions, headerShown: true }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ title: "FirexStyle",  ...headerOptions, headerShown: true }}
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
