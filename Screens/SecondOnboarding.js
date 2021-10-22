import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,ActivityIndicator,
SafeAreaView,ScrollView,Alert
} from  'react-native';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'; 

let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
  'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),

};


const items=["a","b","c"];
export default class SecondOnboarding extends React.Component {
 
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    await this.setState({ fontsLoaded: true });
  }

 
  
 async componentDidMount() {
  await this._loadFontsAsync();
 }
  


  state={
    isFullTime:false,
    isCasual:false,
    isRemote:false,
    isTravel:false,
    isOffice:false,
    isRelocate:false,
    isActive:false,
    isDriving:false,
    isHospitality:false,
    isRetail:false,
    isEducation:false,
    isTrade:false
    
  }
  toggleFullTime(){
    this.setState({
      isFullTime:!this.state.isFullTime
    })
  }
  togglePartTime(){
    this.setState({
      isCasual:!this.state.isCasual
    })
  }
  toggleRemote(){
    this.setState({
      isRemote:!this.state.isRemote
    })
  }
  
  toggleTravel(){
    this.setState({
      isTravel:!this.state.isTravel
    })
  }
  
  toggleOffice(){
    this.setState({
      isOffice:!this.state.isOffice
    })
  }
  
  toggleRelocate(){
    this.setState({
      isRelocate:!this.state.isRelocate
    })
  }
  
  toggleActive(){
    this.setState({
      isActive:!this.state.isActive
    })
  }
  
  toggleDriving(){
    this.setState({
      isDriving:!this.state.isDriving
    })
  }
  
  toggleHospitality(){
    this.setState({
      isHospitality:!this.state.isHospitality
    })
  }
  toggleRetail(){
    this.setState({
      isRetail:!this.state.isRetail
    })
  }
  
  toggleEducation(){
    this.setState({
      isEducation:!this.state.isEducation
    })
  }
  toggleTrade(){
    this.setState({
      isTrade:!this.state.isTrade
    })
  }
  
