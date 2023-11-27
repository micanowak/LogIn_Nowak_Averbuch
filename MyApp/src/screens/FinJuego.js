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
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const FinJuego = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { puntos } = route.params;

    const buttonHomeHandler = () =>{
        navigation.navigate("Home");
    }
    const buttonNewGameHandler = () =>{
        navigation.navigate("Juego");
    }

    return (
        <View>
            <View>
                <Text>Puntos Finales: {puntos}</Text>
            </View>
            <TouchableOpacity onPress={buttonNewGameHandler}>
                <Text>Volver a Jugar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={buttonHomeHandler}>
                <Text>Volver a la Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default FinJuego;
