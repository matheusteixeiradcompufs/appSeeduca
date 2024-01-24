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
        id: number | string;
    }
}

type AvaliacaoProps = {
    id: number | string;
    nome: string;
    nota: number;
    aluno: number | string;
    disciplina: number | string;
    boletim: number | string;
    turma: number | string;
}

type BoletimProps = {
    id: number | string;
    ano: number | string;
    aluno: number | string;
    objetos_avaliacoes: AvaliacaoProps[];
}

type BoletimRouteProps = RouteProp<RouteDetailParams, 'Boletim'>;

export default function Notas(){
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<BoletimRouteProps>();

    const [boletim, setBoletim] = useState<BoletimProps | undefined>();

    // const unidades = [
    //     { id: 1, notas: [8.5, 9, 7, 8, 9, 7] },
    //     { id: 2, notas: [6, 8, 7, 8, 9, 7] },
    //     { id: 3, notas: [9, 7, 8, 8, 9, 7] },
    //     { id: 4, notas: [8, 9, 7, 8, 9, 7] },
    //     { id: 5, notas: [6, 8, 7, 8, 9, 7] },
    //     { id: 6, notas: [9, 7, 8, 8, 9, 7] },
    // ]; 

    function getDisciplina(index: number){
        let disciplina = '';

        switch(index){
          case 1 : disciplina = 'Artes'; break;
          case 2 : disciplina = 'Ciências'; break;
          case 3 : disciplina = 'Geografia'; break;
          case 4 : disciplina = 'História'; break;
          case 5 : disciplina = 'Matemática'; break;
          case 6 : disciplina = 'Português'; break;
        }
      return disciplina;
    }

    function getAvaliacao(codigo: string){
        let avaliacao = '';

        switch(codigo){
          case 'A1' : avaliacao = 'Unidade 1'; break;
          case 'A2' : avaliacao = 'Unidade 2'; break;
          case 'R1' : avaliacao = 'Recuperação 1'; break;
          case 'A3' : avaliacao = 'Unidade 3'; break;
          case 'A4' : avaliacao = 'Unidade 4'; break;
          case 'R2' : avaliacao = 'Recuperação 2'; break;
        }
      return avaliacao;
    }

    function formatarNotas(data: AvaliacaoProps[] | undefined){
        
        let unidade1 = data?.filter(avaliacao => avaliacao.nome === 'A1');
        let unidade2 = data?.filter(avaliacao => avaliacao.nome === 'A2');
        let recuperacao1 = data?.filter(avaliacao => avaliacao.nome === 'R1');
        let unidade3 = data?.filter(avaliacao => avaliacao.nome === 'A3');
        let unidade4 = data?.filter(avaliacao => avaliacao.nome === 'A4');
        let recuperacao2 = data?.filter(avaliacao => avaliacao.nome === 'R2');

        let array = [
          unidade1,
          unidade2,
          recuperacao1,
          unidade3,
          unidade4,
          recuperacao2
        ]

        return array;

        
    }
    
    useEffect(() => {
      const loadBoletim = async () => {    
          setLoading(true);
          try{
              const response = await api.get(`/pessoas/aluno/boletim/api/v1/${route.params?.id}`);
              
              const {
                  id,
                  ano,
                  aluno,
                  objetos_avaliacoes
                } = await response.data;

              setBoletim({
                  id: id,
                  ano: ano,
                  aluno: aluno,
                  objetos_avaliacoes: objetos_avaliacoes
              });

              setLoading(false);
          }catch(err){
              console.log(err);
              setLoading(false);
          }
      };
      loadBoletim();
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

    const unidades = formatarNotas(boletim?.objetos_avaliacoes);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    <Text style={styles.text}>Notas</Text>
                    <FontAwesome5 name="file-invoice" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <Carousel style={{justifyContent: 'center', alignItems: 'center'}}
                        data={unidades}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.notasContainer}>
                                <View style={styles.unidadeContainer}>
                                    <Text style={styles.unidade}>{item && item.length > 0 ? getAvaliacao(item[0].nome) : 'Avaliação Indefinida'}</Text>
                                </View>
                                {item && item.map((avaliacao, index) => (
                                    <View key={index} style={styles.notaContainer}>
                                        <Text style={styles.disciplina}>{getDisciplina(avaliacao.disciplina as number)}:</Text>
                                        <View style={styles.boxNota}>
                                            <Text style={styles.nota}>{avaliacao.nota}</Text>
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
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%',
    },
    header: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 37,
        marginBottom: 17,
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
