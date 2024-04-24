import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackAuthParamsList } from "../../routes/auth.routes";
import { BASE_URL } from "../../services/api";
import { styles } from "./styles";

export default function Recover(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAuthParamsList>>();

    const [email, setEmail] = useState('');

    async function handleLogin() {
        navigation.navigate('Login');
    }

    const handleRecuperar = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pessoas/reset-password/`, {
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
