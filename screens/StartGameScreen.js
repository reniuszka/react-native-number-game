import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  useWindowDimensions,
  ScrollView,
  Platform,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
export const StartGameScreen = ({ onChosenNumber }) => {
  const { height, width } = useWindowDimensions();
  const [enteredNumber, setEnteredNumber] = React.useState("");

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };
  const resetInputHandler = () => {
    setEnteredNumber("");
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 100) {
      Alert.alert("Invalid number!", "The number can be between 1 and 99", [
        { text: "Okey!", style: "destructive", onPress: resetInputHandler },
      ]);
      setEnteredNumber("");
      return;
    }
    onChosenNumber(chosenNumber);
  };

  //want to set min i max only on the first render
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  // const backgroundColor = height > 700 ? "pink" : "red";
  const marginTop = height > 360 ? 100 : 5;
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : ""}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={[
            styles.inputContainer,
            // { backgroundColor: backgroundColor },
            { marginTop: marginTop },
          ]}
        >
          <Text style={styles.text}>Guess a number within a chosen range:</Text>
          <Text style={styles.text}> 1 - 99</Text>
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={numberInputHandler} // right event
            value={enteredNumber}
          />
          {enteredNumber && (
            <View style={styles.buttonContainer}>
              {/* //to have the same size wrapped in view  */}
              <View style={styles.button}>
                <PrimaryButton
                  children="Confirm"
                  onPressProp={confirmInputHandler}
                />
              </View>
              <View style={styles.button}>
                <PrimaryButton onPressProp={resetInputHandler}>
                  Reset
                </PrimaryButton>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");
console.log("width", width, "height", height); // width 360 height 722.6666666666666 horizontal -> width 722.6666666666666 height 360

const styles = StyleSheet.create({
  // for ios:
  screen: {
    flex: 1,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    marginTop: height < 350 ? 100 : 20,
    marginHorizontal: 24,
    padding: 16,
    // backgroundColor: height < 380 ? "red" : Colors.secondary,
    borderRadius: 8,
    elevation: 10, // shadow on Android
    shadowColor: "black", //shadow on ios
    shadowOffset: { width: 0, height: 2 }, //shadow on ios
    shadowRadius: 6, //shadow on ios
    shadowOpacity: 0.25, //shadow on ios
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.fontWhite,
    borderBottomWidth: 2,
    color: Colors.fontDark,
    marginVertical: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    color: Colors.fontDark,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
