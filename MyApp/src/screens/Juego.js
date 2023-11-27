import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
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
            setMensaje("Incorrecto");
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
            <View>
                <Image style={styles.imgFlag} source={{ uri: currentCountry.flag }} />
                <TextInput
                    value={nombre}
                    placeholder={placeholder}
                    onChangeText={nombreOnchangeHandler}
                />
                <TouchableOpacity onPress={buttonOnsubmitHandler}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
                <View>
                    <Text>{currentCountry.name}</Text>
                    <Text>{mensaje}</Text>
                </View>
                <TouchableOpacity onPress={buttonFinalizarHandler}>
                    <Text>Finalizar Juego</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <View></View>
            <View>
                <Text>Puntos Actuales: {puntos}</Text>
            </View>
            {listCountries.length > 0 && renderCurrentCountry()}
        </View>
    );
};

const styles = StyleSheet.create({
    imgFlag: {
        width: 100,
        height: 60,
    },
});

export default Juego;
