import React, { useState } from "react";
import { TextInput, View, Text, Button } from "react-native-web";

const LogIn = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ButtonPressed, setButtonPressed] = useState(false);
    const [Mensaje, setMensaje] = useState('');

    const buttonOnsubmitHandler = () => {
        setButtonPressed(true);
        axios
            .post("http://localhost:3000/logIn", {
                username: nombreUsuario,
                password: contrasenia,
            })
            .then(
                (response) => {
                if (response.status === 200) {
                    setMensaje("Está ok");
                } else if(response.status === 500) {
                    setMensaje("No está ok");
                }
                },
                (res) => {
                    setError(res.response.data);
                }
            );
        };
    
    return (
        <View>
            <Text>Inicio de Sesión</Text>
            <TextInput
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                placeholder="Nombre de Usuario"
                secureTextEntry= {false}
            />
            
            <TextInput
                value={contrasenia}
                onChangeText={setContrasenia}
                placeholder="Nombre de Usuario"
                secureTextEntry= {true}
            />

            <Button
                title="Iniciar Sesión"
                name="Iniciar Sesión"
                onPress={buttonOnsubmitHandler}
            />
            {ButtonPressed ? <p>{Mensaje}</p>:<p></p>}
        </View>
    );
}

export default LogIn;