import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
  'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),

};

export default class FirstOnboarding extends React.Component {
 
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
  

  render(){
    if (this.state.fontsLoaded) {
    return (
      <View style={styles.container}>
              <Image
      resizeMode="contain"
      style={{height:"50%"}}
      source={require('../assets/Koala.png')}
    />
        <Text style={{fontSize:32,textAlign:"center",paddingLeft:24,paddingRight:24,fontFamily:'SpartanBold',color:"#fff"}}>hi there.</Text>
      
          <View style={{height:25}}></View>
          <Text style={{fontSize:28,textAlign:"center", width:"70%",fontFamily:"SpartanBold",color:"#fff"}}>tell us about you and your skills</Text>
          <TouchableOpacity  style={styles.loginBtn} onPress={()=> this.props.navigation.navigate("SecondOnboarding")}>
          <Text style={{color:"#fff",fontFamily:"SpartanMedium",fontSize:22}}>get started</Text>
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
    flexDirection:"column",
    fontFamily:'Inter-Black'
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
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:3,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"50%",
    padding:7,
   color:"#fff",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    fontFamily: 'LeagueSpartan',
    marginBottom:10,
    backgroundColor:"#0f3360",
  },
  loginText:{
    color:"#0f3360",
    fontFamily: 'LeagueSpartan',
    fontSize:18,
    
  }
});
