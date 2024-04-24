import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BASE_URL } from "../../services/api";
import { AlunoProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Carteira: {
        aluno: AlunoProps;
    }
}

type AlunoRouteProps = RouteProp<RouteDetailParams, 'Carteira'>;
    
export default function Carteira(){
    const route = useRoute<AlunoRouteProps>();

    const dataAtual = new Date();

    const alunoMatriculado = route.params?.aluno?.objetos_boletins.some(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    const boletins = route.params?.aluno?.objetos_boletins.filter(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.lineImage}>
                    <View>
                        <Image
                            style={styles.photo}
                            source={ route.params?.aluno?.retrato ?  { uri: `${BASE_URL}${route.params?.aluno?.retrato}` } : require('../../assets/Foto.png')} 
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.topicColumn}>Matricula:</Text>
                        <Text style={styles.infoColumn}>{ route.params?.aluno?.matricula }</Text>
                        
                        <Text style={styles.topicColumn}>Turma:</Text>
                        {alunoMatriculado ? 
                            <Text style={styles.infoColumn}>{ boletins && boletins[boletins.length - 1].objeto_turma.nome }</Text> : 
                            <Text style={styles.infoColumn}>O aluno não está matriculado</Text>
                        }
                    </View>
                </View>
                
                <View style={styles.lineInfo}>
                    <Text style={styles.topicColumn}>Nome:</Text>
                    <Text style={styles.infoColumn}>{ route.params?.aluno?.objeto_usuario.first_name } { route.params?.aluno?.objeto_usuario.last_name }</Text>
                    
                    <Text style={styles.topicColumn}>Escola:</Text>
                    <Text style={styles.infoColumn}>{ boletins && boletins[boletins.length - 1].objeto_turma.objeto_sala.objeto_escola.nome }</Text>
                </View>
                <Text style={[styles.topicColumn, { fontSize: 20 }]}>Validade:</Text>
                <Text style={[styles.infoColumn, { fontSize: 30 }]}>12/{dataAtual.getFullYear()}</Text>

                <Image
                    style={styles.qrcode}
                    source={ boletins && boletins[boletins.length - 1].qr_code ?  { uri: boletins && `${BASE_URL}${boletins[boletins.length - 1].qr_code}` } : require('../../assets/QRCode.png')}
                />
            </View>
        </View>
    )
}
