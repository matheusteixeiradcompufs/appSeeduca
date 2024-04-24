import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { FontAwesome5 } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { AvaliacaoProps, BoletimProps, MediaProps } from "../../types";
import { styles } from "./styles";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.8;
const ITEM_WIDTH = SLIDER_WIDTH * 0.8;

type RouteDetailParams = {
    Boletim: {
        boletim: BoletimProps | undefined;
    }
}

type BoletimRouteProps = RouteProp<RouteDetailParams, 'Boletim'>;

export default function Notas(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<BoletimRouteProps>();

    function getRotulo(item: AvaliacaoProps | MediaProps){

        const isAvalaiacaoProps = (item as AvaliacaoProps).nome !== undefined;

        const codigo = isAvalaiacaoProps ? (item as AvaliacaoProps).nome : (item as MediaProps).tipo;

        let rotulo = '';

        switch(codigo){
          case 'A1' : rotulo = 'Unidade 1'; break;
          case 'A2' : rotulo = 'Unidade 2'; break;
          case 'R1' : rotulo = 'Recuperação 1'; break;
          case 'M1' : rotulo = 'Média 1'; break;
          case 'A3' : rotulo = 'Unidade 3'; break;
          case 'A4' : rotulo = 'Unidade 4'; break;
          case 'R2' : rotulo = 'Recuperação 2'; break;
          case 'M2' : rotulo = 'Média 2'; break;
          case 'MG' : rotulo = 'Média Geral'; break;
        }
      return rotulo;
    }

    function formatarNotas(boletim: BoletimProps | undefined){
        let unidade1 = boletim?.objetos_avaliacoes.filter(avaliacao => avaliacao.nome === 'A1');
        let unidade2 = boletim?.objetos_avaliacoes.filter(avaliacao => avaliacao.nome === 'A2');
        let recuperacao1 = boletim?.objetos_avaliacoes.filter(avaliacao => avaliacao.nome === 'R1');
        let media1 = boletim?.objetos_medias.filter(media => media.tipo === 'M1');
        let unidade3 = boletim?.objetos_avaliacoes.filter(avaliacao => avaliacao.nome === 'A3');
        let unidade4 = boletim?.objetos_avaliacoes.filter(avaliacao => avaliacao.nome === 'A4');
        let recuperacao2 = boletim?.objetos_avaliacoes.filter(avaliacao => avaliacao.nome === 'R2');
        let media2 = boletim?.objetos_medias.filter(media => media.tipo === 'M2');
        let mediaGeral = boletim?.objetos_medias.filter(media => media.tipo === 'MG');

        let array = [
          unidade1,
          unidade2,
          recuperacao1,
          media1,
          unidade3,
          unidade4,
          recuperacao2,
          media2,
          mediaGeral
        ]

        return array;
    }

    function isAvaliacao(avaliacao: AvaliacaoProps | MediaProps): avaliacao is AvaliacaoProps {
        return (avaliacao as AvaliacaoProps).nota !== undefined;
    }
    
    const unidades = formatarNotas(route.params?.boletim);

    return (
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
                    <Text style={styles.text}>Notas</Text>
                    <FontAwesome5 name="file-invoice" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <Carousel style={{justifyContent: 'center', alignItems: 'center'}}
                        data={unidades}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.notasContainer}>
                                <View style={styles.unidadeContainer}>
                                    <Text style={styles.unidade}>{item && item.length > 0 ? getRotulo(item[0]) : 'Avaliação Indefinida'}</Text>
                                </View>
                                {item && item.map((avaliacao, index) => (
                                    <View key={index} style={styles.notaContainer}>
                                        <Text style={styles.disciplina}>{avaliacao.objeto_disciplina.nome}:</Text>
                                        <View style={styles.boxNota}>
                                            <Text style={styles.nota}>
                                                {isAvaliacao(avaliacao) ? (avaliacao as AvaliacaoProps).nota : (avaliacao as MediaProps).valor}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        useScrollView={true}
                    />
                </View>
            </ScrollView>
        </View>
        
    );
}

