import React from 'react';
import {
Image,
  Dimensions,StyleSheet
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function CustomLogo() {
  return (
    <Image
    source={require('../assets/180.png')}
  />
  );
}

const styles = StyleSheet.create({
 
});