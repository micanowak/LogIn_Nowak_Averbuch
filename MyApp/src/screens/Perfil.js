import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';

const Perfil = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const baseURL = "http://localhost:3000/updateUsuarioInfo";

    const { idUsuario, nombreUsuario, apellidoUsuario } = route.params;
    console.log(idUsuario, nombreUsuario, apellidoUsuario);

    const buttonOnsubmitHandler = () => {
        const dataToUpdate = {
            id: idUsuario,
            nombre: nombre,
            apellido: apellido
        };
        axios
            .put(baseURL, dataToUpdate)
            .then(
                (response) => {
                    if (response.status === 200) {
                        console.log(response);
                        navigation.navigate("Home", idUsuario)
                    }
                },
                (res) => {
                    //setError(res.response.data);
                }

            )
            .catch((error) => {
                // Handle error here
                console.error(error);
            });
    }

    return (
        <View>
            <Text style={styles.title}>PERFIL</Text>
            <TextInput
                value={nombre}
                style={styles.textInput}
                onChangeText={setNombre}
                placeholder={nombreUsuario}
                secureTextEntry={false}
            />

            <TextInput
                style={styles.textInput}
                value={apellido}
                onChangeText={setApellido}
                placeholder={apellidoUsuario}
                secureTextEntry={false}
            />

            <TouchableOpacity onPress={buttonOnsubmitHandler} style={styles.button}>
                <Text style={{ marginLeft: '27%', fontSize: 16, fontWeight: '500' }}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        backgroundColor: '#E742EB', width: '50%', color: 'white', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 10, marginLeft: '25%', padding: 15, borderRadius: 15,
    },
    button: {
        backgroundColor: '#fda3ff', width: '30%', color: 'black', marginTop: 10, marginLeft: '35%', padding: 12, borderRadius: 15,
    },
    textInput: {
        color: 'white', marginTop: 20, width: '80%', marginLeft: '10%'
    }
});

export default Perfil;   