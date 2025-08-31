import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#f0f4f2", // Light complementary background
  },
  input: {
    width: 200,
    borderColor: "#00592d", // Base color for border
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff", // White background for inputs
    color: "#333", // Dark text for readability
    fontSize: 16,
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
});

export default styles;