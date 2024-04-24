import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { StackAppParamsList } from "../../routes/app.routes";
import { Calendar } from "react-native-calendars";
import { ListItem } from "@rneui/themed";
import { format } from "date-fns";
import { AgendaProps, DiaProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Agenda: {
        agenda: AgendaProps | undefined;
    }
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
            markedDates[dia.data as string] = { disabled: !dia.util, disableTouchEvent: !dia.util };
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
                        minDate={route.params?.agenda?.objetos_dias[0].data as string}
                        maxDate={route.params?.agenda?.objetos_dias[route.params?.agenda?.objetos_dias.length - 1].data as string}
                        markedDates={markDatesOnAgenda(route.params?.agenda?.objetos_dias)}
                        onDayPress={day => {
                            const dias = route.params?.agenda?.objetos_dias.filter( objeto => objeto.data === day.dateString)
                            setSelectedItem(dias && dias[0]);
                        }}
                    />
                </View>

                <View style={styles.contentAgenda}>
                    <View style={styles.titleArea}>
                        <Text style={styles.agendaTitle}>Agenda do dia {selectedItem && formatarData(selectedItem.data as string)}</Text>
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