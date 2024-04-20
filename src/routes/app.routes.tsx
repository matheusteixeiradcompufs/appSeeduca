import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "../pages/Dashboard";
import MinhaEscola from "../pages/MinhaEscola";
import Pessoal from "../pages/Pessoal";
import Frequencia from "../pages/Frequencia";
import Transporte from "../pages/Transporte";
import Carteira from "../pages/Carteira";
import Notas from "../pages/Notas";
import Merenda from "../pages/Merenda";
import Agenda from "../pages/Agenda";
import Mural from "../pages/Mural";
import Recado from "../pages/Recado";
import Historico from "../pages/Historico";

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

export type StackAppParamsList = {
    Dashboard: undefined;
    MinhaEscola: {
        minhaEscola: MinhaEscolaProps | undefined;
    };
    Pessoal: {
        aluno: AlunoProps | undefined;
    };
    Frequencia: {
        frequencia: FrequenciaProps | undefined;
    };
    Transporte: {
        transporte: TransporteProps | undefined;
    };
    Carteira: {
        aluno: AlunoProps | undefined;
    };
    Notas: {
        boletim: BoletimProps | undefined;
    };
    Merenda: {
        cardapios: CardapioProps[] | undefined;
    };
    Agenda: {
        agenda: AgendaProps | undefined;
    };
    Mural: {
        murais: MuralProps[] | undefined;
    };
    Recado: {
        agendaRecados: AgendaRecadosProps | undefined;
    };
    Historico: {
        id: number | string;
    };
}

const Stack = createNativeStackNavigator<StackAppParamsList>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='Dashboard' 
                component={Dashboard} 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='MinhaEscola' 
                component={MinhaEscola}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Pessoal' 
                component={Pessoal}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Frequencia' 
                component={Frequencia}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Transporte' 
                component={Transporte}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Carteira' 
                component={Carteira}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Notas' 
                component={Notas}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Merenda' 
                component={Merenda}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Agenda' 
                component={Agenda}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Mural' 
                component={Mural}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Recado' 
                component={Recado}  
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Historico' 
                component={Historico}  
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes;