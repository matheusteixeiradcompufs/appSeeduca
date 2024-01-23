import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams = {
    Carteira: {
        id: number | string;
    }
}

type TurmaProps = {
    id: number | string;
    nome: string;
    ano: number | string;
    turno: string;
    sala: number | string;
}

type UserProps = {
    id: number | string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

type EscolaProps = {
    id: number | string;
    cnpj: string;
    nome: string;
    endereco: string;
    num_salas: number | string;
    descricao: string;
    criado_em: Date | string;
    atualizado_em: Date | string;
    imagem: string; 
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
}

type TelefoneProps = {
    id: number | string;
    numero: string;
    escola: number | string;
}

type EmailProps = {
    id: number | string;
    endereco: string;
    escola: number | string;
}

type AlunoProps = {
    id: number | string;
    matricula: string;
    turmas: number[] | string[];
    cpf: string;
    data_nascimento: string;
    endereco: string;
    eh_pcd: boolean;
    descricao_pcd: string;
    objeto_escola: EscolaProps;
    objeto_usuario: UserProps;
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
    objetos_turmas: TurmaProps[];
}

type AlunoRouteProps = RouteProp<RouteDetailParams, 'Carteira'>;
    
export default function Carteira(){
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<AlunoRouteProps>();

    const [aluno, setAluno] = useState<AlunoProps | undefined>();

    const dataAtual = new Date();

    useEffect(() => {
        const loadAluno = async () => {    
            setLoading(true);
            try{
                const response = await api.get(`/pessoas/aluno/api/v1/${route.params?.id}`);
                
                const {
                    id,
                    matricula,
                    turmas,
                    cpf,
                    data_nascimento,
                    endereco,
                    eh_pcd,
                    descricao_pcd,
                    objeto_usuario, 
                    objeto_escola,
                    objetos_emails,
                    objetos_telefones,
                    objetos_turmas
                } = await response.data;

                setAluno({
                    id: id,
                    matricula: matricula,
                    turmas: turmas,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    endereco: endereco,
                    eh_pcd: eh_pcd,
                    descricao_pcd: descricao_pcd,
                    objeto_usuario: objeto_usuario,
                    objeto_escola: objeto_escola,
                    objetos_emails: objetos_emails,
                    objetos_telefones: objetos_telefones,
                    objetos_turmas: objetos_turmas
                });

                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
        };

        loadAluno();
    }, []);

    if(loading){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#d9d9d9',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size={60} color='#02489a'/>
            </View>
        )
    }

    const alunoMatriculado = aluno?.objetos_turmas.some(objeto => objeto.ano === dataAtual.getFullYear());
    
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.lineImage}>
                    <View>
                        <Image
                            style={styles.photo}
                            source={require('../../assets/Foto.png')} 
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.topicColumn}>Matricula:</Text>
                        <Text style={styles.infoColumn}>{ aluno?.matricula }</Text>
                        
                        <Text style={styles.topicColumn}>Turma:</Text>
                        {alunoMatriculado ? (
                            aluno?.objetos_turmas.map(objeto => {
                            if (objeto.ano === dataAtual.getFullYear()) {
                                return <Text style={styles.infoColumn} key={objeto.id}>{objeto.nome}</Text>;
                            }
                            return null; 
                            })
                        ) : (
                            <Text style={styles.infoColumn}>O aluno não está matriculado</Text>
                        )}
                    </View>
                </View>
                
                <View style={styles.lineInfo}>
                    <Text style={styles.topicColumn}>Nome:</Text>
                    <Text style={styles.infoColumn}>{ aluno?.objeto_usuario.first_name } { aluno?.objeto_usuario.last_name }</Text>
                    
                    <Text style={styles.topicColumn}>Escola:</Text>
                    <Text style={styles.infoColumn}>{ aluno?.objeto_escola.nome }</Text>
                </View>
                <Text style={[styles.topicColumn, { fontSize: 20 }]}>Validade:</Text>
                <Text style={[styles.infoColumn, { fontSize: 30 }]}>12/{dataAtual.getFullYear()}</Text>

                <Image
                    style={styles.qrcode}
                    source={require('../../assets/QRCode.png')} 
                />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#646363',
        paddingVertical: '10%',
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#02489a',
        paddingVertical: '10%',
        paddingHorizontal: '10%',
        alignItems: 'center',
    },
    lineImage: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#02489a',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    photo:{
        width: 120,
        height: 160,
        borderRadius: 8,
    },
    column: {
        backgroundColor: '#02489a',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '13%',
    },
    lineInfo: {
        backgroundColor: '#02489a',
        width: '100%',
        marginTop: 36,
    },
    topicColumn: {
        color: '#d9d9d9',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 14,
    },
    infoColumn: {
        color: '#d9d9d9',
        fontSize: 20,
    },
    qrcode: {
        width: 203,
        height: 203,
        marginTop: 20,
    }
})