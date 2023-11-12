export function generateRandomBetween(min, max, exclude) {
  //+ min because we dont want to get 0 as randomNumber
  // exclude means that computeer cant immidiately guess the number that the user chosen number in the first round
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return randomNumber;
}

// 99, 1, 22;

// .15 * (99-1) = .15*98 = 14.7 + 1 = 15.7  = 15
// currentGuessPhone 24 userNumber 8
//  LOG  minBoundaryCHANGE 25  maxBoundaryCHANGE 24

// currentGuessPhone 25 userNumber 55

//  LOG  minBoundaryCHANGE 26  maxBoundaryCHANGE 25

//  currentGuessPhone 26 userNumber 66
//  LOG  minBoundaryCHANGE 27  maxBoundaryCHANGE 26
//  ERROR  RangeError: Maximum call stack size exceeded, js engine: hermes
//  LOG  minBoundaryCHANGE 27  maxBoundaryCHANGE 26
