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
      challengesPerLevel: 5,
      levels: {
        '1': 'Sober',
        '2': 'Tipsy',
        '3': 'Drunk',
        '4':'Wasted'
      },
      currentLevel: 1,
      challengesCompleted: 0,
      challenges: data['challenges'],
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

  insertPlayerNames: function (challenge) {
    const players = R.values(this.props.players)
    let challengeString = challenge
    const maxNumberOfPlayerNames = 5 // I guess it wont work if there aren't 5 players signed up. What should we do about that?
    for (let i=0; i<maxNumberOfPlayerNames; i++) {
      const playerPosition = Math.floor(Math.random() * players.length)
      challengeString = challengeString.replace('#{player_' + (i + 1) + '}', players[playerPosition])
      players.splice(playerPosition, 1)
    }
    return challengeString
  },

  nextChallenge: function () {
    const challengesCompleted = this.state.challengesCompleted
    if (challengesCompleted === this.state.challengesPerLevel) {
      this.setState({
        currentLevel: this.state.currentLevel + 1,
        challengesCompleted: 0
      })
    } else {
      this.setState({
        challengesCompleted: challengesCompleted + 1
      })
    }
  },

  restart: function () {
    this.setState({
      currentLevel: 1,
      challengesCompleted: 0
    })
  },

  render: function () {
    const color = this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
    const currentLevel = this.state.currentLevel
    const challengesCompleted = this.state.challengesCompleted
    const levels = this.state.levels
    const challenges = this.state.challenges
    const level = levels[currentLevel]
    const challenge = level && this.insertPlayerNames(challenges[currentLevel][challengesCompleted])
    return (
      h('div', {className: 'main-container', onClick: level && this.nextChallenge, style: {backgroundColor: color}},
        h(LevelIndicator, {level}),
        h(Challenge, {challenge, restart: this.restart})));
  }
})

export default Home;
