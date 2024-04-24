import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { AgendaRecadosProps, RecadoProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Recado: {
        agendaRecados: AgendaRecadosProps;
    }
}

type RecadoRouteProps = RouteProp<RouteDetailParams, 'Recado'>;

export default function Recado(){    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<RecadoRouteProps>();

    const [texto, setTexto] = useState('');

    const [mensagens, setMensagens] = useState<RecadoProps[]>([]);

    const scrollEndRef = useRef<ScrollView>(null);


    useEffect(() => {
        const loadDataInterval = setInterval( async () => {
            try{
                const response = await api.get(`/pessoas/aluno/boletim/agenda/api/v1/${route.params?.agendaRecados?.id}`);
                
                const {
                    objetos_recados,
                } = await response.data || { objetos_recados: []};

                setMensagens(objetos_recados); 
            }catch(err){
                console.log(err);
            }
        }, 1000);
      
        return () => clearInterval(loadDataInterval);
    }, []);

    useEffect(() => {
        scrollEndRef.current?.scrollToEnd({ animated: true });
    }, [mensagens]);

    async function enviarMensagem(){
        try{
            const response = await api.post(`/pessoas/aluno/boletim/agenda/recado/api/v1/`, {
                texto: texto,
                agenda: route.params?.agendaRecados?.id,
            });

            setTexto('');

            setMensagens([...mensagens, response.data]);
        }catch(err){
            console.log(err);
        }
    }

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
                    <Text style={styles.text}>Recado</Text>
                    <FontAwesome5 name="comments" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <ScrollView
                        ref={scrollEndRef}
                    >
                        {mensagens.map((objeto, index)=>(
                            <View key={index} style={objeto.eh_aluno ? styles.bubbleAluno : styles.bubbleEscola}>
                                <Text style={objeto.eh_aluno ? styles.textAluno : styles.textEscola}>{objeto.texto}</Text>
                            </View>
                        ))}    
                    </ScrollView>
                </View>
                    <View style={styles.inputLine}>
                        <TextInput
                            placeholder="Digite sua mensagem"
                            style={styles.input}
                            keyboardType="default"
                            value={texto}
                            onChangeText={setTexto}
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={enviarMensagem}
                        >
                            <Text style={styles.textButton}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
        </View>
    )
}
