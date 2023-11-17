import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import foto from '../../assets/fotoMoria.jpg';
const ExampleCarouselImage = ({ text }) => {
  return (
    
      <Image
        style={styles.carouselImage}
        source={{ uri: foto }}
        resizeMode="cover"
      />
    
  );
};

const styles = StyleSheet.create({
  carouselImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
});

export default ExampleCarouselImage;