import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    icon: {
        alignSelf: 'center',
        marginRight: 10,
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: "#f0f4f2", // Light complementary background
    },
    containerInput: {
        height: 60,
        borderWidth: 1,
        borderColor: "#00592d",
        borderRadius: 6,
    },
    textInput: {
        position: 'absolute',
        top: 4,
        left: 8,
        color: "#000"
    },
    input: {
        flex: 1,
        paddingLeft: 16,
        fontSize: 16,
        color: "#000",
    },
    submit: {
        backgroundColor: "#00592d", // Base color for button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        width: 200,
    },
    submitText: {
        color: "#fff", // White text for contrast
        fontSize: 16,
        fontWeight: "bold",
    },
    linkText: {
        color: "#00592d", // Base color for link
        fontSize: 14,
        marginTop: 10,
        textDecorationLine: "underline",
    },
    containerSenha: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#00592d",
        borderRadius: 6,
    },
    inputSenha: {
        flex: 1,
        paddingLeft: 16,
        fontSize: 16,
        color: '#000000',
    },
});

export default styles;