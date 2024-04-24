import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import Carousel from "react-native-snap-carousel";
import { AlunoProps } from "../../types";
import { styles } from "./styles";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.95;
const ITEM_WIDTH = SLIDER_WIDTH * 0.85;

type RouteDetailParams = {
    Historico: {
        aluno: AlunoProps | undefined;
    }
}

type HistoricoRouteProps = RouteProp<RouteDetailParams, 'Historico'>;

export default function Historico(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();

    const route = useRoute<HistoricoRouteProps>();

    function getSituacao(codigo: string){
        let situacao = '';

        switch(codigo){
            case 'A' : situacao = 'Aprovado'; break;
            case 'M' : situacao = 'Matriculado'; break;
            case 'RF' : situacao = 'Reprovado por falta'; break;
            case 'RM' : situacao = 'Reprovado por média'; break;
            case 'RFM' : situacao = 'Reprovado por média e por falta'; break;
            case 'T' : situacao = 'Transferido'; break;
        }

        return situacao;
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
                    <Text style={styles.text}>Histórico</Text>
                    <FontAwesome5 name="history" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <View style={{width: '100%', backgroundColor: '#d9d9d9', borderRadius: 8, alignItems: 'center', marginBottom: 15}}>
                        <Text style={{fontSize: 24, color: '#02489a', fontWeight: 'bold', padding: 15}}>Histótico de {route.params?.aluno?.objeto_usuario.first_name}</Text>
                    </View>

                    <Carousel style={{justifyContent: 'center', alignItems: 'center'}}
                        data={route.params?.aluno?.objetos_boletins || []}
                        renderItem={({ item, index }) => (
                            <View key={index} style={{width: '100%', backgroundColor: '#d9d9d9', borderRadius: 8, alignItems: 'center', padding: 15}}>
                                <View style={{flexDirection: 'row', width: '100%', borderWidth: 1, borderColor: '#02489a'}}>
                                    <View style={{width: '50%', alignItems: 'center', borderWidth: 1, borderColor: '#02489a', padding: 10}}>
                                        <Text style={{fontSize: 18, color: '#02489a', fontWeight: 'bold', marginBottom: 5}}>Turma:</Text>
                                        <Text style={{fontSize: 20, color: '#02489a', fontWeight: 'bold', marginBottom: 5}}>{item?.objeto_turma.nome}</Text>
                                    </View>
                                    <View style={{width: '50%', alignItems: 'center', borderWidth: 1, borderColor: '#02489a', padding: 10}}>
                                        <Text style={{fontSize: 18, color: '#02489a', fontWeight: 'bold', marginBottom: 5}}>Ano:</Text>
                                        <Text style={{fontSize: 20, color: '#02489a', fontWeight: 'bold', marginBottom: 5}}>{item?.objeto_turma.ano}</Text>
                                    </View>
                                </View>
                                <View style={{width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#02489a'}}>
                                    <View style={{width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#02489a', padding: 10}}>
                                        <Text style={{fontSize: 18, color: '#02489a', fontWeight: 'bold', marginBottom: 5}}>Situação:</Text>
                                        <Text style={{fontSize: 20, color: '#02489a', fontWeight: 'bold', marginBottom: 5}}>{ getSituacao(item?.status) }</Text>
                                    </View>
                                </View>
                                <View style={{width: '100%', borderWidth: 1, borderColor: '#02489a'}}>
                                    {route.params?.aluno?.objetos_boletins[index].objetos_medias.map((item, index) => (
                                        item.tipo === 'MG' ? 
                                        <View key={index} style={{flexDirection: 'row', width: '100%'}}>
                                            <View style={{width: '80%', borderWidth: 1, paddingHorizontal: 10, borderColor: '#02489a'}}>
                                                <Text style={{fontSize: 18, color: '#02489a', fontWeight: 'bold', alignSelf: 'flex-start'}}>{item.objeto_disciplina.nome}</Text>
                                            </View>
                                            <View style={{width: '20%', borderWidth: 1, paddingHorizontal: 10, borderColor: '#02489a'}}>
                                                <Text style={{fontSize: 18, color: '#02489a', fontWeight: 'bold', alignSelf: 'flex-end'}}>{item.valor}</Text>
                                            </View>
                                        </View> :
                                        null
                                    ))}
                                </View>

                            </View>
                            
                        )}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        useScrollView={true}
                    />

                </View>

            </ScrollView>
        </View>
    )
}
