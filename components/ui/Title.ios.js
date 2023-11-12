import { Text, StyleSheet, Dimensions, Platform } from "react-native";
import { Colors } from "../../constants/colors";
function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: deviceHeight > 380 ? 24 : 16,
    color: Colors.button,
    textAlign: "center",
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    borderColor: "white",
    padding: deviceHeight > 380 ? 12 : 6,
  },
});
