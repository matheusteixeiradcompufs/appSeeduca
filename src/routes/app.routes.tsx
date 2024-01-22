import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "../pages/Dashboard";
import MinhaEscola from "../pages/MinhaEscola";
import Pessoal from "../pages/Pessoal";

export type StackAppParamsList = {
    Dashboard: undefined;
    MinhaEscola: {
        id: number | string;
    };
    Pessoal: undefined;
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
        </Stack.Navigator>
    )
}

export default AppRoutes;