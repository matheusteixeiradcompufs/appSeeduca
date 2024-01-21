import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Splash(){
    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9'
    },
    logo: {
        width: 221,
        height: 221,
        borderRadius: 8,
    }
})