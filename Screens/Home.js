import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,Dimensions,Permissions,Platform,
  Switch,BackHandler,TouchableHighlight,TouchableWithoutFeedback,ActivityIndicator
 } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView,{Marker,Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 

import Firebase from '../firestoredb';
import Geocoder from 'react-native-geocoding';

let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
  'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),

};

export default class Home extends React.Component {
 

  state={
    email:"",
    password:"",
    fontsLoaded: false,
    currentUser:null,
    currentUserData:"name",
    mapRegion: {
      latitude:0,
      longitude:0,
      latitudeDelta:0.09,
      longitudeDelta:0.02,
    },
    mapRegion1: {
      latitude:16.6898643,
      longitude:74.2201838,
      latitudeDelta:0.09,
      longitudeDelta:0.02
    },
    
    hasLocationPermissions: false,
    locationResult: null,
    setLocation:null,
    isEnabled:true, setIsEnabled:false,
    opportunityList:[],
    filterOppList:[],
    markerList:[],
    companyName:"welcome to hi-er!",
    jobCount:0,
    profileImageUrl:"",
    companyLogo:""
  }
  toggleSwitch(){
    
    this.setState({
      companyName:"welcome to hi-er!",
      companyLogo:"",
      isEnabled:!this.state.isEnabled
    })
    this.GetOpportunityList();
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);

  }
  handleBackButton = () => {
    this.props.navigation.goBack(null);

     return true;
   } 
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

      }
  
 async componentDidMount() {
      let { status } = await Location.requestForegroundPermissionsAsync();
    //let { status } = await Permissions.askAsync(Permissions.Location);
    console.log("status "+JSON.stringify(status))
    if (status !='granted') {
      alert('Permission to access location was denied');
      return;
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
 
    
    await this._loadFontsAsync();

   let location = await Location.getCurrentPositionAsync({});
   await  this.getLocationAsync();
    
  
    
    try {

        
             Firebase.auth().onAuthStateChanged((user) => {  
              if (user==null) {

                this.props.navigation.navigate("SignIn");

              }
              else
              {
                
               
                Firebase.firestore().collection('users').doc(user.uid).get()
                .then(async snapshot => {
                    const data = snapshot.data();


                    const items = [['UserID', JSON.stringify(user.uid)], ['UserData', JSON.stringify(data)]]
                    AsyncStorage.multiSet(items, () => {
                    
                        var data1=JSON.stringify(data);
                      this.setState({
                        currentUser:data1,
                      })
                      var currentUser=JSON.parse(data1);
                      var name=currentUser.firstName;
                      this.setState({
                        currentUserData:name
                      })
                    });

                    await this.GetOpportunityList();
                    await this.setState({ fontsLoaded: true });


                  
                })
                .catch(err => {

                  console.log('Error getting documents'+err);
                });

              }
            });

  } catch (error) {
  
  }

  

   
  }



  async getLocationAsync() {
    await Location.enableNetworkProviderAsync().then().catch(_ => null);
  const status = await Location.hasServicesEnabledAsync();
  console.log("2"+status)
  let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.09 //Very high zoom level
//const LATITUDE_DELTA = 0.01 //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
   const data= Location.watchPositionAsync({ enableHighAccuracy: true }, (loc) => { 

    this.setState({
      mapRegion: {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    });


   });


  }

    async GetOpportunityList(){
    var opportunityArray=[];
    var markerArray=[];
     Firebase.firestore()
    .collection('opportunities')
    .get()
    .then( async snapshot => {
      
      snapshot
        .docs
        .forEach( doc => {
          
          var strCurrentOpportunity=JSON.stringify(doc.data());
          console.log();
          var oppData=JSON.parse(strCurrentOpportunity);
          var currentOpportunity=oppData;
          
          var obj={
            "logo":oppData.logo,
            "jobTitle":oppData.jobTitle,
            "url":oppData.url,
            "address":oppData.address,
            "appliedUser":oppData.appliedUser,
            "longDescription":oppData.longDescription,
            "maxSalary":oppData.maxSalary,
            "rejected":oppData.rejected,
            "shortDescription":oppData.shortDescription,
            "skills":oppData.skills,
            "companyName":oppData.companyName,
            "id":doc.id
          }
          
          if(this.state.isEnabled==false){
            
            opportunityArray.push(obj);
          }
          else
          {
            var currentUser=JSON.parse(this.state.currentUser);
            console.log("skills - "+currentUser.skills);

            var strCurrentOpportunity=JSON.stringify(doc.data());
            console.log();
            var currentOpportunity=JSON.parse(strCurrentOpportunity);
            
            for(var i=0;i<currentOpportunity.skills.length;i++)
            {
              for(var j=0;j<currentUser.skills.length;j++)
              {
                if(currentOpportunity.skills[i]==currentUser.skills[j])
                {
                  var d1=opportunityArray.some(item => obj.id === item.id);
                 
                  if(d1==false){
                  opportunityArray.push(obj);
                  }
                }
              }
            }
          }
        });
         this.setState({
          opportunityList:opportunityArray,
          filterOppList:opportunityArray,
          jobCount:opportunityArray.length
        })

        for(var i=0;i<opportunityArray.length;i++)
        {
          var opp1=JSON.stringify(opportunityArray[i]);

          var opp2=JSON.parse(opp1);
          var address=opp2.address;



         
              let result = await Location.geocodeAsync(opp2.address);
              var a=JSON.parse(JSON.stringify(result));
              var b=JSON.stringify(a[0]);
              var c=JSON.parse(b);
                 var obj={
                   "latitude":c.latitude,
                   "longitude":c.longitude,
                    "latitudeDelta":0.09,
                    "longitudeDelta":0.02,
                    "opportunity":opp2
                 }
                markerArray.push(obj);
    
        }
        await this.setState({
          markerList:markerArray
        })
       
    });
    
  }
  OnCallOutClick(marker){
    this.props.navigation.navigate("JobDetails");
  }
  async MarkerPressed(marker){
    var markerData=JSON.stringify(marker);
    console.log("aa");
     var markerObj=JSON.parse(markerData);
 
    var cn=markerObj.companyName;
    var jobCount=0;
    this.setState({
      jobCount:0
    })
    var opportunityArray=this.state.opportunityList;
    var filterOppArray=[];
    for(var i=0;i<opportunityArray.length;i++)
    {
      var opp1=opportunityArray[i];
    
      if(opp1.companyName==markerObj.opportunity.companyName && opp1.address==markerObj.opportunity.address)
      {
        jobCount++;
        filterOppArray.push(opp1);
      }
    }
    console.log("logo "+filterOppArray.length);

   
    await this.setState({
      companyName:marker.opportunity.companyName,
      jobCount:jobCount,
      filterOppList:filterOppArray,
    })
    if(marker.opportunity.logo!=""){
      console.log("marker logo "+marker.opportunity.logo)
    let imageRef = Firebase.storage().ref(marker.opportunity.logo);
  imageRef
    .getDownloadURL()
    .then((url) => {
      this.setState({companyLogo: url});
      console.log("url2 "+url);
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));
  
  }
  else
  {
    this.setState({
      companyLogo:""
    })
  }
  }
  handleMapRegionChange(region){
    let { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.07 //Very high zoom level
    //const LATITUDE_DELTA = 0.01 //Very high zoom level
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

    this.setState({
      mapRegion: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    });
  }
  GetRandomMarker(){
    var markerArray=this.state.markerList;

    var min=0, max=markerArray.length-1;

    var no=Math.floor(Math.random() * (max - min + 1) + min)

    this.MarkerPressed(markerArray[no]);
  }
//   shouldComponentUpdate(nextProps) {
//     return nextProps.latitude !== this.props.latitude && nextProps.longitude !== this.props.longitude;
// }
  RefreshList(){
    this.setState({    
      companyName:"welcome to hi-er!",
      companyLogo:""
    })
    this.GetOpportunityList();
  }
  render(){
   if (this.state.fontsLoaded) {
    return (
        <View style={styles.container}>

            <View style={{ flex: 1, backgroundColor: "#03a4aa",padding:5}} >
                <View style={{flexDirection:"row",marginTop:50,height:"30%"}}>
                        <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate("Profile",{userData:this.state.currentUser})}
                        style={{flexDirection:"column",width:"40%",alignItems:"flex-start"}}>
                           <Image 
                                source={require('../assets/80.png')}
                            />
                            <Text style={{fontSize:10,textAlign:"left",color:"#fff",fontFamily:"SpartanBold"}}>   Update Profile</Text>
                        </TouchableOpacity>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:20,color:"#fff",fontFamily:"SpartanBold"}}>
                                hi {this.state.currentUserData}!
                            </Text>
                        </View>
                </View>
<View style={{width:"100%",height:"5%"}}></View>
                <View style={{flexDirection:"row",width:"100%",height:"35%",backgroundColor:"#fff",borderColor:"0f3360",borderRadius:15,borderWidth:4}}>
                    <View style={{width:"70%",height:"100%",padding:5}}>
                        <Text style={{color:"#000",paddingTop:10,fontSize:16,fontFamily:"SpartanBold"}}>
                            {this.state.companyName}
                        </Text>
                        <View style={{width:"100%",height:10}}></View>
                        <Text style={{color:"#000",paddingTop:10,fontSize:16,fontFamily:"SpartanBold"}}>
                            we found {this.state.jobCount} 
                            {this.state.jobCount==1?
                           <Text> job </Text>:<Text> jobs </Text>   
                          }
                             for you. click on the map to apply.
                        </Text>
                    </View>
                    <View style={{width:"30%",height:"100%",justifyContent:"center",alignItems:"center"}}> 
                   
                          {this.state.companyLogo!=""?
                          <TouchableWithoutFeedback onPress={() =>
                          this.props.navigation.navigate("JobDetails",{opportunityArray:this.state.filterOppList}
                          )}>
                            <Image 
                                  source = {{ uri: this.state.companyLogo }}
                                  style={{ width: '90%',resizeMode:"contain",
                                  height: undefined,
                                  aspectRatio: 1,}} />
                                  </TouchableWithoutFeedback>
                                  :
                                  <TouchableWithoutFeedback onPress={() =>
                                    this.props.navigation.navigate("JobDetails",{opportunityArray:this.state.filterOppList}
                                    )}>
                                  <Image 
                                  source={require('../assets/80.png')}
                                  style={{ width: '90%',resizeMode:"contain",
                                  height: undefined,
                                  aspectRatio: 1,}} />
                                  </TouchableWithoutFeedback>
                            }

                    </View>
                </View>
                <View style={{flexDirection:"row",height:"18%",alignItems:"center",justifyContent:"center", padding:4}}>
                  <View style={{width:"70%",flexDirection:"row",alignItems:"center"}}>
                      <Text style={{fontFamily:"SpartanMedium",color:"#fff",marginLeft:4,marginRight:4,fontSize:19}}>only matched</Text>
                      <Switch 
        trackColor={{ false: '#767577', true: '#0394aa' }}
        thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      
        onValueChange={this.toggleSwitch.bind(this)}
        value={this.state.isEnabled}
      />

                  </View>
                  <View style={{width:"30%",flexDirection:"row",justifyContent:"flex-end"}}>
                    <TouchableOpacity onPress={()=> this.GetRandomMarker()}>
                    <EvilIcons name="refresh" size={35} color="#fff" style={{paddingRight:20,}} 
                      
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.RefreshList()}>
                      <EvilIcons style={{textAlign:"right"}} name="redo" size={35} color="#fff" />
                     </TouchableOpacity>
                  </View>
                </View>
            </View>
            

            <View style={{ flex: 1, backgroundColor: "#fff",borderWidth:3,borderColor:"#03a4aa",width:"100%" }}>
            <MapView.Animated
            
          style={styles.map}
          
          followsUserLocation = { true}
          showsCompass = { true}
          showsUserLocation = { true}
          
          shouldComponentUpdate ={false}
          tracksViewChanges={false}

          region={this.state.mapRegion}
          onRegionChangeComplete={(region, gesture) => {
            if (Platform.OS === 'android') {
              if (gesture.isGesture) {
                this.setState({ mapRegion: region })              
              }
            } else {
              this.setState({ mapRegion: region })
             }
          
        }}
         // onRegionChangeComplete={(region) =>this.setState({ mapRegion: region })}

        >
          {this.state.markerList.map((marker,index) => {
            return (
              <Marker key={index} tracksViewChanges={false}
              coordinate={{latitude: marker.latitude, longitude:marker.longitude}} 
               title={marker.opportunity.companyName} pinColor={'#fB0303'} 

                 
                onPress={()=>this.MarkerPressed(marker)}
               >
                 <Callout style={{backgroundColor:"#fff",borderRadius:14}}  key={index} showCallout={0}
                 onPress={e=>this.props.navigation.navigate("JobDetails",{test:"test1",opp:marker.opportunity,opportunityArray:this.state.filterOppList})}
                 >
                   <TouchableHighlight onPress={e=>this.props.navigation.navigate("JobDetails",{test:"test1",opp:marker.opportunity,opportunityArray:this.state.filterOppList})}>

                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",padding:7}}>
                      <View style={{flexDirection:"column"}}>
                        <Text style={{textAlign:"left",fontFamily:"SpartanBold"}}>{marker.opportunity.companyName}</Text>
                        <Text style={{textAlign:"left",fontFamily:"SpartanMedium",fontSize:10}}>
                          {this.state.jobCount==1?
                          <Text>{this.state.jobCount} job</Text>:
                          <Text>{this.state.jobCount} jobs</Text>
                          }</Text>

                        </View>
                        <Ionicons  name="information-circle-outline" size={25} color="blue" style={{textAlign:"center",paddingLeft:10}} 
                      
                    />
                    </View>
                    </TouchableHighlight>
                </Callout>
               </Marker>
            )
         })
         }          

        </MapView.Animated>
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
    flex: 1,
   flexDirection:"column",
   fontFamily:'SpartanMedium'
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
   
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
    color:"#0f3360",
    fontSize:18
  }
});
