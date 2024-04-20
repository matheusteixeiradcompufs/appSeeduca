import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    login: (credentials: LoginProps) => Promise<void>;
    refreshToken: () => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    logout: () => Promise<void>;
}

type UserProps = {
    username: string;
    first_name: string;
    access: string;
    refresh: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type LoginProps = {
    username: string;
    password: string;
}

// const API_BASE_URL = 'http://192.168.0.113/api';

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        username: '',
        first_name: '',
        access: '',
        refresh: ''
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.access;

    useEffect(() => {
        async function checkTokensInStorage(){
            const storedUsername = await AsyncStorage.getItem('@appseeduca:username');
            const storedFirstName = await AsyncStorage.getItem('@appseeduca:firstName');
            const storedAccessToken = await AsyncStorage.getItem('@appseeduca:accessToken');
            const storedRefreshToken = await AsyncStorage.getItem('@appseeduca:refreshToken');
        
            if (storedAccessToken && storedRefreshToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storedAccessToken}`

                setUser({
                    username: storedUsername || '',
                    first_name: storedFirstName || '',
                    access: storedAccessToken,
                    refresh: storedRefreshToken
                });
            }

            setLoading(false);
        };
        checkTokensInStorage();
    }, []);

    async function obterTokens({ username, password } : LoginProps) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/api/token/', {
                username,
                password,
            });

            const { access, refresh } = response.data;

            // Salva os tokens no AsyncStorage
            await AsyncStorage.setItem('@appseeduca:accessToken', access);
            await AsyncStorage.setItem('@appseeduca:refreshToken', refresh);

            api.defaults.headers['Authorization'] = `Bearer ${access}`;

            setUser(prevUser => ({
                ...prevUser,
                access,
                refresh,
            }));
        
            setLoadingAuth(false);

        } catch (error) {
            console.log('Erro durante o login:', error);
            alert('Erro durante o login. Verifique suas credenciais.');
            
            setLoadingAuth(false);
        }
    };

    async function refreshToken(){
        setLoading(true);
        try {
            const response = await api.post('/token/refresh/', {
                refresh: user.refresh,
            });
    
            const { access } = await response.data;
            const newAccessToken = access;
            
             // Atualiza o token de acesso
            setUser(prevUser => ({
                ...prevUser,
                access: newAccessToken
            }));

            // Atualiza o token de acesso nos cabeçalhos da API
            api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
    
            // Salva o novo token de acesso no AsyncStorage
            await AsyncStorage.setItem('@appseeduca:accessToken', newAccessToken);

            setLoading(false);
        } catch (error) {
            console.error('Erro ao atualizar o token:', error);
    
            // Se houver um erro 401, significa que tanto o token de acesso quanto o token de refresh estão expirados
            if (error) {
                alert('Sua sessão expirou. Faça login novamente.');
                logout();
            }

            setLoading(false);
        }
    };

    async function logout() {
        setLoadingAuth(true);
        try {
            // Limpa os tokens no estado e no AsyncStorage
            setUser({
                username: '',
                first_name: '',
                access: '',
                refresh: '',
            });

            await AsyncStorage.removeItem('@appseeduca:username');
            await AsyncStorage.removeItem('@appseeduca:firstName');
            await AsyncStorage.removeItem('@appseeduca:accessToken');
            await AsyncStorage.removeItem('@appseeduca:refreshToken');
            
            setLoadingAuth(false);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            
            setLoadingAuth(false);
        }
    };

    async function setUserAsync(username: string, first_name: string) {
        setUser(prevUser => ({
            ...prevUser,
            username,
            first_name,
        }));
    }


    async function login({ username, password } : LoginProps) {
        setLoading(true);

        await obterTokens({ username, password });

        try{
            const response = await api.post('/pessoas/me/aluno/', {
                username
            });

            const data = response.data;

            const { objeto_usuario } = data;
            const { first_name } = objeto_usuario;

            await setUserAsync(username, first_name);

            await AsyncStorage.setItem('@appseeduca:username', username);
            await AsyncStorage.setItem('@appseeduca:firstName', first_name);

            console.log(`Usuário ${user.first_name} logado`);
            
            setLoading(false);
        }catch(error){
            console.log('Usuário não pode logar no App!');
            alert('Usuário não pode logar no App!');
            setLoading(false);
        }

    };

    return(
        <AuthContext.Provider 
         value={{ 
            user, 
            isAuthenticated, 
            login, 
            refreshToken,
            loadingAuth, 
            loading, 
            logout 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}