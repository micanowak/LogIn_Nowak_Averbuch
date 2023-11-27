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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Juego = () => {
    const navigation = useNavigation();
    const [listCountries, setListCountries] = useState([]);
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [placeholder, setPlaceHolder] = useState("Nombre País en Inglés");
    const [esCorrecto, setEsCorrecto] = useState(false);
    const [puntos, setPuntos] = useState(0);
    const [randomCountryIndex, setRandomCountryIndex] = useState(null);

    useEffect(() => {
        axios
            .get("https://countriesnow.space/api/v0.1/countries/flag/images")
            .then((res) => {
                setListCountries(res.data.data);
                setRandomCountryIndex(generateRandomIndex(res.data.data.length));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const generateRandomIndex = (max) => {
        return Math.floor(Math.random() * max);
    };

    const nombreOnchangeHandler = (text) => {
        setNombre(text);
    };

    const buttonOnsubmitHandler = () => {
        if (nombre === listCountries[randomCountryIndex].name) {
            setEsCorrecto(true);
            setMensaje('');
            const ppp = puntos + 1;
            setPuntos(ppp);
            setRandomCountryIndex(generateRandomIndex(listCountries.length));
            setNombre('');
            setPlaceHolder("Nombre País en Inglés");
        } else {
            setPlaceHolder("Nombre País en Inglés");
            alert("Te equivocaste :(")
        }
    };

    const buttonFinalizarHandler = () => {
        navigation.navigate("FinJuego", { puntos: puntos });
        setPuntos(0);
    }

    const renderCurrentCountry = () => {
        const currentCountry = listCountries[randomCountryIndex];
        console.log(currentCountry);
        return (
            <View style={styles.container}>
                <Image style={styles.imgFlag} source={{ uri: currentCountry.flag }} />
                <TextInput
                    style={styles.input}
                    value={nombre}
                    placeholder={placeholder}
                    placeholderTextColor={styles.placeholderStyle.color}
                    onChangeText={nombreOnchangeHandler}
                />
                <TouchableOpacity style={styles.button} onPress={buttonOnsubmitHandler}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <View>
                    
                    {mensaje && <Text style={styles.errorText}>{mensaje}</Text>}
                </View>
                <TouchableOpacity style={styles.finishButton} onPress={buttonFinalizarHandler}>
                    <Text style={styles.buttonText}>Finalizar Juego</Text>
                </TouchableOpacity>

            </View>

        );
    };

    return (
        <ImageBackground
            source={require('../../assets/banderas2.webp')}
            style={styles.backgroundImage}
        >
            <View style={styles.centerCont}>
                <View style={styles.container}>
                    {listCountries.length > 0 && renderCurrentCountry()}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerCont: {
        backgroundColor: '#1A4B8E',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 15,
        marginHorizontal: '39%'
    },
    textPuntos: {
        color: 'white',
        fontSize: 30,
        marginBottom: 10
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    imgFlag: {
        width: 300,
        height: 180,
        marginBottom: 10, // Espacio entre la imagen y el TextInput
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%', // Ancho del TextInput
        borderRadius: 8,
    },
    eachForm: {
        borderColor: '#E742EB',
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 10,
        padding: 5,
        margin: 5,
        marginBottom: 20,
        fontWeight: 600,

    },
    placeholderStyle: {
        color: 'white',
        fontWeight: 300,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#E742EB',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    pointsText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    finishButton: {
        backgroundColor: '#973ACD',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
        marginTop: 20,
    },
});

export default Juego;

