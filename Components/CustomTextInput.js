import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function CustomTextInput({onChangeText,placeholder,secureTextEntry,keyboardType,width }) {
  return (
    <TextInput placeholder={placeholder}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#003f5c" onChangeText={onChangeText} style={styles.textInput}>

     
    </TextInput>
  );
}

const styles = StyleSheet.create({
    textInput: {
    
    width:width/1.2,
   borderRadius:5,
   height:40,
    backgroundColor:"#fff",
    margin:2,
    },
 
});