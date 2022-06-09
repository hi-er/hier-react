import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Firebase from "../firestoredb";
const auth = Firebase.auth();

const createUser = (email, password) => {
  try {
    var user = auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};
let customFonts = {
  SpartanMedium: require("../assets/fonts/Spartan-Medium.ttf"),
};

export default class FourthOnboarding extends React.Component {
  state = {
    email: "",
    password: "",
    fontsLoaded: false,
    minHourlyRate: 0,
    minSalary: 0,
    firstName: "",
    phoneNum: "",
  };
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    await this.setState({ fontsLoaded: true });
  }

  async componentDidMount() {
    await this._loadFontsAsync();
  }
  validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      console.log("Email is Correct");
      return true;
    }
  };
  validatePassword = (text) => {
    console.log(text);
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      console.log("Email is Correct");
      return true;
    }
  };

  PostNewUser() {
    Keyboard.dismiss();
    if (
      this.state.firstName == "" ||
      this.state.phoneNum == "" ||
      this.state.minHourlyRate == 0 ||
      this.state.minSalary == 0 ||
      this.state.email == "" ||
      this.state.password == ""
    ) {
      Alert.alert(
        "Incomplete!",
        "All fields are required",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    } else if (!this.validateEmail(this.state.email)) {
      Alert.alert(
        "Incomplete!",
        "Email is not valid!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    } else if (!this.validatePassword(this.state.password)) {
      Alert.alert(
        "Incomplete!",
        "Password must be 6-16 letters long with at least one capital, small, number and special character!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    } else {
      var prop1 = this.props.route.params;
      var firstName = this.state.firstName;
      var minHourly = this.state.minHourlyRate;
      var minSalary = this.state.minSalary;
      var phoneNumber = this.state.phoneNum;
      Firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function (user) {
          var firestoreRef1 = Firebase.firestore().collection("users");

          firestoreRef1
            .doc(user.user.uid)
            .set({
              applied: [],
              driving: prop1.isDriving,
              education: prop1.isEducation,
              firstName: firstName,
              hospitality: prop1.isHospitality,
              minHourly: minHourly,
              minSalary: minSalary,
              office: prop1.isOffice,
              partTime: prop1.isCasual,
              phoneNumber: phoneNumber,
              physical: prop1.isActive,
              profile: "",
              rejected: [],
              remote: prop1.isRemote,
              retail: prop1.isRetail,
              skills: prop1.skillsArray,
              trade: prop1.isTrade,
              fullTime: prop1.isFullTime,
            })
            .then((res) => {
              this.props.navigation.navigate("Home");
            });
        })
        .catch(function (error) {
          alert("Email Address or Password is not valid, please try again!");
        });
    }
  }
  render() {
    if (this.state.fontsLoaded) {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={40}
          enabled
        >
          <View style={{ marginTop: 50 }}></View>

          <Text
            style={{
              padding: 10,
              color: "#fff",
              fontSize: 26,
              marginBottom: 12,
              fontFamily: "SpartanBold",
            }}
          >
            you're almost in!
          </Text>
          <Text
            style={{
              color: "#fff",
              marginBottom: 10,
              fontFamily: "SpartanMedium",
              fontSize: 16,
              width: "90%",
              textAlign: "left",
            }}
          >
            what is your minimum hourly rate?
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="$XXX,XXX"
              keyboardType="numeric"
              placeholderTextColor="#ccc"
              onChangeText={(text) => this.setState({ minHourlyRate: text })}
            />
          </View>
          <Text
            style={{
              color: "#fff",
              marginBottom: 10,
              fontFamily: "SpartanMedium",
              fontSize: 16,
              width: "90%",
              textAlign: "left",
            }}
          >
            what is your minimum annual salary?
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="$XXX,XXX"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ minSalary: text })}
            />
          </View>
          <View
            style={{
              height: 1.2,
              backgroundColor: "#0f3360",
              margin: 13,
              width: "100%",
            }}
          >
            <Text></Text>
          </View>

          <Text
            style={{
              color: "#fff",
              marginBottom: 10,
              fontSize: 18,
              fontFamily: "SpartanMedium",
            }}
          >
            sign up
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.inputView1}>
              <TextInput
                style={styles.inputText}
                placeholder="first name"
                placeholderTextColor="#ccc"
                onChangeText={(text) => this.setState({ firstName: text })}
              />
            </View>
            <View style={styles.inputView2}>
              <TextInput
                style={styles.inputText}
                placeholder="phone number"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ phoneNum: text })}
              />
            </View>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              keyboardType="email-address"
              placeholder="email address"
              placeholderTextColor="#ccc"
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="password"
              secureTextEntry={true}
              placeholderTextColor="#ccc"
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.PostNewUser.bind(this)}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "SpartanMedium",
                fontSize: 22,
              }}
            >
              sign up
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: "#03a4aa",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#03a4aa",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#fff",
    fontFamily: "SpartanMedium",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 3,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  inputView1: {
    width: "43%",
    backgroundColor: "#fff",
    borderRadius: 3,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
    color: "#fff",
    marginRight: 10,
  },
  inputView2: {
    width: "44%",
    backgroundColor: "#fff",
    borderRadius: 3,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
    color: "#fff",
  },
  inputText: {
    height: 50,
    color: "#111",
    fontFamily: "SpartanMedium",
    width: "100%",
    fontSize: 16,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },

  loginBtn: {
    width: "50%",
    padding: 7,
    color: "#fff",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    fontFamily: "LeagueSpartan",
    marginBottom: 10,
    backgroundColor: "#0f3360",
  },
  loginText: {
    color: "#0f3360",
    fontFamily: "SpartanMedium",
    fontSize: 18,
  },
});
