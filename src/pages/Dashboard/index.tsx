import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api"; 
import {
    AgendaProps,
    AgendaRecadosProps,
    AlunoProps,
    BoletimProps,
    CardapioProps,
    FrequenciaProps,
    MinhaEscolaProps,
    MuralProps,
    TransporteProps
} from "../../types";
import { styles } from "./styles";

export default function Dashboard(){
    const { user, refreshToken, logout } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [aluno, setAluno] = useState<AlunoProps>();
    const [matriculado, setMatriculado] = useState<boolean | undefined>(false);
    const [minhaEscola, setMinhaEscola] = useState<MinhaEscolaProps>();
    const [frequencia, setFrequencia] = useState<FrequenciaProps>();
    const [hasTransporte, setHasTransporte] = useState<boolean | undefined>(false);
    const [transporte, setTransporte] = useState<TransporteProps>();
    const [cardapios, setCardapios] = useState<CardapioProps[]>();
    const [murais, setMurais] = useState<MuralProps[]>();
    const [agenda, setAgenda] = useState<AgendaProps>();
    const [boletim, setBoletim] = useState<BoletimProps>();
    const [agendaRecados, setAgendaRecados] = useState<AgendaRecadosProps>();

    const dataAtual = new Date();

    useEffect(() => {
        const loadUser = async () => { 
            try{
                const response = await api.post('/pessoas/me/aluno/', {
                    username: user.username
                });

                setAluno(response.data);

                console.log("Status da resposta antes do catch:", response.status);
                setLoading(false);

            }catch(err: any){
                console.log('Mensagem de erro loadUser: ', err)
                try{
                    await refreshToken();
                    await loadUser();
                }catch(error){
                    console.log('Mensagem de erro refreshToken: ', error)
                    logout();
                }
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        const loadSala = async() => {
            setLoading(true);
            
            const alunoMatriculado = aluno?.objetos_boletins.some(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
            setMatriculado(alunoMatriculado);
            const boletins = aluno?.objetos_boletins.filter(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
            const boletim = boletins && boletins[boletins?.length-1];
            setMinhaEscola(boletim?.objeto_turma.objeto_sala.objeto_escola);
            setFrequencia(boletim?.objeto_frequencia);
            setHasTransporte(aluno?.objetos_transportes.some(objeto => objeto.ano === dataAtual.getFullYear()));
            const transportes = aluno?.objetos_transportes.filter((objeto) => (objeto.ano === dataAtual.getFullYear()));
            setTransporte(transportes && transportes[transportes?.length-1]);
            setCardapios(boletim?.objeto_turma.objeto_sala.objeto_escola.objetos_cardapios);
            setMurais(boletim?.objeto_turma.objeto_sala.objeto_escola.objetos_murais);
            setAgenda(boletim?.objeto_turma.objeto_agenda);
            setAgendaRecados(boletim?.objeto_agenda);
            setBoletim(boletim);
            setLoading(false);
        }

        loadSala();

    }, [aluno])
    
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
        matriculado ? navigation.navigate('MinhaEscola', { minhaEscola: minhaEscola }) : alert("Você ainda não tem está matriculado em nenhuma turma esse ano!");
    }

    async function openPessoal() {
        navigation.navigate('Pessoal', { aluno: aluno });
    }

    async function openCarteira() {
        matriculado ? navigation.navigate('Carteira', { aluno: aluno }) : alert('Você ainda não está matriculado em nehuma turma esse ano!');
    }

    async function openMerenda() {
        matriculado ? navigation.navigate('Merenda', { cardapios: cardapios }) : alert("Você ainda não tem está matriculado em nenhuma turma esse ano!");
    }

    async function openMural() {
        matriculado ? navigation.navigate('Mural', { murais: murais }) : alert("Você ainda não tem está matriculado em nenhuma turma esse ano!");
    }

    async function openFrequencia() {
        matriculado ? navigation.navigate('Frequencia', { frequencia: frequencia }) : alert('Você ainda não está matriculado em nehuma turma esse ano!');
    }

    async function openTransporte() {
        hasTransporte ? navigation.navigate('Transporte', { transporte: transporte }) : alert("Você ainda não tem um transporte esse ano!");
    }

    async function openNotas() {
        matriculado ? navigation.navigate('Notas', { boletim: boletim }) : alert("Você ainda não tem um boletim cadastrado esse ano!");        
    }

    async function openRecado() {
        matriculado ? navigation.navigate('Recado', { agendaRecados: agendaRecados }) : alert("Você ainda não tem uma agenda de recados esse ano!");
        
    }

    async function openAgenda() {
        matriculado ? navigation.navigate('Agenda', { agenda: agenda }) : alert("Aluno não está matriculado em nenhuma turma ou a turma não tem agenda cadastrada!");
    }

    async function openHistorico() {
        navigation.navigate('Historico', { aluno: aluno });
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
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 20}]}
                        onPress={openRecado}
                    >
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
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 20}]}
                        onPress={openHistorico}
                    >
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
