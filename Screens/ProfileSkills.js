import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
  TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,
  ScrollView,FlatList,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Firebase from '../firestoredb';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { InputAutoSuggest } from 'react-native-autocomplete-search';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import SearchableDropdown from 'react-native-searchable-dropdown';


import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import CustomTitle from '../Components/CustomTitle';
import CustomText from '../Components/CustomText';
const width = Dimensions.get('window').width;

let customFonts = {
  'SpartanMedium': require('../assets/fonts/Spartan-Medium.ttf'),
  'SpartanBold': require('../assets/fonts/Spartan-Bold.ttf'),

};

const items = [
  {id: 1, name: 'angellist'},
  {id: 2, name: 'codepen'},
  {id: 3, name: 'envelope'},
  {id: 4, name: 'etsy'},
  {id: 5, name: 'facebook'},
  {id: 6, name: 'foursquare'},
  {id: 7, name: 'github-alt'},
  {id: 8, name: 'github'},
  {id: 9, name: 'gitlab'},
  {id: 10, name: 'instagram'},
];
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
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const SearchDataFromJSON = (query) => {
  if (query) {
    const regex = new RegExp(`${query.trim()}`, 'i');
    var b=DATA;
    console.log("abcdefg")


   var a= DATA.filter((data) => data.title.search(regex) >= 0)
    this.setState({
      FilterData:a
    })
  } else {
    this.setState({
      FilterData:[]
    })
  }
};
export default class ThirdOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.firestoreRef = Firebase.firestore().collection('skills-list');
        this.state = {
          progress: 0,
          userArr: [],
          progressWithOnComplete: 0,
          progressCustomized: 0,
          films: [],
          MainJSON:[],
          FilterData:[],
          selectedItem:{},
          count:0,
          skillsArray:[],
          serverData:[],
          fontsLoaded:false,
          isNav:false
        }
      }
  
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
      }
  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }
  test(data){
    console.log("Data : "+JSON.stringify(data));
  }
  
 async componentWillMount() {
  await this._loadFontsAsync();


  
    const value = await AsyncStorage.getItem("UserData");
  if (value !== null) {
    var data=JSON.stringify(JSON.parse(value));
    console.log(data);

    var skills=JSON.parse(data).skills;
      await this.setState({
        skillsArray:skills,
        progress:skills.length<=8? skills.length*12.5:8*12.5,
        count:skills.length<8?skills.length:8
      })
     
      this.unsubscribe =await this.firestoreRef.onSnapshot(this.getCollection);

  }
  await this.setState({fontsLoaded:true})

  }
  getCollection =async (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { skill} = res.data();
      userArr.push(
        res.data()
       
      );
    });
    var skillArr=this.state.skillsArray;
    const arr1=[];
    userArr.forEach((res1)=>{
      res1.skills.forEach((res2)=>{
        var d1=skillArr.some(item => item === res2);
        if(d1==false){
        arr1.push(res2);
        }
      })
    })
    console.log("arr1 "+arr1)
    this.setState({
      userArr:arr1,
      isLoading: false,
   });
  }
  componentWillUnmount(){
    this.unsubscribe();
   }
  findFilm(query) {
   
    if (query === '') {
      console.log("111");
      return [];
    }
    if(typeof query === 'undefined') {
      console.log("222");
      return [];
    }
    console.log("Query6 : "+JSON.stringify(query));
    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.title.search(regex) >= 0);
  }
  set1(data){
    var d=JSON.stringify(data);
    var a=Number(this.state.progress);
    var b=Number(this.state.count);
    if(a<100){
    this.setState({
      selectedItem:data,
      progress:a+12.5,
      count:b<8?b+1:8,  
    })
  }
    var arr=this.state.skillsArray;
    arr.push(data);
    this.setState({
      skillsArray:arr
    })
    var arr1=this.state.userArr;

    var index2 = arr1.indexOf(data)
    arr1.splice(index2, 1);
    this.setState({
      userArr:arr1
    })
  }
  _renderItem = ({item}) => (
    <Text>a - {item}</Text>
);

