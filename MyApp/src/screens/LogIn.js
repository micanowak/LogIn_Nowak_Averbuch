import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const LogIn = () => {
    const navigation = useNavigation();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ButtonPressed, setButtonPressed] = useState(false);
    const [Mensaje, setMensaje] = useState('');
    const [error, setError] = useState("");

    const buttonOnsubmitHandler = () => {
        setButtonPressed(true);
        axios
            .post("http://localhost:3000/logInUsuario", {
                username: nombreUsuario,
                password: contrasenia,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        //esUsuario = true;
                        console.log(response);
                        setMensaje("usuario correcto");
                        console.log(response.data.id);
                        navigation.navigate("Home", response.data.id);
                    }
                },
                (res) => {
                    setError(res.response.data);
                    setMensaje("usuario incorrecto");
                }
            );
    };


    const onPressHandler = () => {
        navigation.navigate("SignIn");
    }

    return (
        <View>
            <Text style = {styles.title}>INICIO DE SESIÓN</Text>
            <TextInput
                value={nombreUsuario}
                style ={styles.textInput}
                onChangeText={setNombreUsuario}
                placeholder="Nombre de Usuario"
                secureTextEntry={false}
            />

            <TextInput
                style ={styles.textInput}
                value={contrasenia}
                onChangeText={setContrasenia}
                placeholder="Contraseña"
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={buttonOnsubmitHandler} style={styles.button}> 
            <Text style = {{marginLeft:'27%', fontSize:16, fontWeight:'500'}}>Entrar</Text>
            </TouchableOpacity>
                
            <TouchableOpacity onPress={onPressHandler} style={styles.buttonSecond}>
                <Text  style = {{marginLeft:'18%'}}>Registrarse</Text>
            </TouchableOpacity>
            {ButtonPressed ? <p>{Mensaje}</p> : <p></p>}
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        backgroundColor:'#E742EB', width: '50%', color:'white',  fontWeight:'500', fontSize:16, textAlign:'center', marginTop:10, marginLeft:'25%', padding: 15,borderRadius:15,
    },
    textInput:{
        color:'white', marginTop:20, width:'80%', marginLeft:'10%'
    },
    button:{
        backgroundColor:'#fda3ff', width: '30%', color:'black',  marginTop:10, marginLeft:'35%', padding: 12,borderRadius:15,
    },
    buttonSecond:{
        backgroundColor:'#f6c9f7', width: '30%', color:'black',  marginTop:10, marginLeft:'35%', padding: 5,borderRadius:15,
    }
});

export default LogIn;   