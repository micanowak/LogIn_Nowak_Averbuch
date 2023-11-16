import React, { useState, useEffect } from "react";
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native-web";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';
import {Container,Row,Col,Carousel} from 'react-bootstrap';
import ExampleCarouselImage from 'components/ExampleCarouselImage';
const Home = () => {
    const navigation = useNavigation();
    const router = useRoute();
    const baseURL = "http://localhost:3000/getUsuarioById/";
    const idUsuario = router.params;
    console.log(idUsuario);

    const [perfilCompleto, setPerfilCompleto] = useState(true);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [apellidoUsuario, setApellidoUsuario] = useState('');
    const [pokemos, setPokemones] = useState([]);



    const perfilOnClickHandler = () => {
        navigation.navigate("Perfil", {idUsuario, nombreUsuario, apellidoUsuario});
    } 

    useEffect(() => {
        axios
            .get(baseURL + idUsuario)
            .then((response) => {
                if (response.status === 200) {
                    setApellidoUsuario(response.data.apellido);
                    setNombreUsuario(response.data.nombre);
                    console.log(apellidoUsuario, nombreUsuario);
                    if (nombreUsuario == '' && apellidoUsuario == '') {
                        setPerfilCompleto(false);
                    }
                }
            })
            .catch((error) => {
                // Handle error here
                console.error(error);
            });
    }, []);

    console.log(perfilCompleto);
    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/`)
        .then((res)=>{
            console.log(res.data);
            setPokemones(res.data)
        })
    },[]);

    return (
        <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fda3ff', width: '30%', color: 'black', marginTop: 10, marginLeft: '35%', padding: 12, borderRadius: 15,
    }
});

export default Home;   