import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    login: (credentials: LoginProps) => Promise<void>;
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

const API_BASE_URL = 'http://192.168.0.110/api';

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
                api.defaults.headers.common['Authorization'] = `Bearer ${storedAccessToken}`

                setUser({
                    username: storedUsername || '',
                    first_name: storedFirstName || '',
                    access: storedAccessToken,
                    refresh: storedRefreshToken
                });
            }

            setLoading(false);
            
        };

        // Verifica se existem tokens salvos no AsyncStorage ao iniciar o componente
        checkTokensInStorage();
    }, []);

    async function obterTokens({ username, password } : LoginProps) {
        setLoadingAuth(true);

        try {
            const response = await fetch(`${API_BASE_URL}/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Falha na autenticação');
            }
    
            const { access, refresh } = await response.json();

            // Salva os tokens no AsyncStorage
            await AsyncStorage.setItem('@appseeduca:accessToken', access);
            await AsyncStorage.setItem('@appseeduca:refreshToken', refresh);

            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

            user.access = access;
            user.refresh = refresh;
        
            setLoadingAuth(false);

        } catch (error) {
            console.error('Erro durante o login:', error);
            alert('Erro durante o login. Verifique suas credenciais.');
            
            setLoadingAuth(false);
        }
    };

    async function refreshToken(){
        setLoadingAuth(true);
        
        try {
            const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: user.refresh,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Falha ao atualizar o token');
            }
    
            const data = await response.json();
            const newAccessToken = data.access;
    
            user.access = newAccessToken;
    
            // Salva o novo token de acesso no AsyncStorage
            await AsyncStorage.setItem('@appseeduca:accessToken', newAccessToken);

            setLoadingAuth(false);
        } catch (error) {
            console.error('Erro ao atualizar o token:', error);
    
            // Se houver um erro 401, significa que tanto o token de acesso quanto o token de refresh estão expirados
            if (error) {
                alert('Sua sessão expirou. Faça login novamente.');
            }

            setLoadingAuth(false);
        }
    };

    async function logout() {
        setLoadingAuth(true);

        try {
            // Limpa os tokens no estado e no AsyncStorage
            user.username = '';
            user.first_name = '';
            user.access = '';
            user.refresh = '';

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
        user.username = username;
        user.first_name = first_name;
    }


    async function login({ username, password } : LoginProps) {
        setLoading(true);

        await obterTokens({ username, password });

        try{
            const response = await api.post('/pessoas/me/', {
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
            loadingAuth, 
            loading, 
            logout 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}