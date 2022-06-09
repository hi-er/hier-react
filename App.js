import 'react-native-gesture-handler';  
import React from 'react';
import {SafeAreaView , Text} from 'react-native';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Firebase from './firestoredb';

const AuthStack= createNativeStackNavigator();
const MainStack= createNativeStackNavigator();

import SignIn from "./Screens/SignIn";
import FirstOnboarding from "./Screens/FirstOnboarding";
import SecondOnboarding from "./Screens/SecondOnboarding";
import ThirdOnboarding from "./Screens/ThirdOnboarding";
import FourthOnboarding from "./Screens/FourthOnboarding";
import FifthOnboarding from "./Screens/FifthOnboarding";
import ForgotPassword from './Screens/ForgotPassword';
import Home from './Screens/Home';
import JobDetails from './Screens/JobDetails';
import Profile from './Screens/Profile';
import ProfileSkills from './Screens/ProfileSkills';
import JobSuccess from './Screens/JobSuccess';

 console.disableYellowBox = true;

const AuthComponent=()=>(
  <AuthStack.Navigator
    initialRouteName="SignIn"
    keyboardHandlingEnabled
   
  >
   <AuthStack.Screen name="SignIn" component={SignIn}  options={{headerShown: false}}/>
    <AuthStack.Screen name="FirstOnboarding" component={FirstOnboarding} />
    <AuthStack.Screen name="SecondOnboarding" component={SecondOnboarding} />
    <AuthStack.Screen name="ThirdOnboarding" component={ThirdOnboarding} />
    <AuthStack.Screen name="FourthOnboarding" component={FourthOnboarding} />
    <AuthStack.Screen name="FifthOnboarding" component={FifthOnboarding} />
    
  </AuthStack.Navigator>
)

export default class App extends React.Component {
  state={
    name:"SignIn"
  }
 componentDidMount(){

 }
render(){
  return(


  <NavigationContainer>
  <AuthStack.Navigator
    initialRouteName={SignIn}
    keyboardHandlingEnabled
    headerMode={"none"}
    
  >
     <AuthStack.Group >
        <AuthStack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
        <AuthStack.Screen name="FirstOnboarding" component={FirstOnboarding} options={{headerShown:false}} />
        <AuthStack.Screen name="SecondOnboarding" component={SecondOnboarding} options={{headerShown:false}}/>
        <AuthStack.Screen name="ThirdOnboarding" component={ThirdOnboarding} options={{headerShown:false}}/>
        <AuthStack.Screen name="FourthOnboarding" component={FourthOnboarding} options={{headerShown:false}}/>
        <AuthStack.Screen name="FifthOnboarding" component={FifthOnboarding} options={{headerShown:false}}  options={{
           headerShown: false,
          gestureEnabled: false,
        }}/>
        <AuthStack.Screen name="Home" component={Home} options={{headerShown:false}}/>

         <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>

    </AuthStack.Group>
    <AuthStack.Group screenOptions={{ presentation: 'modal'}}>
        <AuthStack.Screen name="JobDetails" component={JobDetails} options={{headerShown:false}} />
        <AuthStack.Screen name="Profile" component={Profile} options={{headerShown:false}}/> 
        <AuthStack.Screen name="ProfileSkills" component={ProfileSkills} options={{headerShown:false}}/>
        <AuthStack.Screen name="JobSuccess" component={JobSuccess} options={{headerShown:false}}/>

    </AuthStack.Group>
  </AuthStack.Navigator>
  </NavigationContainer>


  );
}
  
}
