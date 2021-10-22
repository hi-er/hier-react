import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
  'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),

};
import Firebase from '../firestoredb';
const auth = Firebase.auth();

export default class ForgotPassword extends React.Component {
 

  state={
    email:"",
    password:"",
    fontsLoaded: false,
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    await this.setState({ fontsLoaded: true });
  }

 
  
 async componentDidMount() {
  await this._loadFontsAsync();
 }
  

  PostForgotPassword(){
    Firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(function (user) {
      alert('Please check your email...')
      this.props.navigation.navigate("SignIn");

    }).catch(function (e) {
      console.log("error "+ e)
    })
  }

  render(){
    if (this.state.fontsLoaded) {

    return (
      <View style={styles.container}>
        
       
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="enter email address" 
            placeholderTextColor="#bbb"

            onChangeText={text => this.setState({email:text})}/>
        </View>
       
      
        <TouchableOpacity style={styles.loginBtn} onPress={this.PostForgotPassword.bind(this)}>
          <Text style={styles.loginText}>forgot password</Text>
        </TouchableOpacity>
       
  
      </View>
    );
  }



else {
  return <AppLoading />;
}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03a4aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"90%",
    backgroundColor:"#fff",
    borderRadius:3,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    padding:10
  },
  inputText:{
    height:50,
    color:"#808080",
    fontFamily:"SpartanMedium",
    fontSize:18 
  },
  loginBtn:{
    width:"80%",
   color:"#03a4aa",
    borderRadius:1,
    height:50,
    alignItems:"center",
    justifyContent:"center",
 
  },
  loginText:{
    color:"#0f3360",
    fontSize:24,
    fontFamily:"SpartanMedium"
  }
});
