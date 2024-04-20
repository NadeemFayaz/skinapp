import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
const Google = require('../assets/google.png');
const Background = require('../assets/background.jpg'); // replace with your image path

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation, setIsAuthenticated, setUser}: any) => {

    const webClientId = "481372623389-d29cdtqg73va5rrcqaokcp4qvo86jpm2.apps.googleusercontent.com"; 

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    },[])

    const googleLogin = async () => {
        try {
            console.log("google login")
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userinfo", userInfo);
            setUser({
                name: userInfo.user.name,
                email: userInfo.user.email,
                image: userInfo.user.photo
            });
            setIsAuthenticated(true);
        } catch (error: any) {
            console.log("error", error)            
        }
    };

    return(
        <ImageBackground source={Background} style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} resizeMode="cover">
            <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100, padding: 10}}>
                <Pressable onPress={googleLogin}>
                    <View style={styles.loginButton}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={Google} style={{width: 20, height: 20}} />
                        </View>
                        <Text style={{color: '#222222',fontWeight:'400',fontSize:18, marginLeft: 5}}>
                            Login with Google
                        </Text>
                    </View>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles= StyleSheet.create({
    loginButton: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        width:screenWidth-50,
        height:48,
        borderRadius:10,
        marginLeft:20,
    }
});

export default HomeScreen;