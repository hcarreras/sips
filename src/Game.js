import * as R from 'ramda';
import Challenge from './Challenge'
import createReactClass from 'create-react-class'
import sharedData from '../challenges/shared.json'
import togaData from '../challenges/toga.json'
import wellnessData from '../challenges/wellness.json'
import { CLASSIC_EDITION, TOGA_EDITION, WELLNESS_EDITION } from './constants'
import Background from './background'
import { shuffle } from './utils'
import LevelIndicator from './LevelIndicator'
import React from 'react';
const h = React.createElement
const CHALLENGES_PER_LEVEL = 20
const LEVELS = {
    '1': 'Sober',
    '2': 'Tipsy',
    '3': 'Drunk',
    '4':'Wasted',
    '5':'Sauna'
}
const Home = createReactClass({

  getInitialState: function () {
    return {
      currentLevel: 1,
      challengesCompleted: 0,
      challenges: this.getChallengesData(),
      players: this.props.players,
      colors: [
        '#0086B8',
        '#65C949',
        '#FF402C',
        '#F2DA00',
        '#B820FF',
        '#FF9D00',
        '#00B2FF',
        '#E984EF',
        '#00E2CC'
      ],
    };
  },

  componentDidUpdate: function (prevProps) {
    if(prevProps.edition != this.props.edition){
      this.setState(this.getInitialState(), this.next)
    }
  },

  getChallengesData: function() {
    switch(this.props.edition) {
      case CLASSIC_EDITION: return sharedData['challenges']
      case TOGA_EDITION: return this.getEditionData(togaData['challenges'])
      case WELLNESS_EDITION: return this.getEditionData(wellnessData['challenges'])
    }
  },

  getEditionData: function(editionData) {
    return R.keys(LEVELS).reduce((combinedData, level) => {
      const editionLevelData = editionData[level]
      const editionChallengesLength = editionLevelData.length;

      if (editionChallengesLength < CHALLENGES_PER_LEVEL) {
        const howMany = CHALLENGES_PER_LEVEL - editionChallengesLength
        const sharedChallenges = sharedData.challenges[level].slice(0, howMany)
        combinedData[level] = shuffle(editionLevelData.concat(sharedChallenges))
        return combinedData
      } else {
        combinedData[level] = shuffle(editionLevelData.slice(0, CHALLENGES_PER_LEVEL))
        return combinedData
      }
    }, {})
  },

  challengesInLevelLeft: function () {
    return this.state.challenges[this.state.currentLevel]
  },

  getPlayer: function(playersInChallenge) {
    let players

    if(this.state.players.length <= playersInChallenge.length) {
      players = this.props.players.slice().filter(p => !playersInChallenge.includes(p));
      this.setState({players})
    }else{
      players = this.state.players.slice().filter(p => !playersInChallenge.includes(p));
    }

    const playerPosition = Math.floor(Math.random() * players.length)
    const player = players[playerPosition]
    players.splice(playerPosition, 1)
    this.setState({players: players})

    return player
  },

  insertPlayerNames: function (challenge) {
    let challengeString = challenge
    let playersInChallenge = []

    for (let i=0; i< this.props.players.length; i++) {
      const playerHolder = '#{player_' + (i + 1) + '}'
      if(challengeString.indexOf(playerHolder) !== -1){
        const player = this.getPlayer(playersInChallenge)
        challengeString = challengeString.replace(new RegExp(playerHolder, 'g'), '<b>' + player + '</b>')
        playersInChallenge.push(player)
      }
    }
    return challengeString
  },

  getUnusedChallenges(previousChallenge){
    const { challenges, currentLevel } = this.state
    challenges[currentLevel] = challenges[currentLevel].filter(challenge => challenge !== previousChallenge)

    return challenges
  },

  next: function () {
    const { currentLevel } = this.state
    let level, challenge, unUsedChallenges, currentChallenge, challengesCompleted

    if (this.challengesInLevelLeft().length == 0 || this.state.challengesCompleted === CHALLENGES_PER_LEVEL) {
      level = currentLevel + 1
      challengesCompleted = 1
    } else {
      level = currentLevel
      challengesCompleted = this.state.challengesCompleted + 1
    }
    challenge = this.getRandomChallenge(level)
    unUsedChallenges = this.getUnusedChallenges(challenge)
    currentChallenge = this.insertPlayerNames(challenge)

    this.setState({
      currentLevel: level,
      challenges: unUsedChallenges,
      challengesCompleted,
      currentChallenge,
    })
  },

  restart: function () {
    this.setState(this.getInitialState())
  },

  openMenu: function (event) {
    this.props.openMenu()
    event.stopPropagation()
  },

  getRandomChallenge: function(level){
    const {challenges} = this.state

    const randomIndex = Math.floor(Math.random() * challenges[level].length)
    return challenges[level][randomIndex]
  },

  render: function () {
    const { edition } = this.props
    const { currentChallenge, currentLevel, colors } = this.state
    const color = colors[Math.floor(Math.random() * colors.length)]
    const level = LEVELS[currentLevel]
    if(edition && !currentChallenge) this.next()

    return (
      h('div', {className: 'main-container', onClick: () => level && this.next(), style: {backgroundColor: color, backgroundImage: 'none'}},
        R.values(LEVELS).map((level, index) => ((index + 1) === currentLevel) && index !== 0 && h('div', { key: index, className: 'next-level', onClick: e => e.stopPropagation() },
          h('h1', {}, 'Next level: ' + level + '!'),
          h(Background, {}))),
        h('div', {onClick: this.openMenu, className: 'menu-button', tabIndex: '0'},
          h('div', {}),
          h('div', {}),
          h('div', {})),
        h(LevelIndicator, {level}),
        h(Challenge, {challenge: currentChallenge, restart: this.restart})));
  }
})

export default Home;
