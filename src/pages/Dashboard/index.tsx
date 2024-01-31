import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type DiaLetivoProps = {
    id: number | string;
    data: Date | string;
    presenca: boolean;
    frequencia: number | string;
}

type TelefoneProps = {
    id: number | string;
    numero: string;
    transporte: number | string;
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

type FrequenciaProps = {
    id: number | string;
    ano: number | string;
    percentual: number;
    aluno: number | string;
    objetos_disletivos: DiaLetivoProps[];
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
    data: string;
    disciplinas: number[] | string[];
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
    ano: number | string;
    objeto_agenda: AgendaProps;
}

type AlunoProps = {
    id: number | string;
    escola: number | string;
    turmas: number[];
    aluno_boletins: number[];
    aluno_frequencias: number[];
    alunos_transportes:[];
    objetos_turmas: TurmaProps[];
    objetos_frequencias: FrequenciaProps[];
    objetos_transportes: TransporteProps[];
    objetos_boletins: BoletimProps[];
}


export default function Dashboard(){
    const { user, loading, logout } = useContext(AuthContext);

    const [aluno, setAluno] = useState<AlunoProps>();

    const dataAtual = new Date();

    useEffect(() => {
        const loadUser = async () => {    
            try{
                const response = await api.post('/pessoas/me', {
                    username: user.username
                });
                
                const { 
                    id,
                    escola, 
                    turmas, 
                    aluno_boletins, 
                    aluno_frequencias, 
                    alunos_transportes,
                    objetos_turmas,
                    objetos_frequencias,
                    objetos_transportes,
                    objetos_boletins, 
                } = response.data;

                setAluno({ 
                    id: id,
                    escola: escola, 
                    turmas: turmas, 
                    aluno_boletins: aluno_boletins, 
                    aluno_frequencias: aluno_frequencias, 
                    alunos_transportes: alunos_transportes ,
                    objetos_turmas: objetos_turmas,
                    objetos_frequencias: objetos_frequencias,
                    objetos_transportes: objetos_transportes,
                    objetos_boletins: objetos_boletins,
                });

            }catch(err){
                console.log(err);
            }
        };

        loadUser();
    }, []);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();

    function formatMounth(mounth: number){
        switch(mounth){
            case 0 : return 'janeiro';
            case 1 : return 'fevereiro';
            case 2 : return 'março';
            case 3 : return 'abril';
            case 4 : return 'maio';
            case 5 : return 'junho';
            case 6 : return 'julho';
            case 7 : return 'agosto';
            case 8 : return 'setembro';
            case 9 : return 'outubro';
            case 10 : return 'novembro';
            case 11 : return 'dezembro';
        }
    }

    function formatDay(day: number){
        switch(day){
            case 0 : return 'domingo';
            case 1 : return 'segunda';
            case 2 : return 'terça';
            case 3 : return 'quarta';
            case 4 : return 'quinta';
            case 5 : return 'sexta';
            case 6 : return 'sábado';
        }
    }

    async function openMinhaEscola() {
        const escola = aluno?.escola as number | string;
        navigation.navigate('MinhaEscola', { id: escola });
    }

    async function openPessoal() {
        const id = aluno?.id as number | string;
        navigation.navigate('Pessoal', { id: id });
    }

    async function openCarteira() {
        const id = aluno?.id as number | string;
        navigation.navigate('Carteira', { id: id});
    }

    async function openMerenda() {
        const escola = aluno?.escola as number | string;
        navigation.navigate('Merenda', { id: escola });
    }

    async function openMural() {
        const escola = aluno?.escola as number | string;
        navigation.navigate('Mural', { id: escola });
    }

    async function openFrequencia() {
        const hasFrequencia = aluno?.objetos_frequencias.some(objeto => objeto.ano === dataAtual.getFullYear());
        const frequencias = aluno?.objetos_frequencias.filter((objeto) => (objeto.ano === dataAtual.getFullYear())); 
        frequencias && hasFrequencia ? navigation.navigate('Frequencia', { id: frequencias[0].id}) : alert("Você ainda não possui frequência para esse ano!");
    }

    async function openTransporte() {
        const hasTransporte = aluno?.objetos_transportes.some(objeto => objeto.ano === dataAtual.getFullYear());
        const transportes = aluno?.objetos_transportes.filter((objeto) => (objeto.ano === dataAtual.getFullYear())); 
        transportes && hasTransporte ? navigation.navigate('Transporte', { id: transportes[0].id}) : alert("Você ainda não tem um transporte esse ano!");
    }

    async function openNotas() {
        const hasBoletim = aluno?.objetos_boletins.some(objeto => objeto.ano === dataAtual.getFullYear());
        const boletins = aluno?.objetos_boletins.filter(objeto => objeto.ano === dataAtual.getFullYear());
        boletins && hasBoletim ? navigation.navigate('Notas', { id: boletins[0].id}) : alert("Você ainda não tem um boletim cadastrado esse ano!");
        
    }

    async function openAgenda() {
        const alunoMatriculado = aluno?.objetos_turmas.some(objeto => objeto.ano === dataAtual.getFullYear());
        const turmas = aluno?.objetos_turmas.filter(objeto => objeto.ano === dataAtual.getFullYear());
        alunoMatriculado && turmas ? navigation.navigate('Agenda', { id: turmas[turmas.length - 1].objeto_agenda.id }) : alert("Aluno não está matriculado em nenhuma turma ou a turma não tem agenda cadastrada!");
    }

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
            <ScrollView>
                <View style={styles.lineTextContainer}>
                    <Text style={[styles.textId]}>Bom dia {user.first_name}!</Text>
                    <Text style={styles.textDate}>Hoje, {formatDay(dataAtual.getDay())}, {dataAtual.getDate()} de {formatMounth(dataAtual.getMonth())}</Text>
                </View>
            
                <View style={styles.lineContainer}>
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 20}]}
                        onPress={openMinhaEscola}
                    >
                        <View>
                            <Text style={styles.textButton}>Minha</Text>
                            <Text style={styles.textButton}>Escola</Text>
                        </View>
                        <FontAwesome5 name="school" size={45} color='#d9d9d9' />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={openPessoal}
                    >
                        <Text style={styles.textButton}>Pessoal</Text>
                        <FontAwesome5 name="user-alt" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.lineContainer}>
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 20}]}
                        onPress={openAgenda}
                    >
                        <View>
                            <Text style={styles.textButton}>Agenda</Text>
                            <Text style={styles.textButton}>Escolar</Text>
                        </View>
                        <FontAwesome5 name="address-book" size={45} color='#d9d9d9' />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={openFrequencia}
                    >
                        <Text style={styles.textButton}>Frequência</Text>
                        <FontAwesome5 name="user-clock" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.lineContainer}>
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 20}]}
                        onPress={openNotas}
                    >
                        <Text style={styles.textButton}>Notas</Text>
                        <FontAwesome5 name="file-invoice" size={45} color='#d9d9d9' />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={openMerenda}
                    >
                        <Text style={styles.textButton}>Merenda</Text>
                        <FontAwesome5 name="apple-alt" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.lineContainer}>
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 20}]}
                        onPress={openMural}
                    >
                        <View>
                            <Text style={styles.textButton}>Mural de</Text>
                            <Text style={styles.textButton}>Avisos</Text>
                        </View>
                        <FontAwesome5 name="chalkboard" size={45} color='#d9d9d9' />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={openTransporte}
                    >
                        <Text style={styles.textButton}>Transporte</Text>
                        <FontAwesome5 name="bus-alt" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.lineContainer}>
                    <TouchableOpacity style={[styles.button, {marginRight: 20}]}>
                        <Text style={styles.textButton}>Recado</Text>
                        <FontAwesome5 name="comments" size={45} color='#d9d9d9' />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={openCarteira}
                    >
                        <View>
                            <Text style={styles.textButton}>Carteira</Text>
                            <Text style={styles.textButton}>Estudantil</Text>
                        </View>
                        <FontAwesome5 name="id-card" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.lineContainer}>
                    <TouchableOpacity style={[styles.button, {marginRight: 20}]}>
                        <Text style={styles.textButton}>Histórico</Text>
                        <FontAwesome5 name="history" size={45} color='#d9d9d9' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={logout}>
                        <Text style={styles.textButton}>Sair</Text>
                        <FontAwesome5 name="sign-out-alt" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
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
    lineTextContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 17,
        marginBottom: 14,
    },
    lineContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    textId: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#02489a',
    },
    textDate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#02489a'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 176,
        height: 100,
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingStart: 9,
        paddingEnd: 8,
    },
    textButton: {
        color: '#d9d9d9',
        fontWeight: 'bold',
        fontSize: 20,
    }
})