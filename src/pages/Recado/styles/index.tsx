import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 10,
        paddingBottom: 10,
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
        marginRight: 121,
    },
    content: {
        flex: 1,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 30,
    },
    inputLine:{
        flexDirection: 'row',
        position: 'relative',
    },
    input: {
        width: '78%',
        height: 60,
        marginRight: '2%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        textAlign: 'justify',
        fontSize: 14,
        color: '#000',
    },
    button: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#02489a',
        borderRadius: 8,
    },
    textButton: {
        color: '#d9d9d9',
        fontWeight: 'bold',
        fontSize: 20,
    },
    bubbleAluno: {
        maxWidth: '60%',
        backgroundColor: '#00b2ff',
        marginBottom: 14,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        borderBottomStartRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5, 
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    textAluno: {
        fontSize: 20,
        color: '#fff',
    },
    bubbleEscola: {
        maxWidth: '60%',
        backgroundColor: '#fff',
        marginBottom: 14,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5, 
        alignSelf: 'flex-start',
    },
    textEscola: {
        fontSize: 20,
        color: '#02489a',
        fontWeight: 'bold',
    },
});
