import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const Home = ({idUsuario}) => {
    const navigation = useNavigation();
    const [Usuario, setUsuario] = useState({});
    const [perfilCompleto, setPerfilCompleto] = useState(false);

    

    axios
            .get("http://localhost:3000/getUsuarioById", {
                id:idUsuario,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        console.log(response);
                        setUsuario(response.data.products);

                        if(Usuario.Nombre != undefined && Usuario.Apellido != undefined){
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
            <Text>{Usuario.Nombre}</Text>
            <Text>{Usuario.Apellido}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Home;   