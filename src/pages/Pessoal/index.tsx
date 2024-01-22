import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { format } from "date-fns"

type RouteDetailParams = {
    Pessoal: {
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
    objeto_usuario: UserProps;
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
    objetos_turmas: TurmaProps[];
}

type AlunoRouteProps = RouteProp<RouteDetailParams, 'Pessoal'>;

export default function Pessoal(){
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
                        source={require('../../assets/Foto.png')} 
                    />
                    <View style={styles.column}>
                        <Text style={styles.topicColumn}>Matricula:</Text>
                        <Text style={styles.infoColumn}>{aluno?.matricula}</Text>
                        
                        <Text style={styles.topicColumn}>Turma</Text>
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
                <Text style={styles.topic}>Nome:</Text>
                <Text style={styles.info}>{aluno?.objeto_usuario.first_name} {aluno?.objeto_usuario.last_name}</Text>

                <Text style={styles.topic}>Data de Nascimento:</Text>
                <Text style={styles.info}>
                    {aluno?.data_nascimento ? 
                        format(aluno?.data_nascimento, 'dd/MM/yyyy')
                        : ''}
                </Text>
                
                <Text style={styles.topic}>Endereço:</Text>
                <Text style={styles.info}>{aluno?.endereco}</Text>
                
                <Text style={styles.topic}>Email(s):</Text>
                {aluno?.objetos_emails.map((item, index) => (
                    <Text style={styles.infoColumn} key={index}>{item.endereco}</Text>
                ))}
                
                <Text style={styles.topic}>Telefone(s):</Text>
                {aluno?.objetos_telefones.map((item, index) => (
                    <Text style={styles.infoColumn} key={index}>{item.numero}</Text>
                ))}
                  
                <Text style={styles.topic}>Enfermidade/Necessidade Especial:</Text>
                <Text style={styles.info}>{aluno?.eh_pcd ? 'Sim' : 'Não'}</Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%',
    },
    header: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 37,
        marginBottom: 17,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoLeft: {
        width: 63,
        height: 52.87,
        borderRadius: 8,
    },
    logo: {
        width: 53,
        height: 53,
        borderRadius: 8,
        marginLeft: 69,
        marginRight: 69,
    },
    logoRigth: {
        width: 77,
        height: 29,
        borderRadius: 8,
    },
    banner: {
        width: '100%',
        height: 62,
        backgroundColor: '#02489a',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#d9d9d9',
        marginLeft: 16,
        marginRight: 126,
    },
    content: {
        width: '100%',
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 30,
    },
    lineImage: {
        width: '100%',
        backgroundColor: '#02489a',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    photo:{
        width: 120,
        height: 160,
        borderRadius: 8,
    },
    column: {
        width: 'auto',
        backgroundColor: '#02489a',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 85,
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
    topic: {
        color: '#d9d9d9',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 14,
    },
    info: {
        color: '#d9d9d9',
        fontSize: 20,
    },
});
    