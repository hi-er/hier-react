import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,View
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function CustomText({children }) {
  return (
     
    <Text style={styles.text}>
        {children} 
    </Text>
   
  );
}

const styles = StyleSheet.create({
 
  text: {
    alignSelf: 'center',
    color: '#fff',
    margin:1,
 
    fontSize:16,
  },
});