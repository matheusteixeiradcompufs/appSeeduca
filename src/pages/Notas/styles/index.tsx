import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        marginRight: 157,
    },
    content: {
        width: '100%',
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unidadeContainer: {
        backgroundColor: '#545353',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    unidade: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    notasContainer: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
    },
    notaContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        paddingLeft: 10,
        paddingRight: 2,
        borderWidth: 0.5,
        borderColor: '#545353'
    },
    disciplina: {
        color: '#545353',
        fontSize: 28,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxNota: {
        width: 55,
        height: 55,
        backgroundColor: '#938e8e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    nota: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    }
  });