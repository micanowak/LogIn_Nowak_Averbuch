import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDYzKjC_JD3imqZjacsJvEsp8nvb6KkPLo",
    authDomain: "login-nowak-averbuch-smaevich.firebaseapp.com",
    projectId: "login-nowak-averbuch-smaevich",
    storageBucket: "login-nowak-averbuch-smaevich.appspot.com",
    messagingSenderId: "290640125257",
    appId: "1:290640125257:web:dbad063d65630f10c3ce98",
    measurementId: "G-5NNCX5BSP0"
};

firebase.initializeApp(firebaseConfig);

const LogIn = () => {
    const navigation = useNavigation();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ButtonPressed, setButtonPressed] = useState(false);
    const [Mensaje, setMensaje] = useState('');
    const [error, setError] = useState("");

    const buttonOnsubmitHandler = async () => {
        setButtonPressed(true);

        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(nombreUsuario, contrasenia);

            if (userCredential) {
                const userId = userCredential.user.uid;

                const db = firebase.firestore();
                const userDoc = await db.collection('usuarios').doc(userId).get();

                if (userDoc.exists) {
                    const userData = userDoc.data();
                    navigation.navigate("Home", userId, userData.nombre, userData.apellido);
                } else {
                    setMensaje("Usuario no encontrado");
                }
            }
        } catch (error) {
            setError(error.message);
            setMensaje("Inicio de sesión incorrecto");
        }
    };

    const onPressHandler = () => {
        navigation.navigate("SignIn");
    }

    return (
        <View>
            <Text style={styles.title}>INICIO DE SESIÓN</Text>
            <TextInput
                value={nombreUsuario}
                style={styles.textInput}
                onChangeText={setNombreUsuario}
                placeholder="Nombre de Usuario"
                secureTextEntry={false}
            />

            <TextInput
                style={styles.textInput}
                value={contrasenia}
                onChangeText={setContrasenia}
                placeholder="Contraseña"
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={buttonOnsubmitHandler} style={styles.button}>
                <Text style={{ marginLeft: '27%', fontSize: 16, fontWeight: '500' }}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressHandler} style={styles.buttonSecond}>
                <Text style={{ marginLeft: '18%' }}>Registrarse</Text>
            </TouchableOpacity>
            {ButtonPressed ? <p>{Mensaje}</p> : <p></p>}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        backgroundColor: '#E742EB', width: '50%', color: 'white', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 10, marginLeft: '25%', padding: 15, borderRadius: 15,
    },
    textInput: {
        color: 'white', marginTop: 20, width: '80%', marginLeft: '10%'
    },
    button: {
        backgroundColor: '#fda3ff', width: '30%', color: 'black', marginTop: 10, marginLeft: '35%', padding: 12, borderRadius: 15,
    },
    buttonSecond: {
        backgroundColor: '#f6c9f7', width: '30%', color: 'black', marginTop: 10, marginLeft: '35%', padding: 5, borderRadius: 15,
    }
});

export default LogIn;
