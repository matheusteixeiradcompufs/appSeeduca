import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { TransporteProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Transporte: {
        transporte: TransporteProps | undefined;
    }
}

type TransporteRouteProps = RouteProp<RouteDetailParams, 'Transporte'>;

export default function Transporte(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<TransporteRouteProps>();

    const formatarTipo = (tipo: string | undefined) => {
        switch (tipo) {
            case 'C': return 'Carro';
            case 'O': return 'ônibus';
            case 'V': return 'Van';
            case 'X': return 'Outros';
            default: return 'Outros';
        }
    };

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
                    <Text style={styles.text}>Transporte</Text>
                    <FontAwesome5 name="bus-alt" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <Text style={styles.topic}>Tipo:</Text>
                    <Text style={styles.info}>{ formatarTipo(route.params?.transporte?.tipo) }</Text>

                    <Text style={styles.topic}>Placa:</Text>
                    <Text style={styles.info}>{ route.params?.transporte?.placa }</Text>
                    
                    <Text style={styles.topic}>Motorista:</Text>
                    <Text style={styles.info}>{ route.params?.transporte?.nomeMotorista }</Text>
                    
                    <Text style={styles.topic}>Auxiliar:</Text>
                    <Text style={styles.info}>{ route.params?.transporte?.nomeAuxiliar }</Text>
                    
                    <Text style={styles.topic}>Telefons(s):</Text>
                    {route.params?.transporte?.objetos_telefones.map((item, index) => (
                        <Text style={styles.info} key={index}>{item.numero}</Text>
                    ))}
                    
                    <Text style={styles.topic}>Itinerário:</Text>
                    <Text style={styles.info}>{ route.params?.transporte?.itinerario }</Text>
                    
                    
                </View>
            </ScrollView>
        </View>
    )
}
