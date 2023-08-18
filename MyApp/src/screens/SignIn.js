import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
    const navigation = useNavigation();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ButtonPressed, setButtonPressed] = useState(false);
    const [Mensaje, setMensaje] = useState('');
    const [error, setError] = useState("");
    
    const buttonOnsubmitHandler = () => {
        setButtonPressed(true);
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
                    }
                },
                (res) => {
                    setError(res.response.data);
                    setMensaje("usuario no registrado");
                }
            );
    };

    const onPressHandler = () => {
        navigation.navigate("LogIn");
    }


    return (
        <View>
            <Text style = {styles.title}>REGISTRO</Text>
            <TextInput
                value={nombreUsuario}
                style ={styles.textInput}
                onChangeText={setNombreUsuario}
                placeholder="Nombre de Usuario"
                secureTextEntry={false}
            />

            <TextInput
                value={contrasenia}
                style ={styles.textInput}
                onChangeText={setContrasenia}
                placeholder="Contraseña"
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={buttonOnsubmitHandler} style={styles.button}>
                <Text style = {{marginLeft:'20%', fontSize:16, fontWeight:'500'}}>Registrarse</Text>
            </TouchableOpacity>
                
                
            
            <TouchableOpacity onPress={onPressHandler} style={styles.buttonSecond}>
                <Text style = {{marginLeft:'13%'}}>Iniciar Sesión</Text>
            </TouchableOpacity>
            {ButtonPressed ? <p>{Mensaje}</p> : <p></p>}
        </View>
    );
}

const styles = StyleSheet.create(
    {
        title:{
            backgroundColor:'#E742EB', width: '50%', color:'white',  fontWeight:'500', fontSize:16, textAlign:'center', marginTop:10, marginLeft:'25%', padding: 15,borderRadius:15,
        },
        textInput:{
            color:'white', marginTop:20, width:'80%', marginLeft:'10%'
        },
        button:{
            backgroundColor:'#fda3ff', width: '40%', color:'black',  marginTop:10, marginLeft:'30%', padding: 12,borderRadius:15,
        },
        buttonSecond:{
            backgroundColor:'#f6c9f7', width: '30%', color:'black',  marginTop:10, marginLeft:'35%', padding: 5,borderRadius:15,
        }
    }
);
export default SignIn;