import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Recover(){
    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')} 
            />

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Digite seu usuario..."
                    placeholderTextColor='#fff'
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Digite eu email..."
                    placeholderTextColor='#fff'
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Digite seu cpf..."
                    placeholderTextColor='#fff'
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton} >Recuperar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.link}>
                    <Text style={styles.textLink}>Se já sabe sua senha clique aqui!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
    },
    logo: {
        width: 221,
        height: 221,
        borderRadius: 8,
        marginBottom: 40,
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 8,
        backgroundColor: '#938e8e',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        paddingHorizontal: 14,
        color: '#fff',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#02489a',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#d9d9d9'
    },
    link: {
        
    },
    textLink: {
        fontWeight: 'bold',
        color: '#02489a'
    }
})