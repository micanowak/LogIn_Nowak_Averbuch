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
            <Text>Inicio de Sesión</Text>
            <TextInput
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                placeholder="Nombre de Usuario"
                secureTextEntry={false}
            />

            <TextInput
                value={contrasenia}
                onChangeText={setContrasenia}
                placeholder="Nombre de Usuario"
                secureTextEntry={true}
            />

            <Button
                title="Iniciar Sesión"
                name="Iniciar Sesión"
                onPress={buttonOnsubmitHandler}
            />
            <TouchableOpacity onPress={onPressHandler}>
                <Text>Registrarse</Text>
            </TouchableOpacity>
            {ButtonPressed ? <p>{Mensaje}</p> : <p></p>}
        </View>
    );
};

const styles = StyleSheet.create({
});

export default LogIn;