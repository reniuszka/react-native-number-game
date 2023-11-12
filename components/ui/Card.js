import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Cart({ children }) {
  <View style={styles.cart}>{children}</View>;
}

export default Cart;

const styles = StyleSheet.create({
  cart: {
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    elevation: 10, // shadow on Android
    shadowColor: "black", //shadow on ios
    shadowOffset: { width: 0, height: 2 }, //shadow on ios
    shadowRadius: 6, //shadow on ios
    shadowOpacity: 0.25, //shadow on ios
  },
});
