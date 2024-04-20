import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { AuthContext } from "../../contexts/AuthContext";

type RouteDetailParams = {
    Frequencia: {
        frequencia: FrequenciaProps;
    }
}

type DiaLetivoProps = {
    id: number | string;
    data: Date | string;
    presenca: boolean;
    frequencia: number | string;
}

type FrequenciaProps = {
    id: number | string;
    ano: number | string;
    percentual: number;
    aluno: number | string;
    objetos_diasletivos: DiaLetivoProps[];
}

type FrequenciaRouteProps = RouteProp<RouteDetailParams, 'Frequencia'>;

export default function Frequencia(){
    const { user } = useContext(AuthContext);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<FrequenciaRouteProps>();

    const percentual = route.params?.frequencia?.percentual as number;
    const presencas = route.params?.frequencia?.objetos_diasletivos.filter(item => item.presenca === true);
    
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
                    <Text style={styles.text}>Frequência</Text>
                    <FontAwesome5 name="user-clock" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.info}>
                    <Text style={styles.nome}>{user.first_name}</Text>
                    <Text style={styles.textInfo}>Você possui { presencas?.length } presenças em { route.params?.frequencia?.objetos_diasletivos.length } dias de aula</Text>
                </View>

                <View style={styles.contentBar}>
                    { !!percentual ? 
                    <View style={[styles.leftBar, { width: `${percentual}%` }]}>
                        { percentual >= 25 ? <Text style={styles.percent}>{percentual}%</Text> : null }
                    </View> :
                    <View style={[styles.leftBar, { width: `0%` }]}>
                        { percentual >= 25 ? <Text style={styles.percent}>{percentual}%</Text> : null }
                    </View>}
                    { percentual < 25 ? <Text style={styles.percentInvert}>{percentual}%</Text> : null }
                </View>

                <Text style={styles.alert}>O aluno precisa ter ao menos 75% de frequência para passar de ano</Text>
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
        marginRight: 73,
    },
    content: {
        width: '100%',
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 30,
    },
    info:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    nome: {
        color: '#02489a',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    textInfo:{
        color: '#02489a',
        fontSize: 14,
        fontWeight: 'bold',
    },
    contentBar: {
        width: '100%',  
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    leftBar: {  
        height: 40,
        backgroundColor: '#02489a',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    percent: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    percentInvert: {
        color: '#02489a',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    alert: {
        color: '#dc0909',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 30,
    },
});
    