import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image ,Linking} from 'react-native';
import * as Font from 'expo-font';
import Firebase from '../firestoredb';

export default class JobSuccess extends React.Component {
 
    constructor(props) {
        super(props);
  this.state={
    email:"",
    password:"",
    fontsLoaded: false,
    companyLogo:"",
    companyURL:""
  }
}
  componentWillMount(){
  var params2=JSON.stringify(this.props.route.params.opp2)
  var p3=JSON.parse(params2);
  console.log("abcde "+p3.url);
this.setState({
    companyURL:p3.url
})
  if(p3.logo!=""){
 
    this.setState({companyLogo: p3.logo});
   
}
else
{
  this.setState({
    companyLogo:""
  })
}

  }
  render(){
    return (
      <View style={styles.container}>
        
       
       <Image 
       resizeMode="contain" style={{height:160,width:300}}
                                source={require('../assets/success.png')}
                            />
                           
                
                            {this.state.companyLogo!=""?
                            <View>
                              {this.state.companyURL!=""?
                                <TouchableOpacity  onPress={() => Linking.openURL(this.state.companyURL)}>
                                <Image 
                                      source = {{ uri: this.state.companyLogo }}
                                      style={{ width: 300,resizeMode:"contain",
                                      height: 160,margin:20,
                                      aspectRatio: 1,}} />
                                      </TouchableOpacity>:
                                       <Image 
                                       source = {{ uri: this.state.companyLogo }}
                                       style={{ width: 300,resizeMode:"contain",
                                       height: 160,margin:20,
                                       aspectRatio: 1,}} />  
                            }
                              </View>
                         
                                  :
                                  <View>
                                    {this.state.companyURL!=""?
                                    <TouchableOpacity  onPress={() => Linking.openURL(this.state.companyURL)}>
                                   <Image 
                                           source={require('../assets/80.png')}
                                           style={{ width: 300,resizeMode:"contain",
                                           height: 160,margin:20,
                                           aspectRatio: 1,}} />
                                          </TouchableOpacity>:
                                           <Image 
                                           source={require('../assets/80.png')}
                                           style={{ width: 300,resizeMode:"contain",
                                           height: 160,margin:20,
                                           aspectRatio: 1,}} />
                                      }
                                    </View>
                                 
                            }




 <TouchableOpacity  style={{justifyContent:"center",alignItems:"center"}}
 onPress={()=>this.props.navigation.navigate("Home")}> 

<Image 
       resizeMode="contain" style={{height:100,width:100}}
                                source={require('../assets/look.png')}
                            />
      
       
          <Text style={styles.loginText}>keep searching</Text>
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
    height:"100%"
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
    width:"80%",
   color:"#03a4aa",
    borderRadius:1,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"#fff",
    fontFamily: 'SpartanBold',
    fontSize:20
  }
});
