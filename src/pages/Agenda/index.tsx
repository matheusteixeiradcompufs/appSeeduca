import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { StackAppParamsList } from "../../routes/app.routes";
import { Calendar } from "react-native-calendars";
import { ListItem } from "@rneui/themed";
import { format } from "date-fns";

type RouteDetailParams = {
    Agenda: {
        agenda: AgendaProps | undefined;
    }
}

type DisciplinaProps = {
    id: number | string;
    nome: string;
}

type TarefaProps = {
    id: number | string;
    nome: string;
    descricao: string;
    tipo: string;
    cadastrada_em: Date | string;
    entrega: string;
    diaAgenda: number | string;
}

type AvisoProps = {
    id: number | string;
    titulo: string;
    texto: string;
    publicado_em: Date | string;
    diaAgenda: number | string;
}

type DiaProps = {
    id: number | string;
    data: string;
    util: boolean;
    disciplinas: number[] | string[];
    objetos_avisos: AvisoProps[];
    objetos_tarefas: TarefaProps[];
    objetos_disciplinas: DisciplinaProps[];
}

type AgendaProps = {
    id: number | string;
    turma: number | string;
    objetos_dias: DiaProps[];
}

type AgendaRouteProps = RouteProp<RouteDetailParams, 'Agenda'>;

