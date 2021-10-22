import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,KeyboardAvoidingView, Keyboard ,ActivityIndicator} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Application from 'expo-application';
import Firebase from '../firestoredb';


let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
  'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),

};
export default class SignIn extends React.Component {
 

  state={
    email:"",
    password:"",
    fontsLoaded: false,
  }
 
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

 
  
 async componentDidMount() {
  await this._loadFontsAsync();
  
Firebase.auth().onAuthStateChanged((user) => {  
    if (user==null) {
      this.setState({ fontsLoaded: true });

    }
    else
    {
      var a=JSON.stringify(user)
      var b=user.email;
      this.setState({ fontsLoaded: true });

    this.props.navigation.navigate("FifthOnboarding");

    }
  });
 
 }
 PostLogin(){
   this.setState({
     fontsLoaded:false
   })

Keyboard.dismiss();
  Firebase.auth()
  .signInWithEmailAndPassword(this.state.email,this.state.password)
  .then(() => {
   this.setState({
     fontsLoaded:true
   })
    this.props.navigation.navigate("FifthOnboarding");

  })
  .catch(error => {
    this.setState({
      fontsLoaded:true
    })
    if (error.code === 'auth/email-already-in-use') {
      
      alert('That email address is already in use!');
    }

    else if (error.code === 'auth/invalid-email') {
      
      alert('Email address is invalid!');
    }
else{
  alert("Email or password is invalid! Please try again!")
}
  });
 }
  render(){
    if (this.state.fontsLoaded) {
    return (
      <View style={styles.container}>
              <KeyboardAvoidingView  behavior="padding" style={{ alignItems: 'center',marginTop:20,
    justifyContent: "flex-start",width:"100%"}}>

        <Image
        resizeMode="contain"
      style={{width:"30%"}}
        source={require('../assets/180.png')}
      />
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="e-mail address" 
            keyboardType="email-address"
            placeholderTextColor="#bbb"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >

          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="password" 
            placeholderTextColor="#bbb"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.PostLogin.bind(this)}>
          <Text style={styles.loginText}>sign in</Text>
        </TouchableOpacity>
        <View style={{height:"35%",justifyContent:"flex-end",alignItems:"center"}}>
        <TouchableOpacity style={{marginBottom:50}} onPress={()=> this.props.navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot} >forgot password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("FirstOnboarding")}>
          <Text style={styles.loginText}>create account</Text>
        </TouchableOpacity>
</View>
        </KeyboardAvoidingView>

      </View>
    );
    }
    else {
      return(
        <View style={{backgroundColor:"#03a4aa",justifyContent:"center",alignItems:"center",flex:1}}>
        <ActivityIndicator size="large" color="#0000ff" />
        </View>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03a4aa',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  forgot:{
    color:"#0f3360",
    fontSize:16,
    fontFamily:"SpartanMedium"
  },
  loginBtn:{
   color:"#03a4aa",
    borderRadius:1,
    height:50,
    alignItems:"center",
    justifyContent:"center",
 
    fontFamily:"SpartanMedium"
  },
  loginText:{
    color:"#0f3360",
    fontSize:24,
    fontFamily:"SpartanMedium"
  }
});
