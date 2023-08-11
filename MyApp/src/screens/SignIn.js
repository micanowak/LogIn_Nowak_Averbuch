import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";

const SignIn = () => {
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
            <Text>Registro</Text>
            <TextInput
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                placeholder="Nombre de Usuario"
                secureTextEntry={false}
            />

            <TextInput
                value={contrasenia}
                onChangeText={setContrasenia}
                placeholder="Contraseña"
                secureTextEntry={true}
            />

            <Button
                title="Registrarse"
                name="Registrarse"
                onPress={buttonOnsubmitHandler}
            />
            <TouchableOpacity onPress={onPressHandler}>
                <Text>Iniciar Sesión</Text>
            </TouchableOpacity>
            {ButtonPressed ? <p>{Mensaje}</p> : <p></p>}
        </View>
    );
}

export default SignIn;