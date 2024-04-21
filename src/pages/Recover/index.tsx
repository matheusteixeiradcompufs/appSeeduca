import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackAuthParamsList } from "../../routes/auth.routes";

export default function Recover(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAuthParamsList>>();

    const [email, setEmail] = useState('');

    async function handleLogin() {
        navigation.navigate('Login');
    }

    const handleRecuperar = async () => {
      try {
        const response = await fetch("http://192.168.0.113/pessoas/reset-password/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
          alert("As instruções para redefinição de senha foram enviadas para o seu e-mail.");
          setEmail("");
        } else {
          const data = await response.json();
          alert(data.message || "Ocorreu um erro ao processar a solicitação.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao processar a solicitação.");
      }
    };

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')} 
            />

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Digite seu email..."
                    placeholderTextColor='#fff'
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
                    <Text style={styles.textButton} >Recuperar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.link} onPress={handleLogin}>
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