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
    lineTextContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 17,
        marginBottom: 14,
    },
    lineContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    textId: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#02489a',
    },
    textDate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#02489a'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 176,
        height: 100,
        backgroundColor: '#02489a',
        borderRadius: 8,
        paddingStart: 9,
        paddingEnd: 8,
    },
    textButton: {
        color: '#d9d9d9',
        fontWeight: 'bold',
        fontSize: 20,
    }
})