import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import axios from 'axios';

const Detalle = () => {
  const [listCountries, setListCountries] = useState([]);

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then(res => {
        setListCountries(res.data.data);
        console.log(res.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Función para obtener 6 países aleatorios de la lista
  const getRandomCountries = () => {
    const randomIndexes = [];
    while (randomIndexes.length < 6) {
      const randomIndex = Math.floor(Math.random() * listCountries.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes.map(index => listCountries[index]);
  };

  const renderCountryItem = ({ item }) => (
    <View style={styles.countryItem}>
      <Image
        style={styles.countryImage}
        source={{ uri: item.flag }}
      />
      <View style={styles.countryDetails}>
        <Text style={styles.countryName}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}></View>
      <TouchableOpacity 
      style={styles.mainContainer}
      onPress={() => {
        
      }}
      >
        {listCountries.length > 0 ? (
          <FlatList
            data={getRandomCountries()}
            keyExtractor={(item) => item.iso2}
            renderItem={renderCountryItem}
            numColumns={2}
          />
        ) : (
          <Text>Error</Text>
        )}
      </TouchableOpacity>
      <View style={styles.footerContainer}></View>
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
    color:'white',

  },
});

export default Detalle;
