import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { FontAwesome5 } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.8;
const ITEM_WIDTH = SLIDER_WIDTH * 0.8;

type RouteDetailParams = {
    Boletim: {
        boletim: BoletimProps | undefined;
    }
}

type DisciplinaProps = {
    id: number | string;
    nome: string;
}

type MediaProps = {
    id: number | string;
    tipo: string;
    valor: number;
    disciplina: number | string;
    boletim: number | string;
    objeto_disciplina: DisciplinaProps;
}

type SituacaoProps = {
    id: number | string;
    situacao: string;
    finalizar: boolean;
    disciplina: number | string;
    boletim: number | string;
    objeto_disciplina: DisciplinaProps;
}

type AvaliacaoProps = {
    id: number | string;
    nome: string;
    nota: number;
    aluno: number | string;
    disciplina: number | string;
    boletim: number | string;
    turma: number | string;
    objeto_disciplina: DisciplinaProps;
}

type BoletimProps = {
    id: number | string;
    ano: number | string;
    aluno: number | string;
    objetos_avaliacoes: AvaliacaoProps[];
    objetos_medias: MediaProps[];
    objetos_situacoes: SituacaoProps[];
}

type BoletimRouteProps = RouteProp<RouteDetailParams, 'Boletim'>;

export default function Notas(){
    // const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<BoletimRouteProps>();

    // const [boletim, setBoletim] = useState<BoletimProps | undefined>();

    // function getDisciplina(index: number){
    //     let disciplina = '';

    //     switch(index){
    //       case 1 : disciplina = 'Artes'; break;
    //       case 2 : disciplina = 'Ciências'; break;
    //       case 3 : disciplina = 'Geografia'; break;
    //       case 4 : disciplina = 'História'; break;
    //       case 5 : disciplina = 'Matemática'; break;
    //       case 6 : disciplina = 'Português'; break;
    //     }
    //   return disciplina;
    // }

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
    
    // useEffect(() => {
    //   const loadBoletim = async () => {    
    //       setLoading(true);
    //       try{
    //           const response = await api.get(`/pessoas/aluno/boletim/api/v1/${route.params?.id}`);
              
    //           const {
    //               id,
    //               ano,
    //               aluno,
    //               objetos_avaliacoes
    //             } = await response.data;

    //           setBoletim({
    //               id: id,
    //               ano: ano,
    //               aluno: aluno,
    //               objetos_avaliacoes: objetos_avaliacoes
    //           });

    //           setLoading(false);
    //       }catch(err){
    //           console.log(err);
    //           setLoading(false);
    //       }
    //   };
    //   loadBoletim();
    // }, []);

    // if(loading){
    //     return(
    //         <View
    //             style={{
    //                 flex: 1,
    //                 backgroundColor: '#d9d9d9',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <ActivityIndicator size={60} color='#02489a'/>
    //         </View>
    //     )
    // }

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
        marginRight: 157,
    },
    content: {
        width: '100%',
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unidadeContainer: {
        backgroundColor: '#545353',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    unidade: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    notasContainer: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
    },
    notaContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        paddingLeft: 10,
        paddingRight: 2,
        borderWidth: 0.5,
        borderColor: '#545353'
    },
    disciplina: {
        color: '#545353',
        fontSize: 28,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxNota: {
        width: 55,
        height: 55,
        backgroundColor: '#938e8e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    nota: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    }
  });
