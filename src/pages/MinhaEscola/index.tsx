import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams = {
    MinhaEscola: {
        id: number | string;
    }
}

type TelefoneProps = {
    id: number | string;
    numero: string;
    escola: number | string;
}

type EmailProps = {
    id: number | string;
    endereco: string;
    escola: number | string;
}

type MinhaEscolaProps = {
    id: number | string;
    cnpj: string;
    nome: string;
    endereco: string;
    num_salas: number | string;
    descricao: string;
    criado_em: Date | string;
    atualizado_em: Date | string;
    imagem: string; 
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
}

type MinhaEscolaRouteProps = RouteProp<RouteDetailParams, 'MinhaEscola'>;

export default function MinhaEscola(){
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<MinhaEscolaRouteProps>();

    const [minhaEscola, setMinhaEscola] = useState<MinhaEscolaProps | undefined>();

    useEffect(() => {
        const loadEscola = async () => {    
            setLoading(true);
            try{
                const response = await api.get(`/escolas/api/v1/${route.params?.id}`);
                
                const {
                    id,
                    cnpj,
                    nome,
                    endereco,
                    num_salas,
                    descricao,
                    criado_em,
                    atualizado_em,
                    imagem, 
                    objetos_telefones,
                    objetos_emails
                } = await response.data;

                setMinhaEscola({
                    id: id,
                    cnpj: cnpj,
                    nome: nome,
                    endereco: endereco,
                    num_salas: num_salas,
                    descricao: descricao,
                    criado_em: criado_em,
                    atualizado_em: atualizado_em,
                    imagem: imagem, 
                    objetos_telefones: objetos_telefones,
                    objetos_emails: objetos_emails
                });

                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
        };

        loadEscola();
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
                    <Text style={styles.text}>Minha Escola</Text>
                    <FontAwesome5 name="school" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <Text style={styles.topic}>CNPJ:</Text>
                    <Text style={styles.info}>{minhaEscola?.cnpj}</Text>

                    <Text style={styles.topic}>Nome:</Text>
                    <Text style={styles.info}>{ minhaEscola?.nome }</Text>
                    
                    <Text style={styles.topic}>Descrição:</Text>
                    <Text style={styles.info}>{minhaEscola?.descricao}</Text>
                    
                    <Text style={styles.topic}>Endereço:</Text>
                    <Text style={styles.info}>{minhaEscola?.endereco}</Text>
                    
                    <Text style={styles.topic}>Número de Salas:</Text>
                    <Text style={styles.info}>{minhaEscola?.num_salas} salas</Text>
                    
                    <Text style={styles.topic}>Telefone:</Text>
                    {minhaEscola?.objetos_telefones && minhaEscola.objetos_telefones.length > 0 ? (
                        minhaEscola.objetos_telefones.map((item) => (
                        <Text key={item.id} style={styles.info}>{item.numero}</Text>
                        ))
                    ) : (
                        <Text style={styles.info}>Nenhum telefone disponível</Text>
                    )}
                    
                    <Text style={styles.topic}>Email:</Text>
                    {minhaEscola?.objetos_emails && minhaEscola.objetos_emails.length > 0 ? (
                        minhaEscola.objetos_emails.map((item) => (
                        <Text key={item.id} style={styles.info}>{item.endereco}</Text>
                        ))
                    ) : (
                        <Text style={styles.info}>Nenhum email disponível</Text>
                    )}
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