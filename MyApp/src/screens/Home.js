import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const Home = ({route}) => {
    const navigation = useNavigation();
    const [Usuario, setUsuario] = useState({});
    const [idUsuario, setIdUsuario] = useState({});
    let parametro = route.params;
    setIdUsuario(1);
    console.log(idUsuario);
    console.log(parametro);

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

                    if (Usuario.nombre != null && Usuario.apellido != null) {
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
    button:{
        backgroundColor:'#fda3ff', width: '30%', color:'black',  marginTop:10, marginLeft:'35%', padding: 12,borderRadius:15,
    }
});

export default Home;   