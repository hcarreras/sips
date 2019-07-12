import * as R from 'ramda';
import Challenge from './Challenge'
import createReactClass from 'create-react-class'
import sharedData from '../challenges/shared.json'
import togaData from '../challenges/toga.json'
import { CLASSIC_EDITION, TOGA_EDITION } from './constants'

import Background from './background'
import LevelIndicator from './LevelIndicator'
import React from 'react';
const h = React.createElement
const CHALLENGES_PER_LEVEL = 20

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
      this.setState(this.getInitialState(), this.nextChallenge)
    }
  },

  getChallengesData: function() {
    switch(this.props.edition) {
      case CLASSIC_EDITION: return sharedData['challenges']
      case TOGA_EDITION: return R.mergeDeepWith(R.concat, togaData['challenges'], sharedData['challenges'])
    }
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

  nextChallenge: function () {
    const { levels, currentLevel } = this.state
    const level = levels[currentLevel]
    const challenge = level && this.getRandomChallenge()
    const challengesCompleted = this.state.challengesCompleted + 1
    const unUsedChallenges = this.getUnusedChallenges(challenge)
    const currentChallenge = this.insertPlayerNames(challenge)

    if (this.challengesInLevelLeft().length == 0 || challengesCompleted === CHALLENGES_PER_LEVEL) {
      this.setState({
        currentLevel: this.state.currentLevel + 1,
        challengesCompleted: 0,
        challenges: unUsedChallenges,
        currentChallenge,
      })
    } else {
      this.setState({
        challengesCompleted: challengesCompleted,
        challenges: unUsedChallenges,
        currentChallenge
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

  getRandomChallenge: function(){
    const {challenges, currentLevel} = this.state

    const randomIndex = Math.floor(Math.random() * challenges[currentLevel].length)
    return challenges[currentLevel][randomIndex]
  },

  render: function () {
    const { edition } = this.props
    const { currentChallenge, currentLevel, levels, colors } = this.state
    const color = colors[Math.floor(Math.random() * colors.length)]
    const level = levels[currentLevel]
    if(edition && !currentChallenge) this.nextChallenge()

    return (
      h('div', {className: 'main-container', onClick: () => level && this.nextChallenge(), style: {backgroundColor: color, backgroundImage: 'none'}},
        R.values(levels).map((level, index) => ((index + 1) === currentLevel) && index !== 0 && h('div', { key: index, className: 'next-level', onClick: e => e.stopPropagation() },
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
