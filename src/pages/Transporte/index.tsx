import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams = {
    Transporte: {
        id: number | string;
        hasTransporte: boolean;
    }
}

type TelefoneProps = {
    id: number | string;
    numero: string;
    transporte: number | string;
}

type TransporteProps = {
    id: number | string;
    placa: string;
    ano: number | string;
    tipo: string;
    nomeMotorista: string;
    nomeAuxiliar: string;
    itinerario: string; 
    objetos_telefones: TelefoneProps[];
}

type TransporteRouteProps = RouteProp<RouteDetailParams, 'Transporte'>;

export default function Transporte(){

    
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<TransporteRouteProps>();

    const [transporte, setTransporte] = useState<TransporteProps | undefined>();

    useEffect(() => {
        const loadTransporte = async () => {    
            setLoading(true);
            try{
                const response = await api.get(`/pessoas/aluno/transporte/api/v1/${route.params?.id}`);
                
                const {
                    id,
                    placa,
                    ano,
                    tipo,
                    nomeMotorista,
                    nomeAuxiliar,
                    itinerario,
                    objetos_telefones,
                } = await response.data;

                setTransporte({
                    id: id,
                    placa: placa,
                    ano: ano,
                    tipo: tipo,
                    nomeMotorista: nomeMotorista,
                    nomeAuxiliar: nomeAuxiliar,
                    itinerario: itinerario, 
                    objetos_telefones: objetos_telefones,
                });

                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
        };

        loadTransporte();
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
            <ScrollView>
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
                    <Text style={styles.text}>Transporte</Text>
                    <FontAwesome5 name="bus-alt" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <Text style={styles.topic}>Tipo:</Text>
                    <Text style={styles.info}>{ transporte?.tipo }</Text>

                    <Text style={styles.topic}>Placa:</Text>
                    <Text style={styles.info}>{ transporte?.placa }</Text>
                    
                    <Text style={styles.topic}>Motorista:</Text>
                    <Text style={styles.info}>{ transporte?.nomeMotorista }</Text>
                    
                    <Text style={styles.topic}>Auxiliar:</Text>
                    <Text style={styles.info}>{ transporte?.nomeAuxiliar }</Text>
                    
                    <Text style={styles.topic}>Telefons(s):</Text>
                    {transporte?.objetos_telefones.map((item, index) => (
                        <Text style={styles.info} key={index}>{item.numero}</Text>
                    ))}
                    
                    <Text style={styles.topic}>Itinerário:</Text>
                    <Text style={styles.info}>{ transporte?.itinerario }</Text>
                    
                    
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 10,
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
        marginRight: 91,
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