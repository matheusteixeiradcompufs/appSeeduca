import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { styles } from "./styles";

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
