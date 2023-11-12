import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const PrimaryButton = ({ onPressProp, children }) => {
  function pressHandler() {
    onPressProp();
  }
  return (
    <View style={styles.buttonOuterContainer}>
      {/* // if pressed there is the object pressData.pressed */}
      <Pressable
        // onPress={pressHandler}
        onPress={onPressProp}
        android_ripple={{ color: Colors.hover }}
        // for ios:
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressedButton]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4,
    borderRadius: 28,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.button,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  // dedicated styles for ios
  pressedButton: {
    opacity: 0.75,
  },
});
