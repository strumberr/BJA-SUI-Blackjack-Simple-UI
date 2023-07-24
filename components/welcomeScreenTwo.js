import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();










export const SecondWelcomeScreen = ({ navigation }) => {


  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Manrope-Bold': require('./fonts/Manrope-Bold.ttf'),
      'Manrope-ExtraBold': require('./fonts/Manrope-ExtraBold.ttf'),
      'Manrope-ExtraLight': require('./fonts/Manrope-ExtraLight.ttf'),
      'Manrope-Light': require('./fonts/Manrope-Light.ttf'),
      'Manrope-Medium': require('./fonts/Manrope-Medium.ttf'),
      'Manrope-Regular': require('./fonts/Manrope-Regular.ttf'),
      'Manrope-SemiBold': require('./fonts/Manrope-SemiBold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);



  var today = new Date();
  var time = today.getHours();

  var greeting;

  if (time >= 5 && time < 12) {
    greeting = "Good morning";
  } else if (time >= 12 && time < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const greetingDay = greeting.split(" ");

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const alreadyOpened = async () => {
    try {
      await AsyncStorage.setItem('@MyApp:alreadyOpened', true);
      console.log('Variable saved successfully.');
    } catch (error) {
      console.log('Error saving variable:', error);
    }
  };


  return (
    <View style={ styles.wholeThing }>
      <View style={styles.btnTextWrapper}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>BlackJack</Text>
            <Text style={styles.headerText}>SUI</Text>
          </View>
        </View>

        <View style={styles.header2}>
          <View style={{ width: 2, height: "100%", backgroundColor: "#1E1704", borderRadius: 10, marginRight: "5%" }}></View>
          <Text style={{ fontSize: 25, fontFamily: "Manrope-Medium" }}>BlackJack SUI, or better said <Text style={{ fontFamily: "Manrope-ExtraBold" }}>S</Text>imple <Text style={{ fontFamily: "Manrope-ExtraBold" }}>U</Text>ser <Text style={{ fontFamily: "Manrope-ExtraBold" }}>I</Text>nterface, is a classic blackjack game that is focused on modernising the blackjack design</Text>
        </View>

        <View style={styles.btnWrapper}>
          <Pressable style={styles.getStartedBtn} onPress={() => navigation.navigate('gameConfigScreen')}>
            <Text style={styles.btnText}>Get Started</Text>
          </Pressable>
          <Image style={{ marginTop: "5%", width: "18%", height: "18%", resizeMode: 'contain' }} source={require('./assets/nextPageLocators.png')} />
        </View>
      </View>

    </View>
  );

};

















const styles = StyleSheet.create({

  wholeThing: {
    width: "100%", 
    height: "100%", 
    backgroundColor: "#E1D5C9",
    flex: 1,
    flexDirection: "column",
    paddingTop: "30%",
    paddingLeft: "5%",
  },

  btnTextWrapper: {
    flex: 0.8,
    alignItems: "left",
    fontFamily: "Manrope",
  },

  btnTextWrapper2: {
    flex: 0.2,
    alignItems: "flex-end",
    justifyContent: "center",
    fontFamily: "Manrope",
    paddingRight: "10%",
  },

  header: {
    fontSize: 50,
    flexDirection: "row",
    marginLeft: "5%",
  },

  header2: {
    fontSize: 50,
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "10%",
    marginRight: "20%",
  },

  headerText: {
    fontSize: 50,
    fontFamily: "Manrope-SemiBold",
    wordWrap: "break-word",
  },

  btnWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
    flexDirection: "column",
  },

  getStartedBtn: {
    width: "50%",
    height: 60,
    backgroundColor: "#1E1704",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "#E1D5C9",
  },
  
  btnText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
    color: "#E1D5C9",
  },




});