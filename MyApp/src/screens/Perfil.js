import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const Perfil = ({idUsuario}) => {
    const navigation = useNavigation();
    const [Usuario, setUsuario] = useState({});

    axios
            .get("http://localhost:3000/updateUsuarioInfo", {
                id:idUsuario,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        console.log(response);
                        setUsuario(response.data.products);
                    }
                },
                (res) => {
                    setError(res.response.data);
                }
            );

    return (
        <View>
            <Text>Perfil</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Perfil;   