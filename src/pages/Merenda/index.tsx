import React, { useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackAppParamsList } from "../../routes/app.routes";
import { ListItem } from '@rneui/themed';
import { CardapioProps, ItemProps } from "../../types";
import { styles } from "./styles";

type RouteDetailParams = {
    Merenda: {
        cardapios: CardapioProps[] | undefined;
    };
}

type MerendaRouteProps = RouteProp<RouteDetailParams, 'Merenda'>;

export default function Merenda(){
    const navigation = useNavigation<NativeStackNavigationProp<StackAppParamsList>>();
    
    const route = useRoute<MerendaRouteProps>();

    const [expanded, setExpanded] = useState<boolean[]>([true]);

    const [selectedItem, setSelectedItem] = useState<ItemProps>();

    const [modalVisible, setModalVisible] = useState(false);

    function formatMounth(month: number){
        let exit = '';
        switch(month){
            case 0 : exit = '01'; break;
            case 1 : exit = '02'; break;
            case 2 : exit = '03'; break;
            case 3 : exit = '04'; break;
            case 4 : exit = '05'; break;
            case 5 : exit = '06'; break;
            case 6 : exit = '07'; break;
            case 7 : exit = '08'; break;
            case 8 : exit = '09'; break;
            case 9 : exit = '10'; break;
            case 10 : exit = '11'; break;
            case 11 : exit = '12'; break;
        }
        return exit;
    }

    const formatTurno = (turno: string) => {
        switch (turno) {
            case 'M': return 'Manhã';
            case 'T': return 'Tarde';
            case 'N': return 'Noite';
        }
    }

    const date = new Date();

    const formatedDate = date.getFullYear() + '-' + formatMounth(date.getMonth()) + '-' + date.getDate();

    const cardapiosDeHoje = route.params?.cardapios?.filter(objeto => objeto.data === formatedDate);

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
                    <Text style={styles.text}>Merenda</Text>
                    <FontAwesome5 name="apple-alt" size={45} color='#d9d9d9' />
                </View>

                <View style={styles.content}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Cardápios de Hoje</Text>
                    </View>

                    {cardapiosDeHoje && cardapiosDeHoje.map((cardapio, index) => (
                        <ListItem.Accordion 
                        key={index}
                        content={
                            <>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.turnoTitle}>{formatTurno(cardapio.turno)}</ListItem.Title>
                                </ListItem.Content>
                            </>
                        }
                        containerStyle={styles.accordionContainer}
                        isExpanded={expanded[index]}
                        onPress={() => {
                            setExpanded((prevExpanded) => {
                                const newExpanded = [...prevExpanded];
                                newExpanded[index] = !prevExpanded[index];
                                return newExpanded;
                            });
                        }}
                    >
                        {cardapio.objetos_itens.map((item, ind) => (
                            <ListItem 
                                key={ind} 
                                bottomDivider
                            >
                                <ListItem.Content>
                                    <ListItem.Title style={styles.itemTitle}>{item.nome}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron
                                    onPress={() => {
                                        // Configurar o estado para exibir o modal e passar o conteúdo
                                        setSelectedItem(item);
                                        setModalVisible(true);
                                    }}
                                    size={30}
                                />
                            </ListItem>
                        ))}
                    </ListItem.Accordion>    
                    ))}
                    
                    <View style={styles.labelBottom}>
                    </View>
                </View>

                <Modal
                    animationType='slide'
                    
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedItem?.nome}</Text>
                            <Text style={styles.modalText}>{selectedItem?.descricao}</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}
