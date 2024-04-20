import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackAppParamsList } from "../../routes/app.routes";
import { FontAwesome5 } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import { format } from "date-fns";

type RouteDetailParams = {
    Mural: {
        murais: MuralProps[];
    }
}

type AvisoProps = {
    id: number | string;
    titulo: string;
    texto: string;
    publicado_em: Date | string;
}

type MuralProps = {
    id: number | string;
    ano: number | string;
    objetos_avisos: AvisoProps[];
}

type MuralRouteProps = RouteProp<RouteDetailParams, 'Mural'>;

export default function Mural(){    
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<MuralRouteProps>();

    const [avisoExpanded, setAvisoExpanded] = useState<boolean[]>([false]);

    const data = new Date();
    const temMural = route.params?.murais?.some(objeto => objeto.ano === data.getFullYear());
    let mural;
    temMural ? mural = route.params?.murais?.filter(objeto => objeto.ano === data.getFullYear()) : alert(`Ainda não existe mural em ${data.getFullYear()}`) ;

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
                    <Text style={styles.text}>Mural de Avisos</Text>
                    <FontAwesome5 name="chalkboard" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    {mural && mural[0].objetos_avisos.reverse().map((aviso, index) => (
                        <ListItem.Accordion 
                            key={index}
                            content={
                                <>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.avisoTitle}>{format(aviso.publicado_em.toString(), 'dd/MM/yyyy - hh:mm')}</ListItem.Title>
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
        marginRight: 7,
    },
    content: {
        width: '100%',
        backgroundColor: '#02489a',
        padding: 10,
        borderRadius: 8,
    },
    avisoTitle: {
        color: '#d9d9d9',
        fontWeight: 'bold',
    },
    itemTitle: {
        color: '#02489a',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContent: {
        color: '#02489a',
    },
    accordionContainer: {
        backgroundColor: '#02489a',
    },

});