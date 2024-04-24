import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { FrequenciaProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Frequencia: {
        frequencia: FrequenciaProps;
    }
}

type FrequenciaRouteProps = RouteProp<RouteDetailParams, 'Frequencia'>;

export default function Frequencia(){
    const { user } = useContext(AuthContext);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<FrequenciaRouteProps>();

    const percentual = route.params?.frequencia?.percentual as number;
    const presencas = route.params?.frequencia?.objetos_diasletivos.filter(item => item.presenca === true);
    
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
                    <Text style={styles.text}>Frequência</Text>
                    <FontAwesome5 name="user-clock" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.info}>
                    <Text style={styles.nome}>{user.first_name}</Text>
                    <Text style={styles.textInfo}>Você possui { presencas?.length } presenças em { route.params?.frequencia?.objetos_diasletivos.length } dias de aula</Text>
                </View>

                <View style={styles.contentBar}>
                    { !!percentual ? 
                    <View style={[styles.leftBar, { width: `${percentual}%` }]}>
                        { percentual >= 25 ? <Text style={styles.percent}>{percentual}%</Text> : null }
                    </View> :
                    <View style={[styles.leftBar, { width: `0%` }]}>
                        { percentual >= 25 ? <Text style={styles.percent}>{percentual}%</Text> : null }
                    </View>}
                    { percentual < 25 ? <Text style={styles.percentInvert}>{percentual}%</Text> : null }
                </View>

                <Text style={styles.alert}>O aluno precisa ter ao menos 75% de frequência para passar de ano</Text>
            </ScrollView>
        </View>
    )
}
