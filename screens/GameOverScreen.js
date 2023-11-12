import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/colors";
//we dont want to import as Title.android or Title.iso, just Title and under the hood React N will pick the proper file based on the platform
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameIsOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { height, width } = useWindowDimensions();
  const stylesWidthHeight = width > 380 ? 150 : 300;
  // width: deviceWidth < 380 ? 250 : 300,
  // height: deviceWidth < 380 ? 250 : 300,

  let content = (
    <>
      <Title>You WIN!</Title>
      <Text style={[styles.text, styles.highlightText, styles.margin]}>
        braaaaaavo!!!
      </Text>
      <Text style={styles.text}>
        Your phone needed{" "}
        <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to guess
        the number <Text style={styles.highlightText}>{userNumber}</Text>
      </Text>
      <View
        style={[
          styles.imageContainer,
          { width: stylesWidthHeight },
          { height: stylesWidthHeight },
        ]}
      >
        <Image
          source={require("../assets/images/winning.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.margin}>
        <PrimaryButton onPressProp={onStartNewGame}>
          Start new game
        </PrimaryButton>
      </View>
    </>
  );
  if (width > 360) {
    content = (
      <>
        <Title>You WIN!</Title>
        <View
          style={[
            styles.imageContainer,
            { width: stylesWidthHeight },
            { height: stylesWidthHeight },
          ]}
        >
          <Image
            source={require("../assets/images/winning.png")}
            style={styles.image}
          />
        </View>
        <Text style={[styles.text, styles.highlightText, styles.margin]}>
          braaaaaavo!!!
        </Text>
        <Text style={styles.text}>
          Your phone needed{" "}
          <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlightText}>{userNumber}</Text>
        </Text>
        <View style={styles.margin}>
          <PrimaryButton onPressProp={onStartNewGame}>
            Start new game
          </PrimaryButton>
        </View>
      </>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>{content}</View>
    </ScrollView>
  );
}

export default GameIsOverScreen;
// const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    padding: 6,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    margin: 20,
    // width: deviceWidth < 380 ? 250 : 300,
    // height: deviceWidth < 380 ? 250 : 300,
    borderWidth: 4,
    borderColor: Colors.fontWhite,
    borderRadius: 250,
    overflow: "hidden",
    marginTop: 30,
    // marginTop: deviceWidth < 380 ? 45 : 30,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "orange",
  },
  text: {
    fontFamily: "open-sans-regular",
    fontSize: 12,
    color: Colors.fontWhite,
    margin: 12,
    textAlign: "center",
  },
  margin: {
    marginTop: 30,
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});
