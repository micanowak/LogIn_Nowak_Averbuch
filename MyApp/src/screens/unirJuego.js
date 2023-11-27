import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import axios from 'axios';

const unirJuego = () => {
    const [listCountries, setListCountries] = useState([]);
    const [randomCountries, setRandomCountries] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [shuffledNames, setShuffledNames] = useState([]);
    const [esIgual, setEsIgual] = useState(true);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [answer5, setAnswer5] = useState('');
    const [answer6, setAnswer6] = useState('');


    useEffect(() => {
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
            .then(res => {
                setListCountries(res.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (listCountries.length > 0) {
            const randomCountriesData = getRandomCountries();
            setRandomCountries(randomCountriesData);
            const names = randomCountriesData.map((country) => (country.name))
            console.log(names);
            setShuffledNames(names);
        }
    }, [listCountries]);

    const getRandomCountries = () => {
        let iii = 0;
        const randomIndexes = [];
        while (randomIndexes.length < 6) {
            const randomIndex = Math.floor(Math.random() * listCountries.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
        const randomCountriesData = randomIndexes.map(index => {
            const country = listCountries[index];
            iii = iii + 1;
            return {
                flag: country.flag,
                name: country.name,
                index: iii
            };
        });

        return randomCountriesData;
    };

    const answer1Handler = (resp) => {
        setAnswer1(resp.target.value);
    }
    const answer2Handler = (resp) => {
        setAnswer2(resp.target.value);
    }
    const answer3Handler = (resp) => {
        setAnswer3(resp.target.value);
    }
    const answer4Handler = (resp) => {
        setAnswer4(resp.target.value);
    }
    const answer5Handler = (resp) => {
        setAnswer5(resp.target.value);
    }
    const answer6Handler = (resp) => {
        setAnswer6(resp.target.value);
    }


    const renderCountryItem = (item) => (
        <View style={styles.countryItem}>
            <View style={styles.countryDetails}>
                <Text style={styles.countryName}>{item.index}.</Text>
            </View>
            <Image
                style={styles.countryImage}
                source={{ uri: item.flag }}
            />
            <View style={styles.countryDetails}>
                <Text style={styles.countryName}>{item.name}</Text>
            </View>
        </View>
    );


    const buttonOnsubmitHandler = () => {
        if (answer1 === randomCountries[0].name && answer2 === randomCountries[1].name && answer3 === randomCountries[2].name && answer4 === randomCountries[3].name && answer5 === randomCountries[4].name && answer6 === randomCountries[5].name) {
            setMensaje("Muy Bien!!")
        } else {
            setMensaje("Te equivocaste :(");
        }
    }


    return (
        <View>
            <View>
                {shuffledNames.map((item, index) => (
                    <Text key={index} style={styles.textButton}>
                        {item}
                    </Text>
                ))}
                {randomCountries.map((item) => (renderCountryItem(item)))}
                <View style={styles.countryDetails}>
                    <Text style={styles.countryName}>1.</Text>
                    <TextInput
                        value={answer1}
                        setValue={setAnswer1}
                        placeholder="Ingrese Nombre del País en Inglés"
                        placeholderTextColor={styles.placeholderStyle.color}
                        style={styles.eachForm}
                        onChange={answer1Handler}
                    />
                    <Text style={styles.countryName}>2.</Text>
                    <TextInput
                        value={answer2}
                        setValue={setAnswer2}
                        placeholder="Ingrese Nombre del País en Inglés"
                        placeholderTextColor={styles.placeholderStyle.color}
                        style={styles.eachForm}
                        onChange={answer2Handler}
                    />
                    <Text style={styles.countryName}>3.</Text>
                    <TextInput
                        value={answer3}
                        setValue={setAnswer3}
                        placeholder="Ingrese Nombre del País en Inglés"
                        placeholderTextColor={styles.placeholderStyle.color}
                        style={styles.eachForm}
                        onChange={answer3Handler}
                    />
                    <Text style={styles.countryName}>4.</Text>
                    <TextInput
                        value={answer4}
                        setValue={setAnswer4}
                        placeholder="Ingrese Nombre del País en Inglés"
                        placeholderTextColor={styles.placeholderStyle.color}
                        style={styles.eachForm}
                        onChange={answer4Handler}
                    />
                    <Text style={styles.countryName}>5.</Text>
                    <TextInput
                        value={answer5}
                        setValue={setAnswer5}
                        placeholder="Ingrese Nombre del País en Inglés"
                        placeholderTextColor={styles.placeholderStyle.color}
                        style={styles.eachForm}
                        onChange={answer5Handler}
                    />
                    <Text style={styles.countryName}>6.</Text>
                    <TextInput
                        value={answer6}
                        setValue={setAnswer6}
                        placeholder="Ingrese Nombre del País en Inglés"
                        placeholderTextColor={styles.placeholderStyle.color}
                        style={styles.eachForm}
                        onChange={answer6Handler}
                    />
                    <TouchableOpacity style={styles.button} onPress={buttonOnsubmitHandler}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                    <Text>{mensaje}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    headerContainer: {

        height: 80,
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

    }, placeholderStyle: {
        color: '#1a4b8e',
        fontWeight: 300
    },
    button: {
        backgroundColor: '#E742EB', margin: 10, padding: 10, borderRadius: 15, width: '35%', alignContent: 'center', alignItems: 'center',
    },
    textButton: {
        color: 'white'

    },
    mainContainer: {
        flex: 1,
        padding: 10,
    },
    footerContainer: {
        height: 120,
    },
    countryItem: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    countryImage: {
        width: 100,
        height: 60,
    },
    countryDetails: {
        marginTop: 5,
        alignItems: 'center',
    },
    countryName: {
        fontWeight: 'bold',
        color: 'white',

    },
});

export default unirJuego;