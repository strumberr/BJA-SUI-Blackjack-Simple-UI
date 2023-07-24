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
import { useIsFocused } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export const GameConfigScreen = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const [text, onChangeText] = React.useState(0);

    const bankrollRef = useRef(null);

    const [updateBankroll, setUpdateBankroll] = useState('');

    const isFocused = useIsFocused();

  

    const clearBankrollStorage = async () => {
        try {
            const dictionary = { bankroll: 0 };
            const serializedDictionary = JSON.stringify(dictionary);
            await AsyncStorage.setItem("@MyApp:bankroll", serializedDictionary);
            console.log("Dictionary saved successfully.");
        } catch (error) {
            console.log("Error saving dictionary:", error);
        }
    };

    const getBankrollStorage = async () => {
        try {
            const serializedDictionary = await AsyncStorage.getItem('@MyApp:bankroll');
            if (serializedDictionary !== null) {
                const dictionary = JSON.parse(serializedDictionary);
                const jsonString = JSON.parseInt(dictionary.bankroll);
                setBankroll(jsonString);
            } else {
                console.log('Dictionary does not exist.');
            }
        } catch (error) {
            console.log('Error retrieving dictionary:', error);
        }
    };

    const [bankroll, setBankroll] = useState(null);

    useEffect(() => {
        const getBankrollStorage = async () => {
            try {
                const serializedDictionary = await AsyncStorage.getItem('@MyApp:bankroll');
                if (serializedDictionary !== null) {
                    const dictionary = JSON.parse(serializedDictionary);
                    const jsonString = parseInt(dictionary.bankroll, 10);
                    console.log(jsonString);
                    setBankroll(jsonString);
                    setUpdateBankroll(jsonString);
                } else {
                    console.log('Dictionary does not exist.');
                }
            } catch (error) {
                console.log('Error retrieving dictionary:', error);
            }
        };

        getBankrollStorage();
    }, [isFocused]);

    const updateBankrollStorage = async () => {
        try {
            const dictionary = { bankroll: bankroll };
            const serializedDictionary = JSON.stringify(dictionary);
            await AsyncStorage.setItem("@MyApp:bankroll", serializedDictionary);
            console.log("Dictionary saved successfully.");
        } catch (error) {
            console.log('Error saving bankroll:', error);
        }
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

    const focusRaise = () => {
        bankrollRef.current.focus();
    };

    const clearBankroll = () => {
        setUpdateBankroll(0)
        setBankroll(0)

    }






    if (!fontsLoaded || bankroll === null) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.wholeThing}>
            <Image style={styles.BJASUILogoMain} source={require('./assets/BJASUILogoMain.png')} />
            <View style={styles.buttonsWrapper}>
                <View style={styles.buttonsWrapperTop}>
                    <View style={styles.buttonsWrapperTopAnotherOne}>
                        <Pressable
                            style={styles.getStartedBtn}
                            onPress={() => navigation.navigate('GameScreen')}
                        >
                            <Image style={styles.imagesButtons} source={require('./assets/Group56.png')} />
                        </Pressable>

                        <Pressable
                            style={styles.getStartedBtn}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Image style={styles.imagesButtons} source={require('./assets/Group57.png')} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.buttonsWrapperBottom}>
                    <Pressable
                        style={styles.getStartedBtn2}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={{ color: "#E1D5C9" }}>About Us</Text>
                    </Pressable>
                </View>
                <Text style={{ fontFamily: "Manrope-Bold", color: "#B7AA9D" }}>© Blackjack SUI</Text>
            </View>
            

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
                            <Pressable
                                style={{ position: "absolute", top: 10, left: 10, backgroundColor: "#1E1704", padding: 8, borderRadius: 10 }}
                                onPress={() => [setModalVisible(!modalVisible), updateBankrollStorage()]}
                            >
                                <Text style={{ color: "#E1D5C9", fontFamily: "Manrope-Bold" }}>Done</Text>
                            </Pressable>

                            <Text style={{ fontFamily: "Manrope-Bold" }}>Current Bankroll:</Text>
                            <TextInput
                                ref={bankrollRef}
                                style={styles.inputBankroll}
                                onChangeText={setBankroll}
                                value={bankroll.toString()}
                                keyboardType="numeric"
                            />

                            {/* <Text>{updateBankroll || bankroll.toString()}</Text> */}

                            <Text style={{ color: "#B7AA9D", fontFamily: "Manrope-Bold", textAlign: "center", marginRight: 20, marginLeft: 20, fontSize: 12 }}>Note: Please be advised that the currency used on this app is not actual money, but rather virtual currency. Any funds or balances associated with your account represent virtual credits and do not have any real-world monetary value.</Text>
                        </View>
                        <View style={styles.bottomModal}>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#FF6961", borderRadius: 10, marginLeft: 10, marginBottom: 10, marginRight: 5 },
                                ]}
                                onPress={clearBankroll}
                            >
                                <Text style={[styles.modalBtnText, { color: "#A51B13" }]}>
                                    Clear
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.modalButtons,
                                    { backgroundColor: "#6D9775", borderRadius: 10, marginRight: 10, marginBottom: 10, marginLeft: 5 },
                                ]}
                                onPress={focusRaise}
                            >
                                <Text style={[styles.modalBtnText, { color: "#104730" }]}>
                                    Raise
                                </Text>
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
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 100,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        backgroundColor: "#FFF3E8",
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
        height: "45%",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    topModal: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },

    bottomModal: {
        width: "100%",
        height: "20%",
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

    inputBankroll: {
        fontFamily: "Manrope-Bold",
        height: "auto",
        width: "80%",
        padding: 10,
        fontSize: 40,
        textAlign: "center",
        color: "#6D9775"
    },

    BJASUILogoMain: {
        width: '40%',
        height: '20%',
        resizeMode: 'contain',
    },

    buttonsWrapper: {
        width: '100%',
        height: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
    },

    buttonsWrapperTop: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
    },

    buttonsWrapperTopAnotherOne: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    buttonsWrapperBottom: {
        width: '100%',
        height: '50%',
        justifyContent: 'flex-start',
        marginTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },


    getStartedBtn: {
        width: '47%',
        height: '100%',
        backgroundColor: '#1E1704',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    getStartedBtn2: {
        width: '100%',
        height: '50%',
        backgroundColor: '#645A50',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imagesButtons: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    },

});
