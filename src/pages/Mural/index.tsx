import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackAppParamsList } from "../../routes/app.routes";
import { FontAwesome5 } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import { format } from "date-fns";
import { MuralProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Mural: {
        murais: MuralProps[];
    }
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
