import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAuthParamsList } from "../../routes/auth.routes";
import { styles } from "./styles";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const navigation = useNavigation<NativeStackNavigationProp<StackAuthParamsList>>();
          
    async function handleLogin(){
        console.log("Testando!");
        if(username === '' || password === ''){
            return;
        }
        await login({ username, password });
    }

    async function handleRecover() {
        navigation.navigate('Recover');
    }

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')} 
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Digite seu username..."
                    placeholderTextColor='#fff'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Digite sua senha..."
                    placeholderTextColor='#fff'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.textButton} >Acessar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={handleRecover}>
                    <Text style={styles.textLink}>Esqueceu a senha clique aqui!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
