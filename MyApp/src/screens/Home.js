import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const Home = ({route}) => {
    const navigation = useNavigation();
    const [Usuario, setUsuario] = useState({});
    const [iddUsuario, setIddUsuario] = useState({});
    let idUsuario = useParams();
    setIddUsuario(idUsuario);
    console.log(iddUsuario);

    const [perfilCompleto, setPerfilCompleto] = useState(false);

    const perfilOnClickHandler = () => {
        navigation.navigate("Perfil", iddUsuario);
    }

    axios
        .get("http://localhost:3000/getUsuarioById", {
            id: iddUsuario,
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
            {perfilCompleto ? <p>Bienvenido, completa tu Perfil!</p> : <p>Bienvenido {Usuario.Nombre} {Usuario.Apellido}!</p>}
            <TouchableOpacity onPress={perfilOnClickHandler} style={styles.button}> 
                <Text style = {{marginLeft:'27%', fontSize:16, fontWeight:'500'}}>{perfilCompleto ?<p>Ir a mi Perfil</p>:<p>Completar Perfil</p>}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#fda3ff', width: '30%', color:'black',  marginTop:10, marginLeft:'35%', padding: 12,borderRadius:15,
    }
});

export default Home;   