import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams = {
    Recado: {
        id: number | string;
    }
}

type RecadoProps = {
    id: number | string;
    texto: string;
    eh_aluno: boolean;
    publicado_em: Date | string;
    transporte: number | string;
}

type AgendaProps = {
    id: number | string;
    ano: number | string;
    objetos_recados: RecadoProps[];
}

type RecadoRouteProps = RouteProp<RouteDetailParams, 'Recado'>;

export default function Recado(){

    
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<RecadoRouteProps>();

    const [agenda, setAgenda] = useState<AgendaProps | undefined>();

    const [texto, setTexto] = useState('');

    useEffect(() => {
        const loadAgenda = async () => {    
            setLoading(true);
            try{
                const response = await api.get(`/pessoas/aluno/agenda/api/v1/${route.params?.id}`);
                
                const {
                    id,
                    ano,
                    objetos_recados,
                } = await response.data;

                console.log(response.data);

                setAgenda({
                    id: id,
                    ano: ano,
                    objetos_recados: objetos_recados,
                });

                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
        };

        loadAgenda();
    }, []);

    if(loading){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#d9d9d9',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size={60} color='#02489a'/>
            </View>
        )
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
                    <ScrollView >
                        
                        <View style={styles.bubblealunofalse}>
                            <Text style={styles.textalunofalse}></Text>
                        </View>
                         
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
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    header: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 37,
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
        marginTop: 17,
        marginBottom: 30,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#d9d9d9',
        marginLeft: 16,
        marginRight: 121,
    },
    content: {
        flex: 1,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 30,
    },
    inputLine:{
        flexDirection: 'row',
        position: 'relative',
    },
    input: {
        width: '78%',
        height: 60,
        marginRight: '2%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        textAlign: 'justify',
        fontSize: 14,
        color: '#000',
    },
    button: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#02489a',
        borderRadius: 8,
    },
    textButton: {
        color: '#d9d9d9',
        fontWeight: 'bold',
        fontSize: 20,
    },
    bubblealunotrue: {
        maxWidth: '60%',
        backgroundColor: '#00b2ff',
        marginBottom: 14,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        borderBottomStartRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5, 
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    textalunotrue: {
        fontSize: 20,
        color: '#fff',
    },
    bubblealunofalse: {
        maxWidth: '60%',
        backgroundColor: '#fff',
        marginBottom: 14,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5, 
        alignSelf: 'flex-start',
    },
    textalunofalse: {
        fontSize: 20,
        color: '#02489a',
        fontWeight: 'bold',
    },
});