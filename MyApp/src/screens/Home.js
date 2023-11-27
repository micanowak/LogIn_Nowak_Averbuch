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
import SelectDropdown from 'react-native-select-dropdown';

const Home = () => {

  const navigation = useNavigation();
  const [OpcionJuego, setOpcionJuego] = useState(0);

  const selectOptions = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];

  const adivinaBanderaHandler = () => {
    navigation.navigate("Juego");
  }
  const UnirHandler = () => {
    navigation.navigate("unirJuego");
  }

  return (
    <View>
      <View>
        <Text>Juegos con Banderas y páises</Text>
      </View>
      <TouchableOpacity onPress={adivinaBanderaHandler}>
        <Text>Adivina la bandera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={UnirHandler}>
        <Text>Unir Banderas con sus nombres</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown:{
    backgroundColor: 'white',
    borderColor: '#E742EB',
    borderRadius: 15,
    borderWidth: 2,
    paddingLeft: 10,
    padding: 5,
    marginRight: 5,
    marginBottom: 20,
    width:'100%',
    height:'auto'
},
textDropdown:{
    color:'#1a4b8e',
    fontSize:'14px',
    fontWeight: 600,
    textAlign: 'justify'
},
});

export default Home;
