import React, { useState,useEffect } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app'; // inecesario 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


const LogIn = () => {
    const navigation = useNavigation();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ButtonPressed, setButtonPressed] = useState(false);
    const [Mensaje, setMensaje] = useState('');
    const [error, setError] = useState("");

    const[user,setUser] = useState({
        Email:"",
        Password: ""});

    const auth = getAuth()

    useEffect(() => { // cuando se cambia el mail se actualiza directo en usuario
        setUser(() => {
            Email: nombreUsuario
        })
    }), [nombreUsuario]

    useEffect(() => { // cuando se cambia el mail se actualiza directo en password
        setUser(() => {
            Password: contrasenia
        })
    }), [contrasenia]

    const buttonOnsubmitHandler = async () => {
        setButtonPressed(true);
       //Firebase
        const obj ={
            Email:"",
            Password:""
        }
        signInWithEmailAndPassword(auth, nombreUsuario,contrasenia) // login con mail y password
        
        .then((userCredential) => {
            const userLogged = userCredential.user;
            const updateUserContext = async () => await setUser(userLogged)
            updateUserContext()
            console.log('Inicio sesion exitosa!')
            navigation.navigate('Home', { user: obj })
          })
          .catch((error) => {
            console.log(error)
            console.log('user no encontrado');
          })
        
        /*
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
        }*/
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
