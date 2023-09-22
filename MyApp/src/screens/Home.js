import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { render } from "react-dom";

const Home = () => {
    const navigation = useNavigation();
    const [Usuario, setUsuario] = useState({});
    const [idUsuario, setIdUsuario] = useState({});
    setIdUsuario(this.props.route.params.id);
    console.log(idUsuario);

    const [perfilCompleto, setPerfilCompleto] = useState(false);

    const perfilOnClickHandler = () => {
        navigation.navigate("Perfil", idUsuario);
    }

    axios
        .get("http://localhost:3000/getUsuarioById", {
            id: idUsuario,
        })
        .then(
            (response) => {
                if (response.status === 200) {
                    console.log(response);
                    setUsuario(response.data.products);

                    if (Usuario.Nombre != undefined && Usuario.Apellido != undefined) {
                        setPerfilCompleto(true);
                    }

                }
            },
            (res) => {
                setError(res.response.data);
            }
        );

    return (
        <View>
            <Text>HOME</Text>
            {perfilCompleto ? <p onClick={perfilOnClickHandler}>Bienvenido, completa tu Perfil!</p> : <p>Bienvenido {Usuario.Nombre} {Usuario.Apellido}!</p>}
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Home;   