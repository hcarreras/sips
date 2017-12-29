import {setContainerColors, randomIndex, randomColor, hexToComplimentary} from "./utilities"
import data from '../challenges.json'

const CHALLENGES_PER_LEVEL = 5
const levels = {1: 'Sober', 2: "Tipsy", 3: "Drunk", 4:"Wasted"}
let currentLevel = 0
const challenges = data["challenges"]
let challengesUncompleted
let challengesCompleted
const mainContainer = document.getElementById("main")
const challengeContainer = document.getElementById("challenge-container")
const levelContainer = document.getElementById("level-container")

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
  setContainerColors(mainContainer, mainColor, secondaryColor)
  mayLevelUp()
}

const nextLevel = () => {
  currentLevel += 1
  challengesUncompleted = challenges[currentLevel].slice(0)
  challengesCompleted = []
  levelContainer.textContent = "Level: " + levels[currentLevel]

}

const mayLevelUp = () => {
  if(challengesCompleted.length == CHALLENGES_PER_LEVEL)
    nextLevel()
}

mainContainer.addEventListener("click", nextChallenge);

nextLevel()
nextChallenge()