removeItemFromList(index){

  let skillsArray1 = this.state.skillsArray;
  var currentCount=skillsArray1.length;
  var skillArr=this.state.skillsArray;
  var arr=this.state.userArr;
  arr.push(skillsArray1[index]);

  skillsArray1.splice(index,1); //to remove a single item starting at index
  console.log("log "+arr);
  this.setState({skillsArray:skillsArray1,
  userArr:arr})
  var a=Number(this.state.progress);
  var b=Number(this.state.count);
if(currentCount<=8){

  this.setState({
    progress:a-12.5,
    count:b<1?0:b-1,  
  })
}
}
async PostSkills(){
  var arr=this.state.skillsArray;
  if(arr.length<8 || arr.length>8)
  {
    this.setState({isNav:true});
    Alert.alert(
      "Incomplete!",
      "Please select 8 Skills",
      [
     
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: true }
    );
  }
  else{
    this.setState({isNav:false});

    const value =await  AsyncStorage.getItem("UserID");
      
    if (value !== null) {
      var aq=JSON.parse(value);
      var washingtonRef = Firebase.firestore().collection("users").doc(aq);
  
       washingtonRef.update({
        applied:[],
            skills:this.state.skillsArray
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
          })
          .catch(function(error) {
              console.error("Error updating document: ", error);
          });

          

  } 
}
  }
  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red', 
      borderRadius: 0,
      borderColor: 'orange',
    };
 
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    if (this.state.fontsLoaded) {

    return (
     
      <View style={styles.container}>
      <View style={{marginTop:50}}></View>
      <Text style={{fontSize:26,color:"#fff",width:"60%",textAlign:"center",fontFamily:"SpartanBold",marginBottom:5}}>tell us what you're good at .....</Text>
      <CustomTitle>
        <Text style={{color:"#0f3360",fontSize:20,fontFamily:"SpartanBold"}}>
          enter 8 of your skills
        </Text>
        </CustomTitle>
       

        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          // Listner on the searchable input
          onItemSelect={(item) => this.set1(item)}
          // Called after the selection
          containerStyle={{padding: 5}}
          // Suggestion container style
          textInputStyle={{
            // Inserted text style
            padding: 5,
            borderRadius:5,
            backgroundColor:"#fff",
            fontFamily:"SpartanBold",
            width:width*0.9,
            height:40,
            fontSize:18
          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            marginTop: 2,
          fontFamily:"SpartanBold",
          }}
          itemTextStyle={{
            // Text style of a single dropdown item
            color: '#fff',
            fontFamily:"SpartanMedium",
            fontSize:16
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '60%',
            fontFamily:"SpartanBold",
          }}
          items={this.state.userArr}
          // Mapping of item array
         // defaultIndex={2}
          // Default selected item index
          placeholder="enter skill"
          placeholderTextColor="#808080"
          // place holder for the search input
          resPtValue={false}
          // Reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          // To remove the underline from the android input
        />


          <View style={{flexDirection:"row",marginTop:40,justifyContent:"space-between"}}>
          <ProgressBarAnimated
            width={barWidth-50}
            value={this.state.progress}
            backgroundColorOnComplete="#fff"
            backgroundColor="#fff"
            borderRadius={15}
            height={25}
           borderColor="#0f3360"
          />
          <CustomText style={{fontFamily:"SpartanBold"}}>
            {this.state.count}/8
          </CustomText>
          
          </View>
         
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}>
              
            </View>
          </View>
          <FlatList
            data={this.state.skillsArray}
            renderItem={({ item ,index}) => (
              <View style={{backgroundColor: '#0f3360',padding:10,margin:5,borderRadius:15 ,flexDirection:"row",alignSelf: 'flex-start',justifyContent: 'space-between'}}>
              <Text style={{color: '#ffffff',fontFamily:"SpartanMedium",fontSize:16}}>
                {item}
              </Text>
              <TouchableOpacity  onPress={(item) =>this.removeItemFromList(index)}><Text style={{color:"#fff",paddingLeft:10,paddingRight:4}}>+</Text></TouchableOpacity>
          </View>
            )}
            />
         <View style={{backgroundColor:this.state.skillsArray.length<8?"#a1a1a1":"#0f3360", padding:10,margin:5,borderRadius:15 ,flexDirection:"row",alignSelf: 'center'}}>
              
         <TouchableWithoutFeedback  
 disabled={this.state.skillsArray.length<8?true:false} 
          color="#fff"
         
        onPress={() => {
          this.PostSkills();
          this.state.skillsArray.length==8?this.props.navigation.navigate('Home'):null;
        }}>
         
<Text style={{color:"#fff",fontFamily:"SpartanMedium",fontSize:22,width:"40%",textAlign:"center"}}>update</Text>
         </TouchableWithoutFeedback>

          </View>
        
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
   
    color:"#fff",
  },
  buttonContainer: {
    marginTop: 15,
    backgroundColor:"#0f3360",
  },
  separator: {
    marginVertical: 30,
    borderWidth: 0.5,
    borderColor: '#DCDCDC',
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },


  MainContainer: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    padding: 12,
  },
  AutocompleteStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
   borderWidth:1
  },
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
  },
  selectedTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  selectedTextStyle: {
    textAlign: 'center',
    fontSize: 18,
  },
  loginBtn:{
    width:100,
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
    fontFamily: 'SpartanMedium',
    fontSize:18,
    
  }
});
