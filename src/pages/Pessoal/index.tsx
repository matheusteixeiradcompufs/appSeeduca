import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { BASE_URL } from "../../services/api";
import { format } from "date-fns"
import { AlunoProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Pessoal: {
        aluno: AlunoProps;
    }
}

type AlunoRouteProps = RouteProp<RouteDetailParams, 'Pessoal'>;

export default function Pessoal(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<AlunoRouteProps>();

    const dataAtual = new Date();

    const alunoMatriculado = route.params?.aluno?.objetos_boletins.some(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    const boletins = route.params?.aluno?.objetos_boletins.filter(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    
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
                    <Text style={styles.text}>Pessoal</Text>
                    <FontAwesome5 name="user-alt" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <View style={styles.lineImage}>
                        <Image
                            style={styles.photo}
                            source={ route.params?.aluno?.retrato ?  { uri: `${BASE_URL}${route.params?.aluno?.retrato}` } : require('../../assets/Foto.png')} 
                        />
                        <View style={styles.column}>
                            <Text style={styles.topicColumn}>Matricula:</Text>
                            <Text style={styles.infoColumn}>{route.params?.aluno?.matricula}</Text>
                            
                            <Text style={styles.topicColumn}>Turma</Text>
                            {alunoMatriculado ? 
                                <Text style={styles.infoColumn}>{ boletins && boletins[0].objeto_turma.nome }</Text> : 
                                <Text style={styles.infoColumn}>O aluno não está matriculado</Text>
                            }
                        </View>
                    </View>
                    <Text style={styles.topic}>Nome:</Text>
                    <Text style={styles.info}>{route.params?.aluno?.objeto_usuario.first_name} {route.params?.aluno?.objeto_usuario.last_name}</Text>

                    <Text style={styles.topic}>Data de Nascimento:</Text>
                    <Text style={styles.info}>
                        {route.params?.aluno?.data_nascimento ? 
                            format(route.params?.aluno?.data_nascimento, 'dd/MM/yyyy')
                            : ''}
                    </Text>
                    
                    <Text style={styles.topic}>Endereço:</Text>
                    <Text style={styles.info}>{route.params?.aluno?.endereco}</Text>
                    
                    <Text style={styles.topic}>Email(s):</Text>
                    {route.params?.aluno?.objetos_emails.map((item, index) => (
                        <Text style={styles.infoColumn} key={index}>{item.endereco}</Text>
                    ))}
                    
                    <Text style={styles.topic}>Telefone(s):</Text>
                    {route.params?.aluno?.objetos_telefones.map((item, index) => (
                        <Text style={styles.infoColumn} key={index}>{item.numero}</Text>
                    ))}
                    
                    <Text style={styles.topic}>Enfermidade/Necessidade Especial:</Text>
                    <Text style={styles.info}>{route.params?.aluno?.eh_pcd ? 'Sim' : 'Não'}</Text>
                    
                </View>
            </ScrollView>
        </View>
    )
}

    