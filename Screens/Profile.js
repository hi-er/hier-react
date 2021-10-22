import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,Button,
SafeAreaView,ScrollView,FlatList,TouchableWithoutFeedback,Dimensions,ActivityIndicator
} from  'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Firebase from '../firestoredb';

import { FlatGrid } from 'react-native-super-grid';


let customFonts = {
    'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
    'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),
  
  };
  const count1 = [];
  for (let i = 0; i < 10; i++) {
    count1.push(i)
  }
const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d11',
        title: 'Third Item',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
          id: '58694a0f-3da1-471f-bd96-145571e29d11',
          title: 'Third Item',
        },
  ];
export default class Profile extends React.Component {
 
 
  constructor(props){
    super(props);

}
handleLoginPress(){
  this.props.navigation.navigate('dashboard');
}

  state={
    isFullTime:false,
    isPartTime:false,
    isRemote:false,
    isTravel:false,
    isOffice:false,
    isRelocate:false,
    isActive:false,
    isDriving:false,
    isHospitality:false,
    isRetail:false,
    isEducation:false,
    isTrade:false,
    dataSource: {},
    currentUser:{},
    minHourlyRate:"",
    minSalary:"",
    statusList:[],
    skillsArray:[],
    fontsLoaded:false
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

 
 async componentWillMount(){
  await this._loadFontsAsync();
  console.log(this.props.route.params.userData);
var params1=JSON.parse(this.props.route.params.userData);


var arr=[];
const value = await AsyncStorage.getItem("UserData");
if (value !== null) {
  var data=JSON.stringify(JSON.parse(value));
  console.log(data);

  var parse1=JSON.parse(data);
  var skills=JSON.parse(data).skills;
    this.setState({
      skillsArray:skills,
     currentUser:parse1
    })
}

  this.setState({
    
    isFullTime:parse1.fullTime,
    minHourlyRate:parse1.minHourly,
    minSalary:parse1.minSalary,
    isPartTime:parse1.partTime,
    isOffice:parse1.office,
    isRemote:parse1.remote,
    isHospitality:parse1.hospitality,
    isActive:parse1.physical,
    isRetail:parse1.retail,
    isEducation:parse1.education,
    isTrade:parse1.trade,
    isDriving:parse1.driving
  })
  var obj1={
    "fieldName":"full time",
    "field":parse1.fullTime,
    "image":require("../assets/icons/FullTime.png"),
    "selectedImage":require("../assets/icons/FullTime_Selected.png")
  }
  var obj2={
    "fieldName":"casual",
    "field":parse1.partTime,
    "image":require("../assets/icons/PartTime.png"),
    "selectedImage":require("../assets/icons/PartTime_Selected.png")
  }
  arr.push(obj1);
  arr.push(obj2);
this.setState({
  statusList:arr
})
  console.log("office1 "+this.state.isOffice);
  await this.setState({ fontsLoaded: true });

}


  toggleFullTime(){
    this.setState({
      isFullTime:!this.state.isFullTime
    })
  }
  togglePartTime(){
    this.setState({
      isPartTime:!this.state.isPartTime
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
  
async PostSignOut(){
  Firebase.auth()
  .signOut()
  .then(async () => {
          await AsyncStorage.clear();
          console.log('User Signed Out');

    await this.props.navigation.navigate("SignIn");

  })
  .catch(error => {
  })
}

toggleCheck(item){
  item.field=!item.field;
}
async PostUpdateProfile(){
  const value =await  AsyncStorage.getItem("UserID");
    
  if (value !== null) {
    var aq=JSON.parse(value);
    var washingtonRef = Firebase.firestore().collection("users").doc(aq);

     washingtonRef.update({
     
           driving:this.state.isDriving,
           education:this.state.isEducation,
           hospitality:this.state.isHospitality,
           minHourly:this.state.minHourlyRate,
           minSalary:this.state.minSalary,
           office:this.state.isOffice,
           partTime:this.state.isPartTime,  
           physical:this.state.isActive,
           minHourly:this.state.minHourlyRate,
           minSalary:this.state.minSalary,
           remote:this.state.isRemote,
           retail:this.state.isRetail,
           skills:this.state.currentUser.skills,
           trade:this.state.isTrade,
           fullTime:this.state.isFullTime
  })
           .then(async function() {
            console.log("Document successfully updated!");
            Firebase.firestore().collection('users').doc(aq).get()
            .then(snapshot => {
            
                const data = snapshot.data();
                AsyncStorage.setItem("UserData", JSON.stringify(data), (err)=> {
                  if(err){
                      console.log("an error");
                      throw err;
                  }
                  console.log("success");
                })
            })
            

            this.props.navigation.navigate('Home');

        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
} 
}


  render(){
    if (this.state.fontsLoaded) {
    return (
      
      <View style={styles.container}>
      
        
     <View style={{height:50}}></View>
      
       
          <View style={{flex:1,flexDirection:"column"}}>
            <ScrollView>
            <Text style={{fontSize:26,color:"#fff",textAlign:"center",fontFamily:"SpartanBold"}}>how do you like to work?</Text>


          
     

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
         
         {!this.state.isPartTime?
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
         <Text style={{color:!this.state.isPartTime?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>casual</Text>
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
     <Text style={{color:!this.state.isEducation?"#fff":"#0f3360",fontSize:18,marginTop:10,fontFamily:"SpartanMedium"}}>education</Text>
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



   <View style={{height:25}}></View>

   <Text style={{fontSize:26,color:"#fff",textAlign:"center",fontFamily:"SpartanBold"}}>skills</Text>
   <View style={{height:5}}></View>

   <FlatList
          data={this.state.currentUser.skills}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 5 ,backgroundColor:"#0f3360",
            padding:7,
            color:"#fff",
             borderRadius:5,
             height:60,
             alignItems:"center",
             justifyContent:"center",
            }}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate("ProfileSkills")}>
              <Text style={{color:"#fff",fontFamily:"SpartanMedium",textAlign:"center"}}>{item} </Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />

        <View style={{height:25,width:"100%"}}></View>
        <Text style={{fontSize:26,color:"#fff",textAlign:"center",fontFamily:"SpartanBold"}}>minimum hourly rate</Text>
        <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            defaultValue={this.state.minHourlyRate}
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({minHourlyRate:text})}/>
        </View>

        <Text style={{fontSize:26,color:"#fff",textAlign:"center",fontFamily:"SpartanBold"}}>minimum Salary</Text>
        <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            defaultValue={this.state.minSalary}
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({minSalary:text})}/>
        </View>

        <TouchableWithoutFeedback  style={{fontFamily:"SpartanMedium",justifyContent:"center",alignItems:"center",color:"#fff"}}   
        onPress={() => {
          this.PostUpdateProfile();
          this.props.navigation.goBack();
        }}>
          <Text style={{textAlign:"center",color:"#fff",justifyContent:"center",alignItems:"center",fontSize:22}}>update</Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity  style={styles.loginBtn} onPress={this.PostSignOut.bind(this)}>
          <Text style={{color:"#fff",fontSize:22,fontFamily:"SpartanMedium"}}>sign out</Text>
        </TouchableOpacity>
       
       </ScrollView>
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
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign:"center"
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#03a4aa',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"column"
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  listItem: {
    maxWidth: Dimensions.get('window').width /2,
    flex:0.5,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 4,
    backgroundColor:"#0f3360",
    padding:7,
    color:"#fff",
     borderRadius:5,
     height:40,
     alignItems:"center",
     justifyContent:"center",
},
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
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
    width:"96%",
    backgroundColor:"#fff",
    borderRadius:3,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    margin:4
  },
  inputText:{
    height:50,
    color:"#111",
    textAlign:"center",
    fontFamily:"SpartanMedium"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"100%",
    padding:7,
   color:"#0f3360",
    borderRadius:5,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    fontFamily: 'SpartanMedium',
    marginBottom:10,
    textAlign:"center"
  },
  loginText:{
    color:"#0f3360",
    fontFamily: 'LeagueSpartan',
    fontSize:18,
    textAlign:"center"
  }
});
