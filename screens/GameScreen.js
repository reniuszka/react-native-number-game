import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { generateRandomBetween } from "../utils/helpers";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

//set them outside just to not change its values when component is rerendered
let minBoundary = 1;
let maxBoundary = 100;
function GameScreen({ userNumber, onGameOver }) {
  const { height, width } = useWindowDimensions();
  const initializeGuess = generateRandomBetween(1, 100, userNumber);
  // const [currentGuessPhone, setCurrentGuessPhone] = useState(
  //   () => generateRandomBetween(1, 100, userNumber)
  const [currentGuessPhone, setCurrentGuessPhone] = useState(initializeGuess);
  const [guessRounds, setGuessRounds] = useState([initializeGuess]);

  const changeNumberHandler = (direction) => {
    // jesli wciaskamy + i oddalamy sie od liczby usera to pokazujemy ostrzezenie ze nie ma sensu dodawac
    if (
      (direction === "lower" && currentGuessPhone < userNumber) ||
      (direction === "greater" && currentGuessPhone > userNumber) ||
      minBoundary + 1 > maxBoundary
    ) {
      Alert.alert("Don't lie", "You know that this is wrong..", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    } else if (direction === "lower") {
      // direcion => 'lower' , 'greater
      maxBoundary = currentGuessPhone;
    } else {
      minBoundary = currentGuessPhone + 1;
    }
    console.log(
      "minBoundaryCHANGE",
      minBoundary,
      " maxBoundaryCHANGE",
      maxBoundary,
      "width",
      width,
      "height",
      height
    );
    const newRandomNumberGuessed = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuessPhone
    );
    setCurrentGuessPhone(newRandomNumberGuessed);
    setGuessRounds((prevGuessRounds) => [
      ...prevGuessRounds,
      newRandomNumberGuessed,
    ]);
  };

  useEffect(() => {
    console.log(
      "currentGuessPhone",
      currentGuessPhone,
      "userNumber",
      userNumber
    );
    if (userNumber === currentGuessPhone) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuessPhone, userNumber, onGameOver]);
  //reset min i max do ich wartosci przy resecie gry
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  // const backgroundColor = height > 700 ? "pink" : "red";
  const padding = width > 700 ? 2 : 12;
  const margin = width > 700 ? 6 : 12;
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""}>
        <View
          style={styles.rootContainer}
          // style={[styles.rootContainer, { backgroundColor: backgroundColor }]}
        >
          <Text style={[styles.text, { margin: margin }, { padding: padding }]}>
            Guess my number
          </Text>
          <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuessPhone}</NumberContainer>
            <View style={styles.higherLowerContainer}>
              <Text style={styles.instructiontext}>
                Get a random number: Higher or Lower
              </Text>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <PrimaryButton
                    onPressProp={() => changeNumberHandler("lower")}
                  >
                    <Ionicons name="md-remove" size={24} color="white" />
                  </PrimaryButton>
                </View>
                <View style={styles.button}>
                  <PrimaryButton
                    onPressProp={() => changeNumberHandler("greater")}
                  >
                    <Ionicons name="md-add" size={24} color="white" />
                  </PrimaryButton>
                </View>
              </View>
            </View>

            <View>
              {/* {guessRounds &&
            guessRounds.map((item, index) => {
              return (
                <Text key={index} style={styles.guessContainer}>
                  {" "}
                  <Text style={styles.guessText}>{item}</Text>
                </Text>
              );
            })} */}
              <ScrollView
                // horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
              >
                <FlatList
                  // contentContainerStyle={{ alignSelf: "flex-start" }}
                  // numColumns={Math.ceil(guessRounds.length / 2)}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={guessRounds}
                  renderItem={(itemData) => (
                    <Text style={styles.guessContainer}>
                      <Text style={styles.guessText}>{itemData.item}</Text>
                    </Text>
                  )}
                  keyExtractor={(item) => item}
                  style={styles.guessRootContainer}
                />
                <View>
                  <Text style={styles.instructiontext}>
                    Log Rounds. You can scroll horizontally..
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default GameScreen;

const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  rootContainer: {
    margin: deviceHeight > 380 ? 25 : 10,
    margin: deviceHeight > 380 ? 25 : 10,
    alignItems: "center",
    // backgroundColor: deviceHeight > 700 ? "pink" : "red",
  },
  screen: {
    // padding: deviceHeight > 380 ? 24 : 10,
    alignItems: "center",
    // justifyContent: "center",
  },
  higherLowerContainer: {
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    // fontSize: deviceHeight > 380 ? 20 : 16,
    color: Colors.fontWhite,
    // margin: deviceHeight > 380 ? 12 : 6,
    // padding: deviceHeight > 380 ? 24 : 14,
  },
  instructiontext: {
    fontFamily: "open-sans-bold",
    fontSize: 12,
    color: Colors.fontWhite,
    margin: 12,
  },
  guessRootContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    // opacity: 0.6,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 21,
  },
  guessContainer: {
    flexDirection: "row",
    backgroundColor: Colors.button,
    opacity: 0.9,
    elevation: 2,
    margin: 4,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: deviceHeight > 380 ? 21 : 10,
    paddingLeft: 12,
    paddingTop: 10,
    width: deviceHeight > 380 ? 40 : 20,
    height: deviceHeight > 380 ? 40 : 20,
  },
  guessText: {
    color: "white",
    textAlign: "center",
  },
});
