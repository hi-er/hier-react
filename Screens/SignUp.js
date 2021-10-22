import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
import * as Font from 'expo-font';

export default class SignUp extends React.Component {
 

  state={
    email:"",
    password:"",
    fontsLoaded: false,
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={{padding:10,color:"#fff",fontWeight:"bold",fontSize:24,marginBottom:12}}>you're almost in!</Text>
        <Text style={{color:"#fff",marginBottom:10}}>what is your minimum hourly rate?</Text>
       <View style={styles.inputView} >
        
          <TextInput  
            style={styles.inputText}
            placeholder="$XXX,XXX" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>

        <Text style={{color:"#fff",marginBottom:10}}>what is your minimum annual salary?</Text>
       <View style={styles.inputView} >
        
          <TextInput  
            style={styles.inputText}
            placeholder="$XXX,XXX" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={{height:1.2,backgroundColor:'#0f3360',margin:13,width:"100%"}}><Text></Text></View>

        <Text style={{color:"#fff",marginBottom:10,fontSize:22}}>sign up</Text>
        <View style={{flexDirection:"row"}}>
        <View style={styles.inputView1}>
        
        <TextInput  
          style={styles.inputText}
          placeholder="first name" 
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({email:text})}/>
      </View>
      <View style={styles.inputView2} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="phone number" 
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({email:text})}/>
      </View>

      </View>

      <View style={styles.inputView} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="email address" 
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({email:text})}/>
      </View>
      <View style={styles.inputView} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="password" 
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({email:text})}/>
      </View>

        
      
      <TouchableOpacity  style={styles.loginBtn}>
          <Text style={{color:"#fff"}}>sign up</Text>
        </TouchableOpacity>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03a4aa',
    alignItems: 'center',
    justifyContent: 'center',
    color:"#fff"
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
    alignItems:"flex-start",
    padding:20,
    color:"#fff"
  },
  inputView1:{
    width:"38%",
    backgroundColor:"#fff",
    borderRadius:3,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    alignItems:"flex-start",
    padding:20,
    color:"#fff",
    marginRight:10
  },
  inputView2:{
    width:"38%",
    backgroundColor:"#fff",
    borderRadius:3,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    alignItems:"flex-start",
    padding:20,
    color:"#fff",
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
    width:"80%",
   color:"#03a4aa",
    borderRadius:1,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    fontFamily: 'LeagueSpartan',
    marginBottom:10,
    fontWeight:"bold"
  },
  loginText:{
    color:"#0f3360",
    fontFamily: 'LeagueSpartan',
    fontSize:18
  },
  loginBtn:{
    width:"60%",
    padding:7,
   color:"#fff",
    borderRadius:5,
    height:40,
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