GotoThirdOnboarding(){
  if(this.state.isFullTime==false &&
    this.state.isCasual==false &&
    this.state.isOffice==false &&
    this.state.isRemote==false &&
    this.state.isHospitality==false &&
    this.state.isActive==false &&
    this.state.isRetail==false && 
    this.state.isEducation==false && 
    this.state.isTrade==false && 
    this.state.isDriving==false)
    {
      //alert("Please select at least on work type");
      Alert.alert(
        "Error Occured!",
        "Please select at least one work type",
        [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel"
          // },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    }
    else{
  this.props.navigation.navigate("ThirdOnboarding",{
    isFullTime:this.state.isFullTime,
    isCasual:this.state.isCasual,
    isOffice:this.state.isOffice,
    isRemote:this.state.isRemote,
    isHospitality:this.state.isHospitality,
    isActive:this.state.isActive,
    isRetail:this.state.isRetail,
    isEducation:this.state.isEducation,
    isTrade:this.state.isTrade,
    isDriving:this.state.isDriving});
  }
}


  render(){
    const isFullTime = this.state;
    if (this.state.fontsLoaded) {
    return (
      
      <View style={styles.container}>
      
              {/* <Image
      resizeMode="contain"
      style={{height:210}}
      source={require('../assets/Koala.png')}
    /> */}
     <View style={{height:40}}></View>
        <Text style={{fontSize:26,color:"#fff",textAlign:"center",fontFamily:"SpartanBold"}}>how do you like to work?</Text>
      
       
          <View style={{flex:1,flexDirection:"column"}}>
            <ScrollView>
            <View style={{height:25}}></View>
         <View style={{flex:1,flexDirection:"row",margin:5}}>
      
          <TouchableOpacity  onPress={()=> this.toggleFullTime()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
         
              {!this.state.isFullTime?
                  <Image
                    resizeMode="contain"
                    style={{height:70}}
                    source={require('../assets/icons/FullTime.png')}
                  />:
                  <Image
                    resizeMode="contain"
                    style={{height:70}}
                    source={require('../assets/icons/FullTime_Selected.png')}
                  />
                  
              }
              <Text style={{color:!this.state.isFullTime?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>full time</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> this.togglePartTime()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
         
         {!this.state.isCasual?
             <Image
               resizeMode="contain"
               style={{height:70}}
               source={require('../assets/icons/PartTime.png')}
             />:
             <Image
               resizeMode="contain"
               style={{height:70}}
               source={require('../assets/icons/PartTime_Selected.png')}
             />
             
         }
         <Text style={{color:!this.state.isCasual?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>casual</Text>
     </TouchableOpacity>
   </View>
  

   <View style={{flex:1,flexDirection:"row",margin:5}}>
      
          <TouchableOpacity  onPress={()=> this.toggleOffice()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
         
              {!this.state.isOffice?
                  <Image
                    resizeMode="contain"
                    style={{height:70}}
                    source={require('../assets/icons/Office.png')}
                  />:
                  <Image
                    resizeMode="contain"
                    style={{height:70}}
                    source={require('../assets/icons/Office_Selected.png')}
                  />
                  
              }
              <Text style={{color:!this.state.isOffice?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>office</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> this.toggleRemote()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
         
         {!this.state.isRemote?
             <Image
               resizeMode="contain"
               style={{height:70}}
               source={require('../assets/icons/Remote.png')}
             />:
             <Image
               resizeMode="contain"
               style={{height:70}}
               source={require('../assets/icons/Remote_Selected.png')}
             />
             
         }
         <Text style={{color:!this.state.isRemote?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>remote</Text>
     </TouchableOpacity>
   </View>
  
   <View style={{flex:1,flexDirection:"row",margin:5}}>
      
      <TouchableOpacity  onPress={()=> this.toggleHospitality()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
     
          {!this.state.isHospitality?
              <Image
                resizeMode="contain"
                style={{height:70}}
                source={require('../assets/icons/Hospitality.png')}
              />:
              <Image
                resizeMode="contain"
                style={{height:70}}
                source={require('../assets/icons/Hospitality_Selected.png')}
              />
              
          }
          <Text style={{color:!this.state.isHospitality?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>hospitality</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=> this.toggleActive()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
     
     {!this.state.isActive?
         <Image
           resizeMode="contain"
           style={{height:70}}
           source={require('../assets/icons/Gym.png')}
         />:
         <Image
           resizeMode="contain"
           style={{height:70}}
           source={require('../assets/icons/Gym_Selected.png')}
         />
         
     }
     <Text style={{color:!this.state.isActive?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>active</Text>
 </TouchableOpacity>
</View>


<View style={{flex:1,flexDirection:"row",margin:5}}>
      
      <TouchableOpacity  onPress={()=> this.toggleRetail()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
     
          {!this.state.isRetail?
              <Image
                resizeMode="contain"
                style={{height:70}}
                source={require('../assets/icons/Retail.png')}
              />:
              <Image
                resizeMode="contain"
                style={{height:70}}
                source={require('../assets/icons/Retail_Selected.png')}
              />
              
          }
          <Text style={{color:!this.state.isRetail?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>retail</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=> this.toggleEducation()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
     
     {!this.state.isEducation?
         <Image
           resizeMode="contain"
           style={{height:70}}
           source={require('../assets/icons/Education.png')}
         />:
         <Image
           resizeMode="contain"
           style={{height:70}}
           source={require('../assets/icons/Education_Selected.png')}
         />
         
     }
     <Text style={{color:!this.state.isEducation?"#fff":"#0f3360",fontSize:18,marginTop:10}}>education</Text>
 </TouchableOpacity>
</View>
<View style={{flex:1,flexDirection:"row",margin:5}}>
      
      <TouchableOpacity  onPress={()=> this.toggleTrade()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
     
          {!this.state.isTrade?
              <Image
                resizeMode="contain"
                style={{height:70}}
                source={require('../assets/icons/Trade.png')}
              />:
              <Image
                resizeMode="contain"
                style={{height:70}}
                source={require('../assets/icons/Trade.png')}
              />
              
          }
          <Text style={{color:!this.state.isTrade?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>trade</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=> this.toggleDriving()} style={{zIndex: 1, aspectRatio: 1.5,width: '47%',alignItems:"center",justifyContent:"center",padding:5,margin:5}}>
     
     {!this.state.isDriving?
         <Image
           resizeMode="contain"
           style={{height:70}}
           source={require('../assets/icons/Driving.png')}
         />:
         <Image
           resizeMode="contain"
           style={{height:70}}
           source={require('../assets/icons/Driving_Selected.png')}
         />
         
     }
     <Text style={{color:!this.state.isDriving?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>driving</Text>
 </TouchableOpacity>
</View>



   <View style={{height:50}}></View>
       </ScrollView>
      </View>
      <TouchableOpacity  style={styles.loginBtn} onPress={()=> this.GotoThirdOnboarding()}>
          <Text style={{color:"#fff",fontFamily:"SpartanMedium",fontSize:22}}>next</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    flexDirection:"column"
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
    fontFamily: 'SpartanMedium',
    fontSize:18,
    
  }
});
