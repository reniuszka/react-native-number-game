import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { Colors } from "../../constants/colors";

function NumberContainer({ children }) {
  const { height, width } = useWindowDimensions();
  const padding = width > 700 ? 10 : 16;
  const margin = width > 700 ? 6 : 12;
  return (
    <View style={[styles.container, { margin: margin }, { padding: padding }]}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;
//dimensions api is a js object which holds the info aobut device's width and height
//property screen is the entire available width and height
//on android windows is excluding theśtatus bar
// const deviceWidth = Dimensions.get("window").fontScale
const deviceWidth = Dimensions.get("window").width;
// const deviceWidth = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 4,
    borderColor: Colors.fontWhite,
    borderRadius: 8,
    // padding: deviceWidth < 450 ? 6 : 24,
    // margin: deviceWidth < 450 ? 36 : 44,
    // padding: 6,
    // margin: 36,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "40%",
  },
  numberText: {
    fontFamily: "open-sans-bold",
    color: Colors.primaryHover,
    fontSize: 38,
    // fontSize: deviceWidth < 450 ? 30 : 44,
    textAlign: "center",
  },
});
