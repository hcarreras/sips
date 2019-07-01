import * as R from 'ramda'
import React from 'react'
import createReactClass from 'create-react-class'
import Game from './Game'
import { CLASSIC_EDITION, TOGA_EDITION } from './constants'

const h = React.createElement

const Menu = createReactClass({

  getInitialState: function () {
    return {
      menuIsOpen: true,
      players: [],
    }
  },

  startGame: function (edition) {
    this.setState({edition: edition})
    this.closeMenu()
  },

  closeMenu: function () {
    this.setState({menuIsOpen: false})
  },

  openMenu: function () {
    this.setState({menuIsOpen: true})
  },

  updatePlayers: function (index) {
    return function (event) {
      const value = event.target.value
      const players = this.state.players.slice()
      players[index] = value
      this.setState({players})
    }.bind(this)
  },

  addPlayer: function () {
    const players = this.state.players.slice()
    players.push('')
    this.setState({players})
  },

  removePlayer: function (index) {
    return function () {
      const players = this.state.players.slice()
      players.splice(index, 1)
      this.setState({players})
    }.bind(this)
  },

  render: function () {
    const { menuIsOpen, players, edition } = this.state

    return (
      h('div', {className: 'menu outer'},
        h('div', {className: 'menu middle'},
          h('div', {className: 'menu inner'},
            menuIsOpen && h('div', {},
              h('div', {className: 'logo'},
                h('svg',  {viewBox: '0 0 926.3 316.2'},
                  h('path', {d: 'M168.5,230.2c0-10.9-3.8-19.3-11.5-25.4s-21.2-12.3-40.5-18.8-35.1-12.8-47.4-18.8Q9.25,137.8,9.3,86.4c0-17.1,5-32.1,14.9-45.1s24-23.2,42.2-30.4S105,0,127.7,0c22.1,0,42,3.9,59.5,11.8s31.2,19.1,40.9,33.7,14.6,31.3,14.6,50h-74c0-12.5-3.8-22.3-11.5-29.2S139.1,55.9,126,55.9c-13.3,0-23.7,2.9-31.4,8.8S83.1,78,83.1,87c0,7.9,4.2,15,12.7,21.5s23.3,13,44.6,19.9,38.8,14.2,52.4,22.1q49.95,28.8,49.9,79.3c0,26.9-10.1,48.1-30.4,63.4s-48.1,23-83.5,23q-37.35,0-67.8-13.4Q30.7,289.45,15.3,266C5.1,250.5,0,232.5,0,212.2H74.4c0,16.5,4.3,28.6,12.8,36.5s22.4,11.8,41.6,11.8c12.3,0,22-2.6,29.1-7.9S168.5,239.8,168.5,230.2Z'}),
                  h('path', {d: 'M359.9,312h-74V4.2h74Z'}),
                  h('path', {d: 'M485.7,207.6V312H411.5V4.2H534.3c23.5,0,44.4,4.3,62.5,13s32.1,21,42.1,37,14.9,34.1,14.9,54.4c0,30-10.8,54-32.2,72s-51,27-88.5,27Zm0-57.3h48.6c14.4,0,25.3-3.6,32.9-10.8s11.3-17.3,11.3-30.4c0-14.4-3.9-25.9-11.6-34.5s-18.3-13-31.7-13.1H485.7Z'}),
                  h('path', {d: 'M852.1,230.2c0-10.9-3.8-19.3-11.5-25.4s-21.2-12.3-40.5-18.8-35.1-12.8-47.4-18.8q-59.85-29.4-59.8-80.8c0-17.1,5-32.1,14.9-45.1s24-23.2,42.2-30.4S788.6,0,811.3,0c22.1,0,42,3.9,59.5,11.8S902,30.9,911.7,45.5s14.6,31.3,14.6,50h-74c0-12.5-3.8-22.3-11.5-29.2s-18.1-10.4-31.2-10.4c-13.3,0-23.7,2.9-31.4,8.8S766.7,78,766.7,87c0,7.9,4.2,15,12.7,21.5s23.3,13,44.6,19.9,38.8,14.2,52.4,22.1q49.95,28.8,49.9,79.3c0,26.9-10.1,48.1-30.4,63.4s-48.1,23-83.5,23q-37.35,0-67.8-13.4T698.9,266q-15.3-23.4-15.3-53.8H758c0,16.5,4.3,28.6,12.8,36.5s22.4,11.7,41.5,11.7c12.3,0,22-2.6,29.1-7.9S852.1,239.8,852.1,230.2Z'}))),
              h('div', {className: 'select-game', style: {display: players.length > 3 ? null : 'none'}},
                h('div', {className: 'header'}, 'Select game'),
                h('button', {onClick: () => this.startGame(CLASSIC_EDITION)}, 'The Classic'),
                h('button', {onClick: () => this.startGame(TOGA_EDITION)}, 'Toga Edition')),
              h('div', {className: 'input-container'},
                h('div', {className: 'header'}, 'Enter player names'),
                players.map(function (playerName, index) {
                  return (
                    h('div', {key: index, className: 'name-field'},
                      h('input', {
                        value: playerName,
                        type: 'text',
                        autoFocus: index + 1 === players.length,
                        onChange: this.updatePlayers(index)
                      }),
                      h('div', {className: 'remove-player-button', tabIndex: '0', onClick: this.removePlayer(index)},
                        h('div', {}),
                        h('div', {}))))
                }.bind(this)),
                h('input', {
                  placeholder: 'enter player name...',
                  type: 'text',
                  onFocus: this.addPlayer
                }))),
          h('div', {className: menuIsOpen ? 'hidden' : ''},
            edition && h(Game, {players: players, openMenu: this.openMenu, edition: edition}))))))}})

export default Menu;
