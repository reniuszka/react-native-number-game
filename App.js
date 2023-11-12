import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  SafeAreaView,
} from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import GameIsOverScreen from "./screens/GameOverScreen";

import { useFonts } from "expo-font";
//splashscreen - ekran powitalny
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export default function App() {
  //boolean if fonts have been loaded or not
  const [fontsLoaded] = useFonts({
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  const [userNumber, setUserNumber] = React.useState(null);
  const [isNewGame, setIsNewGame] = React.useState(true);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [guessedNumbersPhone, setGuessedNumbersPhone] = useState(0);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
    setIsNewGame(false);
  }

  function gameOverHandler(numberOfRounds) {
    setIsGameOver(true);
    setGuessedNumbersPhone(numberOfRounds);
  }

  function startGameHandler() {
    setUserNumber(null);
    setGuessedNumbersPhone(0);
    setIsNewGame(true);
    setIsGameOver(false);
  }

  let screen = <StartGameScreen onChosenNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (isGameOver) {
    screen = (
      <GameIsOverScreen
        roundsNumber={guessedNumbersPhone}
        userNumber={userNumber}
        onStartNewGame={startGameHandler}
      />
    );
  }

  return (
    <>
      {/* <StatusBar style="dark" /> */}
      <StatusBar style="light" />
      <LinearGradient
        colors={["#53429e", "#7b7ba3", "#2f2f41"]}
        style={styles.rootScreen}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          source={require("./assets/GUessNumber.png")}
          resizeMode="contain"
          style={styles.rootImage}
          imageStyle={styles.imageBackground}
        >
          {/* <Text style={styles.startGameScreen}>blabbbb</Text> */}
          {/* <View style={styles.startGameScreen}> */}
          {/* not sure if safe area works here ( it suppose to detectand  to add extra distance from the mobile nav) */}
          <SafeAreaView style={styles.startGameScreen}>{screen}</SafeAreaView>
          {/* {screen} */}
          {/* {chosenNumber ? <GameScreen /> : <StartGameScreen />} */}
          {/* <StartGameScreen /> */}
          {/* </View> */}
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  rootImage: {
    flex: 9,
    marginTop: 250,
  },
  startGameScreen: {
    marginTop: -220,
    // maxWidth: "80%",
  },
  imageBackground: {
    opacity: 0.5,
  },
});
