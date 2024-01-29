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

export type StackAppParamsList = {
    Dashboard: undefined;
    MinhaEscola: {
        id: number | string;
    };
    Pessoal: {
        id: number | string;
    };
    Frequencia: {
        id: number | string;
        hasFrequencia: boolean;
    };
    Transporte: {
        id: number | string;
        hasTransporte: boolean;
    };
    Carteira: {
        id: number | string;
    };
    Notas: {
        id: number | string;
    };
    Merenda: {
        id: number | string;
    };
    Agenda: {
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
        </Stack.Navigator>
    )
}

export default AppRoutes;