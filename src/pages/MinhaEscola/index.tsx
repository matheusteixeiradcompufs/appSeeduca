import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";

export function MinhaEscola(){
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    style={styles.logoLeft}
                    source={require('../../assets/logo_ufs.png')} 
                />
                <Image 
                    style={styles.logo}
                    source={require('../../assets/logo.png')} 
                />
                <Image 
                    style={styles.logoRigth}
                    source={require('../../assets/logo_seduc.png')} 
                />
            </View>

            <View style={styles.banner}>
                <TouchableOpacity 
                    onPress={navigation.goBack}
                >
                    <FontAwesome5 name="arrow-left" size={45} color='#d9d9d9' />
                </TouchableOpacity>
                <Text style={styles.text}>Minha Escola</Text>
                <FontAwesome5 name="school" size={45} color='#d9d9d9' />
            </View>

            <View style={styles.content}>
                <Text style={styles.topic}>Nome:</Text>
                <Text style={styles.info}>Miriam Melo </Text>
                
                <Text style={styles.topic}>Endereço:</Text>
                <Text style={styles.info}>Miriam Melo</Text>
                
                <Text style={styles.topic}>Telefone:</Text>
                <Text style={styles.info}>Miriam Melo</Text>
                
                <Text style={styles.topic}>Email:</Text>
                <Text style={styles.info}>Miriam Melo</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#d9d9d9',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        width: '100%',
    },
    header: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 37,
        marginBottom: 17,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoLeft: {
        width: 63,
        height: 52.87,
        borderRadius: 8,
    },
    logo: {
        width: 53,
        height: 53,
        borderRadius: 8,
        marginLeft: 69,
        marginRight: 69,
    },
    logoRigth: {
        width: 77,
        height: 29,
        borderRadius: 8,
    },
    banner: {
        width: '100%',
        height: 62,
        backgroundColor: '#02489a',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#d9d9d9',
        marginLeft: 16,
        marginRight: 37,
    },
    content: {
        width: '100%',
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 30,
    },
    topic: {
        color: '#d9d9d9',
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        color: '#d9d9d9',
        fontSize: 20,
        marginBottom: 14
    },
});