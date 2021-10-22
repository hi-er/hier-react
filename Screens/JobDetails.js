import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,Dimensions,Permissions,TouchableWithoutFeedback,Button,ActivityIndicator,
  Switch,
 } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Firebase from '../firestoredb';


const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;

const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DATA = [];
for (let i = 0; i < 3; i++) {
  DATA.push(i)
}


let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
  'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),

};

export default class JobDetails extends React.Component {
 

  
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this)
   this.state={
    email:"",
    password:"",
    fontsLoaded: false,
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    setLocation:null,
    isEnabled:false, setIsEnabled:false,
    index: 0,
    selectedOpportunity:null,
    opportunityList:[]
  }
  }
  async componentWillMount(){
    console.log(JSON.stringify(this.props.route.params.opportunityArray))

    await this._loadFontsAsync();
    
    var opportunityArray1=JSON.stringify(this.props.route.params.opportunityArray)
    var params4=JSON.parse(opportunityArray1);
    var arr1=[];
    arr1=params4;
    console.log("OppData "+opportunityArray1);
    var arr2=[];

    for(var i=0;i<arr1.length;i++)
    {
     var logo="";
     var obj1=arr1[i];
      if(arr1[i].logo!=""){
        let imageRef =await Firebase.storage().ref(arr1[i].logo);
     const img =await imageRef
        .getDownloadURL();
        console.log("Check this=>"+ img);
       
          
          logo=img;
          var obj={
            "logo":logo,
            "jobTitle":obj1.jobTitle,
            "url":obj1.url,
            "address":obj1.address,
            "appliedUser":obj1.appliedUser,
            "longDescription":obj1.longDescription,
            "maxSalary":obj1.maxSalary,
            "rejected":obj1.rejected,
            "shortDescription":obj1.shortDescription,
            "skills":obj1.skills,
            "companyName":obj1.companyName,
            "id":obj1.id
          }
           arr2.push(obj);

       
      
      }
      else
      {
        logo="";
        var obj={
          "logo":logo,
          "jobTitle":obj1.jobTitle,
          "url":obj1.url,
          "address":obj1.address,
          "appliedUser":obj1.appliedUser,
          "longDescription":obj1.longDescription,
          "maxSalary":obj1.maxSalary,
          "rejected":obj1.rejected,
          "shortDescription":obj1.shortDescription,
          "skills":obj1.skills,
          "companyName":obj1.companyName,
          "id":obj1.id
        }
        arr2.push(obj);
      }
      
    }


    await this.setState({
      opportunityList:arr2,
    fontsLoaded: true

    })
    console.log("444" + JSON.stringify(arr2))
  }
  async ThumbsUpPressed(item1){
    var data=JSON.stringify(item1);
    var data1=JSON.parse(data);
    var oppRef = Firebase.firestore().collection("opportunities").doc(data1.id);
    Firebase.firestore().collection('opportunities').doc(data1.id).get()
    .then(async snapshot => {
      var d1=JSON.stringify(snapshot.data())
      var d2=JSON.parse(d1);
      var arr=[];
      var userArr=[];
      userArr=d2.appliedUser;
      
      var rejectedUserArr=[];
      rejectedUserArr=d2.rejected;

      const value =await  AsyncStorage.getItem("UserID");
    
      if (value !== null) {
        var aq=JSON.parse(value);
        
        var d1=userArr.some(item => aq === item);
        if(d1==false){
        userArr.push(aq);
        }
        var d2=rejectedUserArr.some(item => aq === item);
        if(d2==true){
          var index1 = rejectedUserArr.indexOf(aq)
          rejectedUserArr.splice(index1, 1);
        }


              oppRef.update({

                appliedUser:userArr,
                rejected:rejectedUserArr
              })
                    .then(async function() {
                      console.log("Document successfully updated!");
                      var userRef = Firebase.firestore().collection("users").doc(aq);


                      Firebase.firestore().collection('users').doc(aq).get()
                      .then(async snapshot1 => {
                        var d11=JSON.stringify(snapshot1.data())
                        var d21=JSON.parse(d11);
                        var arr1=[];
                        var oppArr=[],rejectedArr=[];
                        oppArr=d21.applied;
                        rejectedArr=d21.rejected;

                      
                         
                         var d=oppArr.some(item => data1.id === item);
                         if(d==false){
                            oppArr.push(data1.id);                            
                         }
                         var e=rejectedArr.some(item => data1.id === item);
                            if(e==true){
                              var index = rejectedArr.indexOf(data1.id)
                              rejectedArr.splice(index, 1);

                            }
                      userRef.update({

                        applied:oppArr,
                        rejected:rejectedArr
                      })
                    })
                            .then(async function() {
                              this.props.navigation.navigate('JobSuccess');

                            })

                    }).catch(function(error) {
                      console.error("Error updating document: ", error);
                  });
        }
    })
     
       

  }


  async ThumbsDownPressed(item1){
    var data=JSON.stringify(item1);
    var data1=JSON.parse(data);
    var oppRef = Firebase.firestore().collection("opportunities").doc(data1.id);
    Firebase.firestore().collection('opportunities').doc(data1.id).get()
    .then(async snapshot => {
      var d1=JSON.stringify(snapshot.data())
      var d2=JSON.parse(d1);
      var arr=[];
      var userArr=[];
      userArr=d2.rejected;

      var appliedUserArr=[];
      appliedUserArr=d2.appliedUser;

      const value =await  AsyncStorage.getItem("UserID");
    
      if (value !== null) {
        var aq=JSON.parse(value);
        var d1=userArr.some(item => aq === item);
        if(d1==false){
          userArr.push(aq);
        }
        var d2=appliedUserArr.some(item => aq === item);
        if(d2==true){
          var index1 = appliedUserArr.indexOf(aq)
          appliedUserArr.splice(index1, 1);
        }

              oppRef.update({

                rejected:userArr,
                appliedUser:appliedUserArr
              })
                    .then(async function() {
                      console.log("Document successfully updated!");
                      var userRef = Firebase.firestore().collection("users").doc(aq);


                      Firebase.firestore().collection('users').doc(aq).get()
                      .then(async snapshot1 => {
                        var d11=JSON.stringify(snapshot1.data())
                        var d21=JSON.parse(d11);
                        var arr1=[];
                        var oppArr=[];
                        oppArr=d21.rejected;
                        
                        var appliedArr=[];
                        appliedArr=d21.applied;

                        console.log("op1 "+d21.rejected.length);
                     
                         var d3=oppArr.some(item => data1.id === item);
                        if(d3==false){
                            oppArr.push(data1.id);
                        }
                        var d4=appliedArr.some(item => data1.id === item);
                        if(d4==true){
                          var index2 = appliedArr.indexOf(data1.id)
                          appliedArr.splice(index2, 1);
                        }
                      userRef.update({

                        rejected:oppArr,
                        applied:appliedArr
                      })
                    })
                            .then(async function() {
                              this.props.navigation.navigate('Homw');

                            })

                    }).catch(function(error) {
                      console.error("Error updating document: ", error);
                  });
        }
    })
     
       

  }



  _renderItem({ item }) {
    return (
        <View style={{backgroundColor:"#03a4aa",height:"100%"}}>
         <View style={{backgroundColor:"#fff",borderColor:"0f3360",borderRadius:15,height:"75%",
        borderWidth:4,justifyContent:"flex-start",alignItems:"center"}}>
          {item.logo!="" ?
          
             <Image style={{ height:100,margin:7, resizeMode:"contain",
                      
                        aspectRatio: 1,}}
                        source = {{ uri: item.logo }}
                />
                :
                <Image style={{ height:100,margin:7, resizeMode:"contain",
                      
                aspectRatio: 1,}}
                source={require('../assets/80.png')}
        />
    }
                <Text style={{fontFamily:"SpartanBold",color:"#0f3360",marginBottom:20,fontSize:18}}>{item.jobTitle}</Text>
                <Text style={{fontFamily:"SpartanBold",fontSize:18,color:"#0f3360",marginBottom:20}}>{item.companyName}</Text>
                <View style={{width:"100%",padding:5,marginBottom:20}}>
                <Text style={{textAlign:"left",fontFamily:"SpartanMedium",color:"#111",marginBottom:20}}>
                 {item.longDescription}
                </Text>

                </View>
                <Text style={{fontFamily:"SpartanBold",fontSize:16,color:"#0f3360",marginBottom:20}}>No skills matched</Text>


        </View>
        <View style={{flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1,alignItems:"flex-start",justifyContent:"center"}}>
          

<TouchableWithoutFeedback onPress={() => {this.ThumbsDownPressed(item);
               this.props.navigation.navigate("Home")}
              }>
            <Image style={{ width: '70%',resizeMode:"contain",
                        height: undefined,
                        aspectRatio: 1,}} 
                    source={require('../assets/icons/thumbs_down.png')}
                />
                </TouchableWithoutFeedback>

            </View>
            <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}}>
              <TouchableWithoutFeedback onPress={() => {this.ThumbsUpPressed(item);
               this.props.navigation.navigate("JobSuccess",{opp2:item})}
              }>
            <Image style={{ width: '70%',resizeMode:"contain",
                        height: undefined,
                        aspectRatio: 1,}} 
                    source={require('../assets/icons/thumbs_up.png')}
                />
                </TouchableWithoutFeedback>
               
            </View>
           </View> 
           </View>
    );
  }

  toggleSwitch(){
    alert("Toggled")
    this.setState({
      isEnabled:!this.state.isEnabled
    })
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

 
  
 

  

  render(){
    if (this.state.fontsLoaded) {
    return (
        <View style={styles.container}>
              <View style={{backgroundColor: "#03a4aa",paddingTop:50}} >
              <View>
      <Carousel
        layout="default"
        activeAnimationType="timing"
        activeSlideAlignment="center"
        layoutCardOffset={9}
        ref={(c) => this.carousel = c}
        data={this.state.opportunityList}
        renderItem={this._renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => this.setState({ index })}
        useScrollView={true}
        
      />
      <View style={styles.bottomView}>
      <Pagination
        dotsLength={this.state.opportunityList.length}
        activeDotIndex={this.state.index}
      
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}

      />
      </View>
    </View>
               

      
                   
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
    justifyContent: 'flex-end',
    
  },
  bottomView: {
   
   marginTop:"auto",
   
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
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
    height: Dimensions.get('window').height,
   
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
