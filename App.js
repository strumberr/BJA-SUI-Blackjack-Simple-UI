import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { WelcomeScreen } from "./components/welcomeScreenOne";
import { SecondWelcomeScreen } from "./components/welcomeScreenTwo";
import { GameConfigScreen } from "./components/gameConfigScreen";
import { GameScreen } from "./components/gameScreen";

const Stack = createNativeStackNavigator();

export default function App() {




  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{ title: "Welcome", headerShown: false }}
        />

        <Stack.Screen name="SecondWelcomeScreen" component={SecondWelcomeScreen} options={{ title: "Second Welcome Screen", headerShown: false }} />
        <Stack.Screen name="gameConfigScreen" component={GameConfigScreen} options={{ title: "gameConfigScreen", headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: "GameScreen", headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

