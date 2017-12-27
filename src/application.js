import {setContainerColors, randomIndex, randomColor, hexToComplimentary} from "./utilities"
import data from '../challenges.json'

const challenges = data["challenges"]
const challengesUncompleted = challenges.slice(0)
const challengesCompleted = []
const challengeContainer = document.getElementById("challenge-container")

const getUncompletedChallenge = (challengesUncompleted, challengesCompleted) => {
  const index = randomIndex(challengesUncompleted)
  const challenge = challengesUncompleted[index]

  challengesUncompleted.splice(index, 1);
  challengesCompleted.push(challenge)

  return challenge
}

const nextChallenge = () => {
  const mainColor = randomColor()
  const secondaryColor =  hexToComplimentary(mainColor)

  challengeContainer.textContent = getUncompletedChallenge(challengesUncompleted, challengesCompleted)
  setContainerColors(challengeContainer, mainColor, secondaryColor)
}

challengeContainer.addEventListener("click", nextChallenge);

nextChallenge()
