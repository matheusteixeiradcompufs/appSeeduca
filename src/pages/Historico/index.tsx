import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import Carousel from "react-native-snap-carousel";
import { api } from "../../services/api";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.95;
const ITEM_WIDTH = SLIDER_WIDTH * 0.85;

type RouteDetailParams = {
    Historico: {
        aluno: AlunoProps | undefined;
    }
}

type DisciplinaProps = {
    id: number | string;
    nome: string;
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

type ItemProps = {
    id: number | string;
    nome: string;
    descricao: string;
}

type CardapioProps = {
    id: number | string;
    data: Date | string;
    turno: string;
    itens: number[];
    escola: number | string;
    objetos_itens: ItemProps[];
}

type MuralProps = {
    id: number | string;
    ano: number;
    escola: number | string;
    objetos_avisos: AvisoProps[];
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
    objetos_cardapios: CardapioProps[];
    objetos_murais: MuralProps[];
}

type SalaProps = {
    id: number | string;
    numero: number;
    quantidade_alunos: number;
    escola: number | string;
    objeto_escola: MinhaEscolaProps;
}

type AvaliacaoProps = {
    id: number | string;
    nome: string;
    nota: number;
    confirmar: boolean;
    aluno: number | string;
    disciplina: number | string;
    boletim: number | string;
    objeto_disciplina: DisciplinaProps;
}

type TransporteProps = {
    id: number | string;
    placa: string;
    ano: number;
    tipo: string;
    nomeMotorista: string;
    nomeAuxiliar: string;
    itinerario: string;
    alunos: number[] | string[];
    objetos_telefones: TelefoneProps[];
}

type TarefaProps = {
    id: number | string;
    nome: string;
    descricao: string;
    tipo: boolean;
    cadastrada_em: Date | string;
    entrega: string;
    diaAgenda: number | string;
}

type AvisoProps = {
    id: number | string;
    titulo: string;
    texto: string;
    publicado_em: Date | string;
    diaAgenda: number | string;
}

type DiaProps = {
    id: number | string;
    data: Date | string;
    util: boolean;
    disciplinas: number[] | string[];
    agenda: number | string;
    objetos_disciplinas: DisciplinaProps[];
    objetos_avisos: AvisoProps[];
    objetos_tarefas: TarefaProps[];
}

type AgendaProps = {
    id: number | string;
    turma: number | string;
    objetos_dias: DiaProps[];
}

type TurmaProps = {
    id: number | string;
    nome: string;
    ano: number;
    turno: string;
    sala: number | string;
    disciplinas: number[];
    objeto_agenda: AgendaProps;
    objetos_disciplinas: DisciplinaProps[];
    objeto_sala: SalaProps;
}

type RecadoProps = {
    id: number | string;
    texto: string;
    eh_aluno: boolean;
    publicado_em: Date | string;
    pessoa: number | string;
    agenda: number | string;
}

type AgendaRecadosProps = {
    id: number | string;
    boletim: number | string;
    objetos_recados: RecadoProps[];
}

type DiaLetivoProps = {
    id: number | string;
    data: Date | string;
    presenca: boolean;
    frequencia: number | string;
}

type FrequenciaProps = {
    id: number | string;
    percentual: number;
    boletim: number | string;
    objetos_diasletivos: DiaLetivoProps[];
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

type BoletimProps = {
    id: number | string;
    aluno: number | string;
    status: string;
    encerrar: boolean;
    qr_code: string;
    turma: number | string;
    objeto_turma: TurmaProps;
    objeto_frequencia: FrequenciaProps;
    objetos_avaliacoes: AvaliacaoProps[];
    objetos_medias: MediaProps[];
    objetos_situacoes: SituacaoProps[];
    objeto_agenda: AgendaRecadosProps;
}

type UserProps = {
    id: number | string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

type ResponsavelProps = {
    id: number | string;
    cpf: string;
    nome: string;
    observacao: string;
    aluno: number | string;
}

type AlunoProps = {
    id: number | string;
    matricula: string;
    cpf: string;
    data_nascimento: string;
    endereco: string;
    eh_pcd: boolean;
    retrato: string;
    objeto_usuario: UserProps;
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
    objetos_responsaveis: ResponsavelProps[];
    objetos_boletins: BoletimProps[];
    objetos_transportes: TransporteProps[];
}

type HistoricoRouteProps = RouteProp<RouteDetailParams, 'Historico'>;

export default function Historico(){
    // const [loading, setLoading] = useState(true);

    // const [aluno, setAluno] = useState<AlunoProps>();

    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();

    const route = useRoute<HistoricoRouteProps>();

    // useEffect(() => {
    //     const loadBoletim = async () => {    
    //         setLoading(true);
    //         try{
    //             const response = await api.get(`/pessoas/aluno/api/v1/${route.params?.id}`);
                
    //             const {
    //                 id,
    //                 objeto_usuario,
    //                 objetos_boletins
    //               } = await response.data;
  
    //             setAluno({
    //                 id: id,
    //                 objeto_usuario: objeto_usuario,
    //                 objetos_boletins: objetos_boletins
    //             });
  
    //             setLoading(false);
    //         }catch(err){
    //             console.log(err);
    //             setLoading(false);
    //         }
    //     };
    //     loadBoletim();
    //   }, []);

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
        marginRight: 110,
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
})