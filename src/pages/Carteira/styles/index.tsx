import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
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