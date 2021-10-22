import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,View
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function CustomTitle({children }) {
  return (
      <View>
    <Text style={styles.text}>
        {children} 
    </Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
  text: {
    alignSelf: 'center',
    color: '#fff',
    margin:4,
   marginLeft:"10%",
   marginRight:"10%",
    fontSize:24,
  },
});