import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type RouteDetailParams = {
    Carteira: {
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

type AlunoRouteProps = RouteProp<RouteDetailParams, 'Carteira'>;
    
export default function Carteira(){
    const route = useRoute<AlunoRouteProps>();

    const dataAtual = new Date();

    const alunoMatriculado = route.params?.aluno?.objetos_boletins.some(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    const boletins = route.params?.aluno?.objetos_boletins.filter(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.lineImage}>
                    <View>
                        <Image
                            style={styles.photo}
                            source={ route.params?.aluno?.retrato ?  { uri: `http://192.168.0.113${route.params?.aluno?.retrato}` } : require('../../assets/Foto.png')} 
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.topicColumn}>Matricula:</Text>
                        <Text style={styles.infoColumn}>{ route.params?.aluno?.matricula }</Text>
                        
                        <Text style={styles.topicColumn}>Turma:</Text>
                        {alunoMatriculado ? 
                            <Text style={styles.infoColumn}>{ boletins && boletins[boletins.length - 1].objeto_turma.nome }</Text> : 
                            <Text style={styles.infoColumn}>O aluno não está matriculado</Text>
                        }
                    </View>
                </View>
                
                <View style={styles.lineInfo}>
                    <Text style={styles.topicColumn}>Nome:</Text>
                    <Text style={styles.infoColumn}>{ route.params?.aluno?.objeto_usuario.first_name } { route.params?.aluno?.objeto_usuario.last_name }</Text>
                    
                    <Text style={styles.topicColumn}>Escola:</Text>
                    <Text style={styles.infoColumn}>{ boletins && boletins[boletins.length - 1].objeto_turma.objeto_sala.objeto_escola.nome }</Text>
                </View>
                <Text style={[styles.topicColumn, { fontSize: 20 }]}>Validade:</Text>
                <Text style={[styles.infoColumn, { fontSize: 30 }]}>12/{dataAtual.getFullYear()}</Text>

                <Image
                    style={styles.qrcode}
                    source={ boletins && boletins[boletins.length - 1].qr_code ?  { uri: boletins && `http://192.168.0.113${boletins[boletins.length - 1].qr_code}` } : require('../../assets/QRCode.png')}
                />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#646363',
        paddingVertical: '10%',
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#02489a',
        paddingVertical: '10%',
        paddingHorizontal: '10%',
        alignItems: 'center',
    },
    lineImage: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#02489a',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    photo:{
        width: 120,
        height: 160,
        borderRadius: 8,
    },
    column: {
        backgroundColor: '#02489a',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '13%',
    },
    lineInfo: {
        backgroundColor: '#02489a',
        width: '100%',
        marginTop: 36,
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
    qrcode: {
        width: 203,
        height: 203,
        marginTop: 20,
    }
})