import * as R from 'ramda';
import Challenge from './Challenge'
import createReactClass from 'create-react-class'
import data from '../challenges.json'
import LevelIndicator from './LevelIndicator'
import React from 'react';
const h = React.createElement

const Home = createReactClass({

  getInitialState: function () {
    return {
      levels: {
        '1': 'Sober',
        '2': 'Tipsy',
        '3': 'Drunk',
        '4':'Wasted',
        '5':'Sauna'
      },
      currentLevel: 1,
      challengesCompleted: 0,
      challenges: JSON.parse(JSON.stringify(data['challenges'])),
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
      ]
    };
  },

  challengesInLevelLeft: function () {
    return this.state.challenges[this.state.currentLevel]
  },

  insertPlayerNames: function (challenge) {
    const players = this.props.players.slice()
    let challengeString = challenge

    for (let i=0; i< this.props.players.length; i++) {
      const playerPosition = Math.floor(Math.random() * players.length)
      challengeString = challengeString.replace(new RegExp('#{player_' + (i + 1) + '}', 'g'), players[playerPosition])
      players.splice(playerPosition, 1)
    }
    return challengeString
  },

  getUnusedChallenges(previousChallenge){
    const challenges = this.state.challenges
    challenges[this.state.currentLevel] = challenges[this.state.currentLevel].filter(challenge => challenge !== previousChallenge)

    return challenges
  },

  nextChallenge: function (previousChallenge) {
    const challengesCompleted = this.state.challengesCompleted + 1
    const unUsedChallenges = this.getUnusedChallenges(previousChallenge)

    if (this.challengesInLevelLeft().length == 0) {
      this.setState({
        currentLevel: this.state.currentLevel + 1,
        challengesCompleted: 0,
        challenges: unUsedChallenges
      })
    } else {
      this.setState({
        challengesCompleted: challengesCompleted,
        challenges: unUsedChallenges
      })
    }
  },

  restart: function () {
    this.setState(this.getInitialState())
  },

  openMenu: function (event) {
    this.props.openMenu()
    event.stopPropagation()
  },

  getRandomChallenge: function(challenges, currentLevel){
    const randomIndex = Math.floor(Math.random() * challenges[currentLevel].length)
    return challenges[currentLevel][randomIndex]
  },

  render: function () {
    const color = this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
    const currentLevel = this.state.currentLevel
    const levels = this.state.levels
    const challenges = this.state.challenges
    const level = levels[currentLevel]
    const challenge = level && this.getRandomChallenge(challenges, currentLevel)
    const displayChallenge = level && this.insertPlayerNames(challenge)

    return (
      h('div', {className: 'main-container', onClick: () => level && this.nextChallenge(challenge), style: {backgroundColor: color}},
        h('div', {onClick: this.openMenu, className: 'menu-button'},
          h('div', {}),
          h('div', {}),
          h('div', {})),
        h(LevelIndicator, {level}),
        h(Challenge, {challenge: displayChallenge, restart: this.restart})));
  }
})

export default Home;
