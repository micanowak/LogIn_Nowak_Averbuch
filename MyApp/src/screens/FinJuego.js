import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const FinJuego = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { puntos } = route.params;
    const [Mensaje, setMensaje] = useState('');
    const [Puntaje, setPuntaje] = useState(puntos);

    
    useEffect(() => {
        if(Puntaje === 0){
            setMensaje("Sos malísimo");
        } else if (Puntaje <6){
            setMensaje("Podría ser peor, no sos tan malo");
        } else if (Puntaje <11){
            setMensaje("Te la recontra bancas");
        } else {
            setMensaje("Sos un genio, felicitaciones!!")
        }
    }, [Puntaje]);

    const buttonHomeHandler = () => {
        navigation.navigate("Home");
    }
    const buttonNewGameHandler = () => {
        navigation.navigate("Juego");
    }

    return (
        <ImageBackground
            source={require('../../assets/banderas2.webp')}
            style={styles.backgroundImage}
        >
            <View style={styles.centerCont}>
                <View style={styles.container}>
                    <Text style={styles.title}>Puntos Finales: {puntos}</Text>
                    <Text style={styles.title}>{Mensaje}</Text>
                    <TouchableOpacity onPress={buttonNewGameHandler}>
                        <Text style={styles.button}>Volver a Jugar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={buttonHomeHandler}>
                        <Text style={styles.button2}>Volver a la Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    button: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#E742EB',
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
    },
    button2: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#973ACD',
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
    },
    centerCont: {
        backgroundColor: '#1A4B8E',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 15,
        marginHorizontal: '39%'
    }
});

export default FinJuego;
