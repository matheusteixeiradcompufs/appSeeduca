import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { format } from "date-fns"

type RouteDetailParams = {
    Pessoal: {
        aluno: AlunoProps;
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
    transporte: number | string;
}

type AgendaRecadosProps = {
    id: number | string;
    ano: number | string;
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

type AlunoRouteProps = RouteProp<RouteDetailParams, 'Pessoal'>;

export default function Pessoal(){
    // const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<AlunoRouteProps>();

    // const [aluno, setAluno] = useState<AlunoProps | undefined>();

    const dataAtual = new Date();

    // // useEffect(() => {
    // //     const loadAluno = async () => {    
    // //         setLoading(true);
    // //         try{
    // //             const response = await api.get(`/pessoas/aluno/api/v1/${route.params?.id}`);
                
    // //             const {
    // //                 id,
    // //                 matricula,
    // //                 cpf,
    // //                 data_nascimento,
    // //                 endereco,
    // //                 eh_pcd,
    // //                 retrato,
    // //                 objeto_usuario, 
    // //                 objetos_emails,
    // //                 objetos_telefones,
    // //                 objetos_boletins,
    // //             } = await response.data;

    // //             setAluno({
    // //                 id: id,
    // //                 matricula: matricula,
    // //                 cpf: cpf,
    // //                 data_nascimento: data_nascimento,
    // //                 endereco: endereco,
    // //                 eh_pcd: eh_pcd,
    // //                 retrato: retrato,
    // //                 objeto_usuario: objeto_usuario,
    // //                 objetos_emails: objetos_emails,
    // //                 objetos_telefones: objetos_telefones,
    // //                 objetos_boletins: objetos_boletins,
    // //             });

    // //             setLoading(false);
    // //         }catch(err){
    // //             console.log(err);
    // //             setLoading(false);
    // //         }
    // //     };

    // //     loadAluno();
    // // }, []);

    // // if(loading){
    // //     return(
    // //         <View
    // //             style={{
    // //                 flex: 1,
    // //                 backgroundColor: '#d9d9d9',
    // //                 justifyContent: 'center',
    // //                 alignItems: 'center',
    // //             }}
    // //         >
    // //             <ActivityIndicator size={60} color='#02489a'/>
    // //         </View>
    // //     )
    // }

    const alunoMatriculado = route.params?.aluno?.objetos_boletins.some(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    const boletins = route.params?.aluno?.objetos_boletins.filter(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    
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
                    <Text style={styles.text}>Pessoal</Text>
                    <FontAwesome5 name="user-alt" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <View style={styles.lineImage}>
                        <Image
                            style={styles.photo}
                            source={ route.params?.aluno?.retrato ?  { uri: route.params?.aluno?.retrato } : require('../../assets/Foto.png')} 
                        />
                        <View style={styles.column}>
                            <Text style={styles.topicColumn}>Matricula:</Text>
                            <Text style={styles.infoColumn}>{route.params?.aluno?.matricula}</Text>
                            
                            <Text style={styles.topicColumn}>Turma</Text>
                            {alunoMatriculado ? 
                                <Text style={styles.infoColumn}>{ boletins && boletins[0].objeto_turma.nome }</Text> : 
                                <Text style={styles.infoColumn}>O aluno não está matriculado</Text>
                            }
                        </View>
                    </View>
                    <Text style={styles.topic}>Nome:</Text>
                    <Text style={styles.info}>{route.params?.aluno?.objeto_usuario.first_name} {route.params?.aluno?.objeto_usuario.last_name}</Text>

                    <Text style={styles.topic}>Data de Nascimento:</Text>
                    <Text style={styles.info}>
                        {route.params?.aluno?.data_nascimento ? 
                            format(route.params?.aluno?.data_nascimento, 'dd/MM/yyyy')
                            : ''}
                    </Text>
                    
                    <Text style={styles.topic}>Endereço:</Text>
                    <Text style={styles.info}>{route.params?.aluno?.endereco}</Text>
                    
                    <Text style={styles.topic}>Email(s):</Text>
                    {route.params?.aluno?.objetos_emails.map((item, index) => (
                        <Text style={styles.infoColumn} key={index}>{item.endereco}</Text>
                    ))}
                    
                    <Text style={styles.topic}>Telefone(s):</Text>
                    {route.params?.aluno?.objetos_telefones.map((item, index) => (
                        <Text style={styles.infoColumn} key={index}>{item.numero}</Text>
                    ))}
                    
                    <Text style={styles.topic}>Enfermidade/Necessidade Especial:</Text>
                    <Text style={styles.info}>{route.params?.aluno?.eh_pcd ? 'Sim' : 'Não'}</Text>
                    
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
        marginRight: 126,
    },
    content: {
        width: '100%',
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 30,
    },
    lineImage: {
        width: '100%',
        backgroundColor: '#02489a',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    photo:{
        width: 120,
        height: 160,
        borderRadius: 8,
    },
    column: {
        width: 'auto',
        backgroundColor: '#02489a',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 85,
    },
    topicColumn: {
        color: '#d9d9d9',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 14,
    },
    infoColumn: {
        color: '#d9d9d9',
        fontSize: 20,
    },
    topic: {
        color: '#d9d9d9',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 14,
    },
    info: {
        color: '#d9d9d9',
        fontSize: 20,
    },
});
    