import React, { useState, useEffect } from "react";
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
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [apellidoUsuario, setApellidoUsuario] = useState('');

    const perfilOnClickHandler = () => {
        navigation.navigate("Perfil", {idUsuario, nombreUsuario, apellidoUsuario});
    } 

    useEffect(() => {
        axios
            .get(baseURL + idUsuario)
            .then((response) => {
                if (response.status === 200) {
                    setApellidoUsuario(response.data.apellido);
                    setNombreUsuario(response.data.nombre);
                    console.log(apellidoUsuario, nombreUsuario);
                    if (nombreUsuario == '' && apellidoUsuario == '') {
                        setPerfilCompleto(false);
                    }
                }
            })
            .catch((error) => {
                // Handle error here
                console.error(error);
            });
    }, []);

    console.log(perfilCompleto);

    return (
        <View>
            <Text>HOME</Text>
            {perfilCompleto == false ? <p>Bienvenido, completa tu Perfil!</p> : <p>Bienvenido {nombreUsuario} {apellidoUsuario}!</p>}
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