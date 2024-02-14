import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { StackAppParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams = {
    Carteira: {
        id: number | string;
        escola: number | string;
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
    nome: string;
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

type BoletimProps = {
    id: number | string;
    objeto_turma: TurmaProps;
}

type AlunoProps = {
    id: number | string;
    matricula: string;
    cpf: string;
    data_nascimento: string;
    endereco: string;
    eh_pcd: boolean;
    retrato: string;
    objeto_usuario: UserProps;
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
    objetos_boletins: BoletimProps[];
}

type AlunoRouteProps = RouteProp<RouteDetailParams, 'Carteira'>;
    
export default function Carteira(){
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<AlunoRouteProps>();

    const [aluno, setAluno] = useState<AlunoProps>();
    const [escola, setEscola] = useState<EscolaProps>();

    const dataAtual = new Date();

    useEffect(() => {
        const loadAluno = async () => {    
            setLoading(true);
            try{
                const response = await api.get(`/pessoas/aluno/api/v1/${route.params?.id}`);
                
                const {
                    id,
                    matricula,
                    cpf,
                    data_nascimento,
                    endereco,
                    eh_pcd,
                    retrato,
                    objeto_usuario, 
                    objetos_emails,
                    objetos_telefones,
                    objetos_boletins
                } = await response.data;

                setAluno({
                    id: id,
                    matricula: matricula,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    endereco: endereco,
                    eh_pcd: eh_pcd,
                    retrato: retrato,
                    objeto_usuario: objeto_usuario,
                    objetos_emails: objetos_emails,
                    objetos_telefones: objetos_telefones,
                    objetos_boletins: objetos_boletins
                });

            }catch(err){
                console.log(err);
            }
        };

        loadAluno();
    }, []);
    
    useEffect(() => {
        const loadEscola = async () => {    
            try{
                const response = await api.get(`/escolas/api/v1/${route.params?.escola}`);
                
                const {
                    id,
                    nome,
                } = await response.data;

                setEscola({
                    id: id,
                    nome: nome,
                });

                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
        };

        loadEscola();
    }, [aluno]);

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

    const alunoMatriculado = aluno?.objetos_boletins.some(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    const boletins = aluno?.objetos_boletins.filter(objeto => objeto.objeto_turma.ano === dataAtual.getFullYear());
    
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.lineImage}>
                    <View>
                        <Image
                            style={styles.photo}
                            source={ aluno?.retrato ?  { uri: aluno?.retrato } : require('../../assets/Foto.png')} 
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.topicColumn}>Matricula:</Text>
                        <Text style={styles.infoColumn}>{ aluno?.matricula }</Text>
                        
                        <Text style={styles.topicColumn}>Turma:</Text>
                        {alunoMatriculado ? 
                            <Text style={styles.infoColumn}>{ boletins && boletins[boletins.length - 1].objeto_turma.nome }</Text> : 
                            <Text style={styles.infoColumn}>O aluno não está matriculado</Text>
                        }
                    </View>
                </View>
                
                <View style={styles.lineInfo}>
                    <Text style={styles.topicColumn}>Nome:</Text>
                    <Text style={styles.infoColumn}>{ aluno?.objeto_usuario.first_name } { aluno?.objeto_usuario.last_name }</Text>
                    
                    <Text style={styles.topicColumn}>Escola:</Text>
                    <Text style={styles.infoColumn}>{ escola?.nome }</Text>
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