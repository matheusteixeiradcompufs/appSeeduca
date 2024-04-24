import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { MinhaEscolaProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    MinhaEscola: {
        minhaEscola: MinhaEscolaProps | undefined;
    }
}

type MinhaEscolaRouteProps = RouteProp<RouteDetailParams, 'MinhaEscola'>;

export default function MinhaEscola(){    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<MinhaEscolaRouteProps>();

    return(
        <View style={styles.container}>
            <ScrollView>
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

                <View style={styles.banner}>
                    <TouchableOpacity 
                        onPress={navigation.goBack}
                    >
                        <FontAwesome5 name="arrow-left" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
                    <Text style={styles.text}>Minha Escola</Text>
                    <FontAwesome5 name="school" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <Text style={styles.topic}>CNPJ:</Text>
                    <Text style={styles.info}>{route.params?.minhaEscola?.cnpj}</Text>

                    <Text style={styles.topic}>Nome:</Text>
                    <Text style={styles.info}>{ route.params?.minhaEscola?.nome }</Text>
                    
                    <Text style={styles.topic}>Descrição:</Text>
                    <Text style={styles.info}>{route.params?.minhaEscola?.descricao}</Text>
                    
                    <Text style={styles.topic}>Endereço:</Text>
                    <Text style={styles.info}>{route.params?.minhaEscola?.endereco}</Text>
                    
                    <Text style={styles.topic}>Número de Salas:</Text>
                    <Text style={styles.info}>{route.params?.minhaEscola?.num_salas} salas</Text>
                    
                    <Text style={styles.topic}>Telefone:</Text>
                    {route.params?.minhaEscola?.objetos_telefones && route.params?.minhaEscola?.objetos_telefones.length > 0 ? (
                        route.params?.minhaEscola?.objetos_telefones.map((item) => (
                        <Text key={item.id} style={styles.info}>{item.numero}</Text>
                        ))
                    ) : (
                        <Text style={styles.info}>Nenhum telefone disponível</Text>
                    )}
                    
                    <Text style={styles.topic}>Email:</Text>
                    {route.params?.minhaEscola?.objetos_emails && route.params?.minhaEscola?.objetos_emails.length > 0 ? (
                        route.params?.minhaEscola?.objetos_emails.map((item) => (
                        <Text key={item.id} style={styles.info}>{item.endereco}</Text>
                        ))
                    ) : (
                        <Text style={styles.info}>Nenhum email disponível</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}
