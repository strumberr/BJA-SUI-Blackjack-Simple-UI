import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';


const Stack = createNativeStackNavigator();



export const WelcomeScreen = ({ navigation }) => {

  const isFocused = useIsFocused();

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
  }, [isFocused]);


  const nextWelcomeScreen = () => {
    navigation.navigate('SecondWelcomeScreen');
  };

  useEffect(() => {
    const firstLaunch = async () => {
        try {
            const serializedDictionary = await AsyncStorage.getItem('@MyApp:firstLaunchPage1');
            if (serializedDictionary !== null) {
              const dictionary = JSON.parse(serializedDictionary);
              const jsonString = dictionary.firstLaunch;

              navigation.navigate('gameConfigScreen')

            } else {
              console.log('Dictionary does not exist.');
              const dictionary2 = { firstLaunch: true };
              const serializedDictionary = JSON.stringify(dictionary2);
              await AsyncStorage.setItem("@MyApp:firstLaunchPage1", serializedDictionary);
              console.log("Dictionary saved successfully.");
            }
        } catch (error) {
            console.log('Error retrieving dictionary:', error);
        }
    };

    firstLaunch();
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


  return (
    <View style={ styles.wholeThing }>
      <View style={styles.btnTextWrapper}>
        
        <View style={styles.header}>
          <View style={{ width: 6, height: "100%", backgroundColor: "#1E1704", borderRadius: 10, marginRight: "5%" }}></View>
          <View>
            <Text style={styles.headerText}>{greetingDay[0]}</Text>
            <Text style={styles.headerText}>{greetingDay[1]}</Text>
          </View>
        </View>

        <View style={styles.header2}>
          <Text style={{ fontSize: 25, fontFamily: "Manrope-SemiBold", marginTop: "10%" }}>We're thrilled that you've chosen the fantastic Blackjack SUI.</Text>
          
          <Text style={{ fontSize: 25, fontFamily: "Manrope-SemiBold", marginTop: "10%" }}>Thanks a bunch!</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnTextWrapper2} onPress={() => nextWelcomeScreen()}>
        <Image style={{ width: "30%", height: "30%", resizeMode: 'contain' }} source={require('./assets/nextArrow2.png')} title="Second Welcome" onPress={this.handleButtonPress}/>
      </TouchableOpacity>

      <Image style={{ width: "50%", height: "50%", resizeMode: 'contain', position: "absolute", bottom: 0, left: 0 }} source={require('./assets/BJASUIBigLogo2.png')} />
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
    flexDirection: "column",
    marginLeft: "5%",

  },

  headerText: {
    fontSize: 50,
    fontFamily: "Manrope-SemiBold",
    wordWrap: "break-word",
  },



});