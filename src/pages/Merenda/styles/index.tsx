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
        marginRight: 125,
    },
    content: {
        width: '100%',
        borderRadius: 8,
    },
    label: {
        width: '100%', 
        height: 50, 
        backgroundColor: '#02489a', 
        paddingHorizontal: 16, 
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8, 
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
        color: '#d9d9d9',
        fontWeight: 'bold',
    },
    itemTitle: {
        color: '#545353',
        fontWeight: 'bold',
    },
    accordionContainer: {
        backgroundColor: '#545353',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#545453',
    },
    modalText:{
        fontSize: 18,
        color: '#545453',
    },

    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#02489a",
        borderRadius: 8,
        alignItems: "center",
    },

    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})