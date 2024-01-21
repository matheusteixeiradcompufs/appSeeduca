import React, { useEffect } from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Splash from "../pages/Splash";
import Login from "../pages/Login";
import Recover from "../pages/Recover";

export type StackAuthParamsList = {
    Splash: undefined;
    Login: undefined;
    Recover: undefined;
}

const Stack = createNativeStackNavigator<StackAuthParamsList>();

function AuthRoutes(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAuthParamsList>>();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Login');
        }, 1900);
    
        return () => clearTimeout(timer);
      }, [navigation]);

    return(
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown: false}}/>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false,
                    animation: 'fade', 
                    animationDuration: 700,
                    
                }}
            />
            <Stack.Screen name='Recover' component={Recover}/>
        </Stack.Navigator>
    )
}

export default AuthRoutes;