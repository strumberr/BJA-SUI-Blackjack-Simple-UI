import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Pressable,
    Modal,
    TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path, Rect } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export const GameScreen = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [bet, setBet] = useState(0);
    const betRef = useRef(null);
    const [bankroll, setBankroll] = useState(null);
    const [trueBankroll, setTrueBankroll] = useState(null);

    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);

    const [playerHandTotal, setPlayerHandTotal] = useState([]);
    const [dealerHandTotal, setDealerHandTotal] = useState([]);

    const [playerBust, setPlayerBust] = useState(false);
    const [dealerBust, setDealerBust] = useState(false);

    const [disableStart, setDisableStart] = useState(false);

    const [dealerBlackjack, setDealerBlackjack] = useState(false);
    const [playerBlackjack, setPlayerBlackjack] = useState(false);

    const [playerWin, setPlayerWin] = useState(false);
    const [dealerWin, setDealerWin] = useState(false);

    const isFocused = useIsFocused();

    const randomCard = () => {
        const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        const cardSuits = ['hearts', 'diamonds', 'clubs', 'spades'];

        const randomValue = cardValues[Math.floor(Math.random() * cardValues.length)];
        const randomSuit = cardSuits[Math.floor(Math.random() * cardSuits.length)];
        return { value: randomValue, suit: randomSuit };
    };


    const minusBankrollStorage = async (value) => {
        try {
            var serializedDictionary2 = bankroll;
            if (serializedDictionary2 !== null) {
                console.log("serializedDictionary2: ", serializedDictionary2);
                const dictionary = { bankroll: serializedDictionary2 };
                const serializedDictionary = JSON.stringify(dictionary);
                await AsyncStorage.setItem("@MyApp:bankroll", serializedDictionary);
                console.log("Dictionary saved successfully.");
            } else {
                console.log('Dictionary does not exist.');
            }
        } catch (error) {
            console.log('Error saving bankroll:', error);
        }
    };

    const plusBankrollStorageTimes2 = async (value) => {
        try {
            var serializedDictionary2 = bankroll + (bet * 2);
            if (serializedDictionary2 !== null) {
                console.log("serializedDictionary2: ", serializedDictionary2);
                const dictionary = { bankroll: serializedDictionary2 };
                const serializedDictionary = JSON.stringify(dictionary);
                await AsyncStorage.setItem("@MyApp:bankroll", serializedDictionary);
                console.log("Dictionary saved successfully.");
            } else {
                console.log('Dictionary does not exist.');
            }
        } catch (error) {
            console.log('Error saving bankroll:', error);
        }
    };

    const plusBankrollStorageTimes1p5 = async (value) => {
        try {
            var serializedDictionary2 = bankroll + (bet * 1.5);
            if (serializedDictionary2 !== null) {
                console.log("serializedDictionary2: ", serializedDictionary2);
                const dictionary = { bankroll: serializedDictionary2 };
                const serializedDictionary = JSON.stringify(dictionary);
                await AsyncStorage.setItem("@MyApp:bankroll", serializedDictionary);
                console.log("Dictionary saved successfully.");
            } else {
                console.log('Dictionary does not exist.');
            }
        } catch (error) {
            console.log('Error saving bankroll:', error);
        }
    };

    const handleButtonPress = () => {
        setModalVisible(!modalVisible);

        var playerTotal = 0;
        for (let i = 0; i <= 1; i++) {
            const randomCard2 = randomCard();
            const randomCard3 = [randomCard2.suit, randomCard2.value]
            var checkerThing = randomCard2.value;
            if (typeof checkerThing !== 'number') {
                checkerThing = 10; 
            }

            playerTotal = playerTotal + parseInt(checkerThing);
            setPlayerHand((playerHand) => [...playerHand, randomCard2]);
            console.log("playerHand: ", randomCard3);
        }
        setPlayerHandTotal(playerTotal);

        var dealerTotal = 0;
        for (let i = 0; i <= 0; i++) {
            const randomCard2 = randomCard();
            const randomCard3 = [randomCard2.suit, randomCard2.value]
            var checkerThing = randomCard2.value;
            if (typeof checkerThing !== 'number') {
                checkerThing = 10; 
            }
            dealerTotal = dealerTotal + parseInt(checkerThing);
            setDealerHand((dealerHand) => [...dealerHand, randomCard2]);
            console.log("dealerHand: ", randomCard3);
        }
        setDealerHandTotal(dealerTotal);

        if (playerTotal === 21) {
            setDisableStart(true);
            setModalVisible(false);
            plusBankrollStorageTimes2(bet);
        } 

        if (dealerTotal === 21) {
            setDisableStart(true);
            setModalVisible(false);
            minusBankrollStorage(bet);
        }
            
    };

    const handlePlayerHit = () => {
        var playerTotal = playerHandTotal;

        const randomCard2 = randomCard();
        const randomCard3 = [randomCard2.suit, randomCard2.value]
        var checkerThing = randomCard2.value;
        if (typeof checkerThing !== 'number') {
            checkerThing = 10; 
        }

        playerTotal = playerTotal + parseInt(checkerThing);
        setPlayerHand((playerHand) => [...playerHand, randomCard2]);
        console.log("playerHand: ", randomCard3);

        setPlayerHandTotal(playerTotal);

        if (playerTotal > 21) {
            setPlayerBust(true);
            minusBankrollStorage(bet);
        }

        if (playerTotal === 21) {
            setDisableStart(true);
            setModalVisible(false);
            plusBankrollStorageTimes2(bet);
            
        } 
    };

    const handlePlayerStand = () => {
        var dealerTotal = dealerHandTotal;

        for (let i = 0; i <= 0; i++) {
            const randomCard2 = randomCard();
            const randomCard3 = [randomCard2.suit, randomCard2.value]
            var checkerThing = randomCard2.value;
            if (typeof checkerThing !== 'number') {
                checkerThing = 10; 
            }
            dealerTotal = dealerTotal + parseInt(checkerThing);
            setDealerHand((dealerHand) => [...dealerHand, randomCard2]);
            console.log("dealerHand: ", randomCard3);
        }
        setDealerHandTotal(dealerTotal);

        for (let i = dealerTotal; i <= 16; i += checkerThing) {
            const randomCard2 = randomCard();
            const randomCard3 = [randomCard2.suit, randomCard2.value]
            var checkerThing = randomCard2.value;
            if (typeof checkerThing !== 'number') {
                checkerThing = 10; 
            }
            dealerTotal = dealerTotal + parseInt(checkerThing);
            setDealerHand((dealerHand) => [...dealerHand, randomCard2]);
            console.log("dealerHand: ", randomCard3);
        }

        if (dealerTotal > 21) {
            setDealerBust(true);
            setDisableStart(true);
            setModalVisible(false);
            plusBankrollStorageTimes1p5(bet);
        }

        if (dealerTotal === 21) {
            setDisableStart(true);
            setModalVisible(false);
            minusBankrollStorage(bet);
        }

        if (dealerTotal > playerHandTotal && dealerTotal < 21) {
            setDisableStart(true);
            setModalVisible(false);
            minusBankrollStorage(bet);
            setDealerWin(true);
            console.log("dealer wins");
        } else if (dealerTotal < playerHandTotal && dealerTotal < 21) {
            setDisableStart(true);
            setModalVisible(false);
            plusBankrollStorageTimes1p5(bet);
            setPlayerWin(true);
            console.log("player wins");
        }

    };


    const handleRefresh = () => {
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerHandTotal([]);
        setDealerHandTotal([]);
        setPlayerBust(false);
        setDealerBust(false);
        setDisableStart(false);
        setModalVisible(true);
        setPlayerWin(false);
        setDealerWin(false);

        const getBankrollStorage = async () => {
            try {
                const serializedDictionary = await AsyncStorage.getItem('@MyApp:bankroll');
                if (serializedDictionary !== null) {
                const dictionary = JSON.parse(serializedDictionary);
                const jsonString = parseInt(dictionary.bankroll, 10);
                console.log(jsonString);
                setBankroll(jsonString);
                setTrueBankroll(jsonString);
                } else {
                console.log('Dictionary does not exist.');
                }
            } catch (error) {
                console.log('Error retrieving dictionary:', error);
            }
        };
        
        getBankrollStorage();
    };

        
    const loadFonts = async () => {
        await Font.loadAsync({
            "Manrope-Bold": require("./fonts/Manrope-Bold.ttf"),
            "Manrope-ExtraBold": require("./fonts/Manrope-ExtraBold.ttf"),
            "Manrope-ExtraLight": require("./fonts/Manrope-ExtraLight.ttf"),
            "Manrope-Light": require("./fonts/Manrope-Light.ttf"),
            "Manrope-Medium": require("./fonts/Manrope-Medium.ttf"),
            "Manrope-Regular": require("./fonts/Manrope-Regular.ttf"),
            "Manrope-SemiBold": require("./fonts/Manrope-SemiBold.ttf"),
        });
        setFontsLoaded(true);
    };

    useEffect(() => {
        loadFonts();
    }, []);

    function changeBet(value2) {
        const betChanger = bet || 0; // If bet is undefined, set it to 0
        const newBet = value2 + betChanger;
        setBet(newBet);
        
        // Calculate the difference between the old and new bets
        const betDifference = newBet - betChanger;
        
        // Subtract the betDifference from the bankroll
        setBankroll((prevBankroll) => prevBankroll - betDifference);
        
        console.log("newbet: ", newBet);
        console.log("bankroll: ", bankroll); // Note: 'bankroll' will not immediately reflect the updated state here due to closure scope. Use 'prevBankroll' in setBankroll instead.
    }


    function clearBet() {
        setBet(0)
        setBankroll(trueBankroll)
    };

    useEffect(() => {
        const getBankrollStorage = async () => {
          try {
            const serializedDictionary = await AsyncStorage.getItem('@MyApp:bankroll');
            if (serializedDictionary !== null) {
              const dictionary = JSON.parse(serializedDictionary);
              const jsonString = parseInt(dictionary.bankroll, 10);
              console.log(jsonString);
              setBankroll(jsonString);
              setTrueBankroll(jsonString);
            } else {
              console.log('Dictionary does not exist.');
            }
          } catch (error) {
            console.log('Error retrieving dictionary:', error);
          }
        };
    
        getBankrollStorage();
      }, [isFocused]);



    

    function cardDesign(suit, value) {
        return (
            <View style={styles.card}>
                <View style={styles.cardSubPart}>
                    <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 30, color: "#1E1704" }}>{value}</Text>
                    {suit === "clubs" ? (
                        <Svg width={30} height={30} viewBox="0 0 253 294" fill="none">
                            <Path
                                d="M253 97.2742V215.034H0V97.2742H62.848V0H190.152V97.2742H253ZM126.5 234.542L66.7341 294H186.266L126.5 234.542Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "spades" ? (
                        <Svg width={42} height={30} viewBox="0 0 253 294" fill="none">
                            <Path
                                d="M225.034 293L103.966 293L164.5 232.357L225.034 293ZM2.87278e-05 164.304L86.3218 250.433L164.5 172.483L242.678 250.433L329 164.304L164.5 -2.87621e-05L2.87278e-05 164.304Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "diamonds" ? (
                        <Svg width={30} height={30} viewBox="0 0 294 294" fill="none">
                            <Rect
                            x="146.677"
                            width="207.432"
                            height="207.432"
                            transform="rotate(45 146.677 0)"
                            fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "hearts" ? (
                        <Svg width={44} height={25} viewBox="0 0 253 294" fill="none">
                            <Path
                                d="M371 97.3291L273.658 2.20077e-05L185.5 88.0864L97.3416 6.5936e-06L-1.42857e-05 97.3291L185.5 283L371 97.3291Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ): null}
                </View>
                <View style={styles.cardSubPart}>
                    {suit === "clubs" ? (
                        <Svg width={20} height={20} viewBox="0 0 253 294" fill="none">
                            <Path
                                d="M253 97.2742V215.034H0V97.2742H62.848V0H190.152V97.2742H253ZM126.5 234.542L66.7341 294H186.266L126.5 234.542Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "spades" ? (
                        <Svg width={32} height={20} viewBox="0 0 330 294" fill="none">
                            <Path
                                d="M225.034 293L103.966 293L164.5 232.357L225.034 293ZM2.87278e-05 164.304L86.3218 250.433L164.5 172.483L242.678 250.433L329 164.304L164.5 -2.87621e-05L2.87278e-05 164.304Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "diamonds" ? (
                        <Svg width={20} height={20} viewBox="0 0 294 294" fill="none">
                            <Rect
                            x="146.677"
                            width="207.432"
                            height="207.432"
                            transform="rotate(45 146.677 0)"
                            fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "hearts" ? (
                        <Svg width={34} height={20} viewBox="0 0 253 294" fill="none">
                            <Path
                                d="M371 97.3291L273.658 2.20077e-05L185.5 88.0864L97.3416 6.5936e-06L-1.42857e-05 97.3291L185.5 283L371 97.3291Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ): null}

                    {suit === "clubs" ? (
                        <Svg width={20} height={20} viewBox="0 0 253 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Path
                                d="M253 97.2742V215.034H0V97.2742H62.848V0H190.152V97.2742H253ZM126.5 234.542L66.7341 294H186.266L126.5 234.542Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "spades" ? (
                        <Svg width={32} height={20} viewBox="0 0 330 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Path
                                d="M225.034 293L103.966 293L164.5 232.357L225.034 293ZM2.87278e-05 164.304L86.3218 250.433L164.5 172.483L242.678 250.433L329 164.304L164.5 -2.87621e-05L2.87278e-05 164.304Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "diamonds" ? (
                        <Svg width={20} height={20} viewBox="0 0 294 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Rect
                            x="146.677"
                            width="207.432"
                            height="207.432"
                            transform="rotate(45 146.677 0)"
                            fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "hearts" ? (
                        <Svg width={34} height={20} viewBox="0 0 253 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Path
                                d="M371 97.3291L273.658 2.20077e-05L185.5 88.0864L97.3416 6.5936e-06L-1.42857e-05 97.3291L185.5 283L371 97.3291Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ): null}
                </View>
                <View style={styles.cardSubPart}>
                    {suit === "clubs" ? (
                        <Svg width={30} height={30} viewBox="0 0 253 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Path
                                d="M253 97.2742V215.034H0V97.2742H62.848V0H190.152V97.2742H253ZM126.5 234.542L66.7341 294H186.266L126.5 234.542Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "spades" ? (
                        <Svg width={42} height={30} viewBox="0 0 253 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Path
                                d="M225.034 293L103.966 293L164.5 232.357L225.034 293ZM2.87278e-05 164.304L86.3218 250.433L164.5 172.483L242.678 250.433L329 164.304L164.5 -2.87621e-05L2.87278e-05 164.304Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "diamonds" ? (
                        <Svg width={30} height={30} viewBox="0 0 294 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Rect
                            x="146.677"
                            width="207.432"
                            height="207.432"
                            transform="rotate(45 146.677 0)"
                            fill="#1E1704"
                            />
                        </Svg>
                    ) : suit === "hearts" ? (
                        <Svg width={44} height={25} viewBox="0 0 253 294" fill="none" style={{ transform: [{ rotate: '180deg' }] }}>
                            <Path
                                d="M371 97.3291L273.658 2.20077e-05L185.5 88.0864L97.3416 6.5936e-06L-1.42857e-05 97.3291L185.5 283L371 97.3291Z"
                                fill="#1E1704"
                            />
                        </Svg>
                    ): null}
                    <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 30, color: "#1E1704", transform: [{ rotate: '180deg' }]}} >{value}</Text>
                </View>
            </View>
        )
    }

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.wholeThing}>
            <View style={styles.topPart}>
                {dealerHand.map((element, index) => (
                    <View key={index} style={styles.generatedElement}>
                        {cardDesign(element.suit, element.value)}
                    </View>
                ))}
                <Text>{dealerHandTotal}</Text>
            </View>

            <View style={styles.bottomPart}>
                {playerHand.map((element, index) => (
                    <Text key={index} style={styles.generatedElement}>
                        {cardDesign(element.suit, element.value)}
                    </Text>
                ))}
                <Text>{playerHandTotal}</Text>
            </View>
            
            <Pressable style={styles.hitButton} onPress={() => handlePlayerHit()}>
                <Text style={{ color: "#E1D5C9", fontFamily: "Manrope-Bold", fontSize: 20 }}>H</Text>
            </Pressable>

            <Pressable style={styles.standButton} onPress={() => handlePlayerStand()}>
                <Text style={{ color: "#E1D5C9", fontFamily: "Manrope-Bold", fontSize: 20 }}>S</Text>
            </Pressable>











            <Modal
                animationType="slide"
                transparent={true}
                visible={playerBust}
                onRequestClose={() => {
                    setPlayerBust(!playerBust);
                }}
            >     
                <View style={styles.centeredViewPlayerBust}>
                    <View style={styles.bustedPlayerModal}>
                        <View style={styles.topModal}>
                            <Text style={{ color: "#E1D5C9", fontFamily: "Manrope-Bold", fontSize: 20 }}>You busted all over me!</Text>
                        </View>
                        <View style={styles.bottomModal}>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#FF6961", borderRadius: 10, marginLeft: 10, marginBottom: 10, marginRight: 5 },
                                ]}
                                onPress={() => navigation.navigate('gameConfigScreen')}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16" fill="none">
                                    <Path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                                        fill="#A51B13"
                                    />
                                </Svg>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#6D9775", borderRadius: 100, marginRight: 10, marginBottom: 10, marginLeft: 5 },
                                ]}
                                onPress={handleRefresh}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16">
                                    <Path
                                        fill="#104730"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                                    />
                                    <Path
                                        fill="#104730"
                                        d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                                    />
                                </Svg>
                            </Pressable>
                        </View>
                    </View>

                    
                </View>
            </Modal>





            <Modal
                animationType="slide"
                transparent={true}
                visible={dealerBust}
                onRequestClose={() => {
                    setDealerBust(!dealerBust);
                }}
            >     
                <View style={styles.centeredViewPlayerBust}>
                    <View style={styles.bustedPlayerModal}>
                        <View style={styles.topModal}>
                            <Text style={{ color: "#E1D5C9", fontFamily: "Manrope-Bold", fontSize: 20 }}>Dealer busted all over you!</Text>
                        </View>
                        <View style={styles.bottomModal}>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#FF6961", borderRadius: 10, marginLeft: 10, marginBottom: 10, marginRight: 5 },
                                ]}
                                onPress={() => navigation.navigate('gameConfigScreen')}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16" fill="none">
                                    <Path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                                        fill="#A51B13"
                                    />
                                </Svg>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#6D9775", borderRadius: 100, marginRight: 10, marginBottom: 10, marginLeft: 5 },
                                ]}
                                onPress={handleRefresh}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16">
                                    <Path
                                        fill="#104730"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                                    />
                                    <Path
                                        fill="#104730"
                                        d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                                    />
                                </Svg>
                            </Pressable>
                        </View>
                    </View>

                    
                </View>
            </Modal>






            <Modal
                animationType="slide"
                transparent={true}
                visible={dealerWin}
                onRequestClose={() => {
                    setDealerWin(!dealerWin);
                }}
            >     
                <View style={styles.centeredViewPlayerBust}>
                    <View style={styles.bustedPlayerModal}>
                        <View style={styles.topModal}>
                            <Text style={{ color: "#E1D5C9", fontFamily: "Manrope-Bold", fontSize: 20 }}>Dealer won!</Text>
                        </View>
                        <View style={styles.bottomModal}>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#FF6961", borderRadius: 10, marginLeft: 10, marginBottom: 10, marginRight: 5 },
                                ]}
                                onPress={() => navigation.navigate('gameConfigScreen')}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16" fill="none">
                                    <Path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                                        fill="#A51B13"
                                    />
                                </Svg>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#6D9775", borderRadius: 100, marginRight: 10, marginBottom: 10, marginLeft: 5 },
                                ]}
                                onPress={handleRefresh}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16">
                                    <Path
                                        fill="#104730"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                                    />
                                    <Path
                                        fill="#104730"
                                        d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                                    />
                                </Svg>
                            </Pressable>
                        </View>
                    </View>

                    
                </View>
            </Modal>




            <Modal
                animationType="slide"
                transparent={true}
                visible={playerWin}
                onRequestClose={() => {
                    setPlayerWin(!playerWin);
                }}
            >     
                <View style={styles.centeredViewPlayerBust}>
                    <View style={styles.bustedPlayerModal}>
                        <View style={styles.topModal}>
                            <Text style={{ color: "#E1D5C9", fontFamily: "Manrope-Bold", fontSize: 20 }}>You won!</Text>
                        </View>
                        <View style={styles.bottomModal}>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#FF6961", borderRadius: 10, marginLeft: 10, marginBottom: 10, marginRight: 5 },
                                ]}
                                onPress={() => navigation.navigate('gameConfigScreen')}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16" fill="none">
                                    <Path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                                        fill="#A51B13"
                                    />
                                </Svg>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#6D9775", borderRadius: 100, marginRight: 10, marginBottom: 10, marginLeft: 5 },
                                ]}
                                onPress={handleRefresh}
                            >
                                <Svg width={50} height={50} viewBox="0 0 16 16">
                                    <Path
                                        fill="#104730"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                                    />
                                    <Path
                                        fill="#104730"
                                        d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                                    />
                                </Svg>
                            </Pressable>
                        </View>
                    </View>

                    
                </View>
            </Modal>

            











            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.topModal}>
                            <View style={styles.topModalRight}>
                                <TextInput
                                    ref={betRef}
                                    style={styles.inputBet}
                                    onChangeText={setBet}
                                    value={bet.toString() + "$"}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    editable={false}
                                />
                                <Pressable style={styles.clearBet} onPress={() => clearBet()}>
                                    <Text style={styles.clearBetText}>ClearBet</Text>
                                </Pressable>

                                <Text style={styles.bankroll}>Bankroll: <Text style={{ color: "#6D9775" }}>{bankroll}$</Text></Text>
                                
                            </View>
                            <View style={styles.topModalLeft}>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(1)} >
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group47.png')} />
                                </Pressable>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(5)}>
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group50.png')} />
                                </Pressable>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(10)}>
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group51.png')} />
                                </Pressable>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(25)}>
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group54.png')} />
                                </Pressable>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(50)}>
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group48.png')} />
                                </Pressable>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(100)}>
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group49.png')} />
                                </Pressable>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(500)}>
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group52.png')} />
                                </Pressable>
                                <Pressable style={styles.blackjackChip} onPress={() => changeBet(1000)}>
                                    <Image style={styles.singleBlackjackChip} source={require('./assets/Group53.png')} />
                                </Pressable>
                            </View>
                            
                        </View>
                        <View style={styles.bottomModal}>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#FF6961", borderRadius: 10, marginLeft: 10, marginBottom: 10, marginRight: 5 },
                                ]}
                                onPress={() => navigation.navigate('gameConfigScreen')}
                            >

                                
                                <Svg width={50} height={50} viewBox="0 0 16 16" fill="none">
                                    <Path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                                        fill="#A51B13"
                                    />
                                </Svg>

                            </Pressable>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#6D9775", borderRadius: 100, marginRight: 10, marginBottom: 10, marginLeft: 5 },
                                ]}
                                onPress={handleButtonPress}
                                disabled={bet === 0 || bankroll < 0}
                            >
                                <Svg width={50} height={50} viewBox="0 0 1200 1200" fill="none">
                                    <Path
                                        d="m600 30c-314.4 0-570 255.6-570 570s255.6 570 570 570 570-255.6 570-570-255.6-570-570-570zm243.6 622.8-334.8 206.4c-40.801 25.199-94.801-4.8008-94.801-52.801v-412.8c0-48 52.801-78 94.801-52.801l334.8 206.4c39.598 24 39.598 81.602 0 105.6z"
                                        fill="#104730"
                                    />
                                </Svg>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wholeThing: {
        width: "100%",
        height: "100%",
        backgroundColor: "#E1D5C9",
        justifyContent: "center",
        alignItems: "center",
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        backgroundColor: "#313131",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        height: "60%",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    topModal: {
        width: "100%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    bottomModal: {
        width: "100%",
        height: "25%",
        flexDirection: "row",
    },

    modalButtons: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },

    modalBtnText: {
        fontFamily: "Manrope-Bold",
        fontSize: 15,
    },


    topModalLeft: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRadius: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        flexWrap: 'wrap',
    },

    topModalRight: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRadius: 20,
    },

    blackjackChip: {
        flex: 0,
        flexGrow: 1,
        width: '50%',
        aspectRatio: 1,
        height: '25%',
        justifyContent: "center",
        alignItems: "center",
    },

    singleBlackjackChip: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },


    inputBet: {
        fontFamily: "Manrope-Bold",
        fontSize: 30,
        color: "#6D9775",
        textAlign: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#6D9775",
    },

    clearBet: {
        width: "80%",
        height: 40,
        backgroundColor: "#FF6961",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    clearBetText: {
        fontFamily: "Manrope-Bold",
        fontSize: 12,
        color: "#A51B13",
    },

    bankroll: {
        fontFamily: "Manrope-Bold",
        fontSize: 15,
        color: "#979797",
        marginTop: 20,
        flexWrap: 'wrap',
    },

    generatedElement: {
        marginLeft: -40,
    },

    card: {
        width: 90,
        height: 150,
        backgroundColor: "#E1D5C9",
        borderRadius: 10,
        borderColor: "#1E1704",
        borderWidth: 2,
        flexDirection: "column",
        padding: 5,

    },

    cardSubPart: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    },

    topPart: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    bottomPart: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    hitButton: {
        position: "absolute",
        right: 0,
        width: 50,
        height: 80,
        backgroundColor: "#1E1704",
        top: "40%",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    standButton: {
        position: "absolute",
        right: 0,
        width: 50,
        height: 80,
        backgroundColor: "#1E1704",
        top: "50%",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },



    centeredViewPlayerBust: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    bustedPlayerModal: {
        backgroundColor: "#313131",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
    },

});
