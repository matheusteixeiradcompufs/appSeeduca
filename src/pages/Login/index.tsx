import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
// import { } from @react-native-async-storage/async-storage;

export default function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);
          
      // Chame a função para iniciar a requisição
    async function handleLogin(){

        if(username === '' || password === ''){
            return;
        }

        await login({ username, password });

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

                <TouchableOpacity style={styles.link}>
                    <Text style={styles.textLink}>Esqueceu a senha clique aqui!</Text>
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
        backgroundColor: '#d9d9d9'
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