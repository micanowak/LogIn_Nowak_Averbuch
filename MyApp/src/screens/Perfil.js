import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';

const Perfil = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [Usuario, setUsuario] = useState({});
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const {idUsuario} = route.params;

    const buttonOnsubmitHandler = () => {
        axios
            .get("http://localhost:3000/updateUsuarioInfo", {
                id: idUsuario,
                nombre: nombre,
                apellido: apellido
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        console.log(response);
                        setUsuario(response.data.products);
                        navigation.navigate("Home", idUsuario)
                    }
                },
                (res) => {
                    setError(res.response.data);
                }
            );
    }

    return (
        <View>
            <Text style = {styles.title}>PERFIL</Text>
            <TextInput
                value={nombre}
                style ={styles.textInput}
                onChangeText={setNombre}
                placeholder="Nombre"
                secureTextEntry={false}
            /> 

            <TextInput
                style ={styles.textInput}
                value={apellido}
                onChangeText={setApellido}
                placeholder="Apellido"
                secureTextEntry={false}
            />

            <TouchableOpacity onPress={buttonOnsubmitHandler} style={styles.button}> 
            <Text style = {{marginLeft:'27%', fontSize:16, fontWeight:'500'}}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        backgroundColor:'#E742EB', width: '50%', color:'white',  fontWeight:'500', fontSize:16, textAlign:'center', marginTop:10, marginLeft:'25%', padding: 15,borderRadius:15,
    },
    button:{
        backgroundColor:'#fda3ff', width: '30%', color:'black',  marginTop:10, marginLeft:'35%', padding: 12,borderRadius:15,
    },
    textInput:{
        color:'white', marginTop:20, width:'80%', marginLeft:'10%'
    }
});

export default Perfil;   