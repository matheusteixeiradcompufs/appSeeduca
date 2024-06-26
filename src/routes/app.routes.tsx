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
} from "../types";

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
        aluno: AlunoProps | undefined;
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