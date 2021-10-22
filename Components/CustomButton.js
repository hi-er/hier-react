import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function CustomButton({onPress, children }) {
  return (
    <TouchableOpacity  onPress={onPress} style={styles.button}>

      <Text style={styles.text}>
        {children} 
      </Text>
     
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    
    width:width/2,
    borderRadius: 10,
    
    backgroundColor:"#0f3360"
    },
  text: {
    alignSelf: 'center',
    color: '#fff',

    paddingVertical:12,
    fontSize:20,
  },
});