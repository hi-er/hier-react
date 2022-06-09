import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,ActivityIndicator,BackHandler,Alert,
SafeAreaView,ScrollView,Share,
} from  'react-native';
import { FlatGrid } from 'react-native-super-grid';
const items=["a","b","c"];
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
};

const onShare = async () => {
  try {
    const result = await Share.share({
      message: "Join me on the new hi-er app to be matched with local jobs. Don't miss out! Check out hi-er and share with your mates http://hi-er.com",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    alert(error.message);
  }
};
export default class FifthOnboarding extends React.Component {
 
   


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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

   await this._loadFontsAsync();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
   } 

  render(){
    if (this.state.fontsLoaded) {

    return (
     <View>
      <View style={styles.container}>
      
              <Image
      resizeMode="contain"
      style={{height:210}}
      source={require('../assets/Koala.png')}
    />
        <Text style={{fontSize:24,color:"#fff", textAlign:"center",fontFamily:"SpartanBold",paddingLeft:24,paddingRight:24}}>
          you will receive a </Text>
          <Text style={{fontSize:24,color:"#fff",textAlign:"center",fontFamily:"SpartanBold",paddingLeft:24,paddingRight:24}}>
          notification from hi-er when </Text>
          <Text style={{fontSize:24,color:"#fff",textAlign:"center",fontFamily:"SpartanBold",paddingLeft:24,paddingRight:24}}>
          jobs are </Text>
          <Text style={{fontSize:24,color:"#fff",textAlign:"center",fontFamily:"SpartanBold",paddingLeft:24,paddingRight:24}}>
           available in your location</Text>
     
      </View>
      <View style={styles.container1}>
        <Text style={{color:"#0f3360",fontSize:20,fontFamily:"SpartanBold"}}>share with your mates</Text>
        <TouchableOpacity  onPress={onShare}>
          <Image
      resizeMode="contain"
      style={{height:80}}
      source={require('../assets/share.png')}
    />
        </TouchableOpacity>
        
       
        
      </View> 
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Home")}>
          <Text style={{color:"#03a4aa",fontFamily:"SpartanBold",fontSize:16,textAlign:"right",marginRight:18}}>Skip</Text>
        </TouchableOpacity>
          </View>
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
   height:"58%",
    backgroundColor: '#03a4aa',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"column"
  },
  bottomView: {
   
    marginTop:"auto",
     justifyContent: 'flex-end',
     alignItems: 'flex-end',
  width:"100%",
  padding:4
   },
  container1: {
   marginTop:20,
   height:"30%",
    alignItems: 'center',
    justifyContent: "flex-start",
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
    width:"auto",
    padding:7,
   color:"#fff",
    borderRadius:5,
    height:40,
    alignItems:"flex-end",
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
    
  },
  submitButton: {
    flex: 1,
    flexDirection:'row',
    position:'absolute',
    bottom:10,
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 20
}
});
