import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const router = useRoute();
    const baseURL = "http://localhost:3000/getUsuarioById/";
    const idUsuario = router.params;
    console.log(idUsuario);

    const [perfilCompleto, setPerfilCompleto] = useState(true);

    const perfilOnClickHandler = () => {
        const nombreUsuario = saveUser.nombre;
        const apellidoUsuario = saveUser.apellido;
        navigation.navigate("Perfil", [idUsuario, nombreUsuario, apellidoUsuario]);
    }

    const [saveUser, setSaveUser] = useState({
        id: 0,
        nombre: "0",
        apellido: "0",
        username: "0",
        password: "0"
    });

    const updateSaveUser = (aux) => {
        setSaveUser((prevState) => ({
            ...prevState,
            id: aux.id,
            nombre: aux.nombre,
            apellido: aux.apellido,
            username: aux.username,
            password: aux.password
        }));
    };

    axios
        .get(baseURL + idUsuario)
        .then(
            (response) => {
                if (response.status === 200) {
                    const aux = {
                        id: response.data.id,
                        nombre: response.data.nombre,
                        apellido: response.data.apellido,
                        username: response.data.username,
                        password: response.data.password
                    }
                    updateSaveUser(aux);
                    console.log(saveUser);

                    if (saveUser.nombre == null && saveUser.apellido == null) {
                        setPerfilCompleto(false);
                    }

                }
            },
            (res) => {
                //setError(res.response.data); 
            }
        );

    console.log(perfilCompleto);

    return (
        <View>
            <Text>HOME</Text>
            {perfilCompleto == false ? <p>Bienvenido, completa tu Perfil!</p> : <p>Bienvenido {saveUser.nombre} {saveUser.apellido}!</p>}
            <TouchableOpacity onPress={perfilOnClickHandler} style={styles.button}>
                <Text style={{ marginLeft: '27%', fontSize: 16, fontWeight: '500' }}>{perfilCompleto ? <p>Editar Perfil</p> : <p>Completar Perfil</p>}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fda3ff', width: '30%', color: 'black', marginTop: 10, marginLeft: '35%', padding: 12, borderRadius: 15,
    }
});

export default Home;   