export default function Agenda(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();

    const route = useRoute<AgendaRouteProps>();

    const [selectedItem, setSelectedItem] = useState<DiaProps>();

    const [tarefaExpanded, setTarefaExpanded] = useState<boolean[]>([false]);

    const [avisoExpanded, setAvisoExpanded] = useState<boolean[]>([false]);

    const markDatesOnAgenda = (objetosDias: DiaProps[] | undefined) => {

        if(objetosDias){
            const markedDates: { [key: string]: { disabled: boolean; disableTouchEvent: boolean} } = {};
        
            objetosDias.forEach(dia => {
            markedDates[dia.data] = { disabled: !dia.util, disableTouchEvent: !dia.util };
            });
        
            return markedDates;
        }
        else
            return;
    };

    const formatarData = (date: string) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        newDate.setHours(0);
        return format(newDate, "dd/MM/yyyy");
    }

    const formatarTipo = (tipo: string) => {
        switch (tipo) {
            case 'C': return 'Casa';
            case 'E': return 'Escola';
            default: return '';
        }
    }

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
            <ScrollView>
                <View style={styles.banner}>
                    <TouchableOpacity 
                        onPress={navigation.goBack}
                    >
                        <FontAwesome5 name="arrow-left" size={45} color='#d9d9d9' />
                    </TouchableOpacity>
                    <Text style={styles.text}>Agenda Escolar</Text>
                    <FontAwesome5 name="address-book" size={45} color='#d9d9d9' />
                </View>
                <View style={styles.content}>
                    <Calendar
                        style={{ width: '100%', borderRadius: 8 }}
                        minDate={route.params?.agenda?.objetos_dias[0].data}
                        maxDate={route.params?.agenda?.objetos_dias[route.params?.agenda?.objetos_dias.length - 1].data}
                        markedDates={markDatesOnAgenda(route.params?.agenda?.objetos_dias)}
                        onDayPress={day => {
                            const dias = route.params?.agenda?.objetos_dias.filter( objeto => objeto.data === day.dateString)
                            setSelectedItem(dias && dias[0]);
                        }}
                    />
                </View>

                <View style={styles.contentAgenda}>
                    <View style={styles.titleArea}>
                        <Text style={styles.agendaTitle}>Agenda do dia {selectedItem && formatarData(selectedItem.data)}</Text>
                    </View>
                    
                    <View style={styles.disciplinasArea}>
                        <Text style={styles.labelText}>Disciplinas do dia:</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingLeft: '10%'}}>
                            {selectedItem && selectedItem.objetos_disciplinas.map(( disciplina, index) => (
                                <View key={index} style={{backgroundColor: '#d9d9d9', width: '35%', height: 40,marginTop: 15, marginRight: '10%', alignItems: 'center', justifyContent: 'center', borderRadius: 8,}}>
                                    <Text style={styles.disciplinas}>{disciplina.nome}</Text>
                                </View>
                                
                            ))}
                            
                        </View>
                    </View>

                    <View style={styles.label}>
                        <Text style={styles.labelText}>Tarefas:</Text>
                    </View>
                    
                    {selectedItem && selectedItem.objetos_tarefas.map((tarefa, index) => (
                        <ListItem.Accordion 
                            key={index}
                            content={
                                <>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.turnoTitle}>{tarefa.nome}</ListItem.Title>
                                    </ListItem.Content>
                                </>
                            }
                            containerStyle={styles.accordionContainer}
                            isExpanded={tarefaExpanded[index]}
                            onPress={() => {
                                setTarefaExpanded((prevExpanded) => {
                                    const newExpanded = [...prevExpanded];
                                    newExpanded[index] = !prevExpanded[index];
                                    return newExpanded;
                                });
                            }}
                            icon={ <FontAwesome5 name="angle-down" size={25} color='#d9d9d9' /> } 
                        >
                                <ListItem  
                                    bottomDivider
                                >
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.itemTitle}>{tarefa.nome}</ListItem.Title>
                                        <ListItem.Subtitle style={styles.itemContent}>{tarefa.descricao}</ListItem.Subtitle>
                                        <ListItem.Title style={styles.itemTitle}>Tipo:</ListItem.Title>
                                        <ListItem.Subtitle style={styles.itemContent}>{formatarTipo(tarefa.tipo)}</ListItem.Subtitle>
                                        <ListItem.Title style={styles.itemTitle}>Data de Entrega:</ListItem.Title>
                                        <ListItem.Subtitle style={styles.itemContent}>{format(new Date(tarefa.entrega), 'dd/MM/yyyy')}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    
                                </ListItem>
                            
                        </ListItem.Accordion>    
                    ))}

                    <View style={[styles.label, {borderTopWidth: 1, borderColor: '#d9d9d9'}]}>
                        <Text style={styles.labelText}>Avisos:</Text>
                    </View>
                    
                    {selectedItem && selectedItem.objetos_avisos.map((aviso, index) => (
                        <ListItem.Accordion 
                            key={index}
                            content={
                                <>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.turnoTitle}>{aviso.titulo}</ListItem.Title>
                                    </ListItem.Content>
                                </>
                            }
                            containerStyle={styles.accordionContainer}
                            isExpanded={avisoExpanded[index]}
                            onPress={() => {
                                setAvisoExpanded((prevExpanded) => {
                                    const newExpanded = [...prevExpanded];
                                    newExpanded[index] = !prevExpanded[index];
                                    return newExpanded;
                                });
                            }}
                            icon={ <FontAwesome5 name="angle-down" size={25} color='#d9d9d9' /> } 
                        >
                                <ListItem  
                                    bottomDivider
                                >
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.itemTitle}>{aviso.titulo}</ListItem.Title>
                                        <ListItem.Subtitle style={styles.itemContent}>{aviso.texto}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    
                                </ListItem>
                            
                        </ListItem.Accordion>    
                    ))}    
                </View>
            </ScrollView>                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 10,
    },
    header: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 37,
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
        marginTop: 17,
        marginBottom: 30,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#d9d9d9',
        marginLeft: 16,
        marginRight: 15,
    },
    content: {
        backgroundColor: '#02489a',
        borderRadius: 8,
        width: '100%',
        padding: 16,
        marginBottom: 10,
    },
    contentAgenda: {
        backgroundColor: '#02489a',
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
    label: {
        width: '100%', 
        height: 50, 
        backgroundColor: '#02489a', 
        paddingHorizontal: 16, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d9d9d9',
    },
    labelBottom: {
        borderTopWidth: 0.6,
        borderColor: '#d9d9d9',
        width: '100%', 
        height: 50, 
        backgroundColor: '#02489a', 
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8, 
    },
    turnoTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    itemTitle: {
        color: '#545353',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContent: {
        color: '#545353',
        marginBottom: 10,
    },
    accordionContainer: {
        backgroundColor: '#938e8e',
    },
    titleArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: '#d9d9d9',
        padding: 10,
    },
    agendaTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#d9d9d9',
    },
    disciplinasArea: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
        padding: 10,
    },
    disciplinas: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#02489e',
    }
});