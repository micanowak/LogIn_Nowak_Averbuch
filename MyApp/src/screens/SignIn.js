import React, { useEffect, useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
// Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const SignIn = () => {
    const navigation = useNavigation();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [user, setUser] = useState({
        Email: nombreUsuario,
        Password: contrasenia,
    });
    const [usuario, setUsuario] = useState({});
    const [ButtonPressed, setButtonPressed] = useState(false);
    const [Mensaje, setMensaje] = useState('');
    const [error, setError] = useState("");
    // NO SE PUEDE REPETIR EL NOMBRE DE USUARIO, HAY QUE PROGRAMARLO
    // MEJORAR ESTILOS
    // RECARGA AUTOMÁTICA
    // CONDICIONAL DE PERFIL COMPLETADO
    useEffect(() => { // cuando se cambia el mail se actualiza directo en usuario
        console.log(nombreUsuario);
        setUser(() => {
            Email: nombreUsuario
        })
    }), [nombreUsuario]

    useEffect(() => { // cuando se cambia el mail se actualiza directo en password
        console.log(contrasenia);
        setUser(() => {
            Password: contrasenia
        })
    }), [contrasenia]

    const auth = getAuth()

    const buttonOnsubmitHandler = () => {
        //Firebase
        
        createUserWithEmailAndPassword(auth, nombreUsuario, contrasenia) // register
            .then((userCredential) => {
                const soyPete = userCredential.user;
                setUser(soyPete)
                console.log("Usuario creado")
                navigation.navigate('Home', { user: soyPete })

            })
            .catch((error) => {
                console.error(error)
                console.log("El registro no pudo completarse")
            });



        // lo viejo!

        setButtonPressed(true);
        /*
        axios
            .post("http://localhost:3000/insertUsuario", {
                username: nombreUsuario,
                password: contrasenia,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        //esUsuario = true;
                        console.log(response);
                        setMensaje("usuario registrado");
                        setUsuario(response.data);
                        navigation.navigate("LogIn");
                    }
                },
                (res) => {
                    setError(res.response.data);
                    setMensaje("usuario no registrado");
                }
            );
            */
    };

    const onPressHandler = () => {
        navigation.navigate("LogIn");
    }


    return (
        <View>
            <Text style={styles.title}>REGISTRO</Text>
            <TextInput
                value={nombreUsuario}
                style={styles.textInput}
                onChangeText={setNombreUsuario}
                placeholder="Nombre de Usuario"
                secureTextEntry={false}
            />

            <TextInput
                value={contrasenia}
                style={styles.textInput}
                onChangeText={setContrasenia}
                placeholder="Contraseña"
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={buttonOnsubmitHandler} style={styles.button}>
                <Text style={{ marginLeft: '20%', fontSize: 16, fontWeight: '500' }}>Registrarse</Text>
            </TouchableOpacity>



            <TouchableOpacity onPress={onPressHandler} style={styles.buttonSecond}>
                <Text style={{ marginLeft: '13%' }}>Iniciar Sesión</Text>
            </TouchableOpacity>
            {ButtonPressed ? <p>{Mensaje}</p> : <p></p>}
        </View>
    );
}

const styles = StyleSheet.create(
    {
        title: {
            backgroundColor: '#E742EB', width: '50%', color: 'white', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 10, marginLeft: '25%', padding: 15, borderRadius: 15,
        },
        textInput: {
            color: 'white', marginTop: 20, width: '80%', marginLeft: '10%'
        },
        button: {
            backgroundColor: '#fda3ff', width: '40%', color: 'black', marginTop: 10, marginLeft: '30%', padding: 12, borderRadius: 15,
        },
        buttonSecond: {
            backgroundColor: '#f6c9f7', width: '30%', color: 'black', marginTop: 10, marginLeft: '35%', padding: 5, borderRadius: 15,
        }
    }
);
export default SignIn;