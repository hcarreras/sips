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
      edition: CLASSIC_EDITION
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
    const menuIsOpen = this.state.menuIsOpen
    const players = this.state.players
    return (
      h('div', {className: 'menu outer'},
        h('div', {className: 'menu middle'},
          h('div', {className: 'menu inner'},
            menuIsOpen && h('div', {},
              h('img', {className: 'logo', src: './assets/logo-svg.svg'}),
                h('div', {className: 'input-container'},
                  players.map(function (playerName, index) {
                    return (
                      h('div', {key: index, className: 'name-field'},
                        h('input', {
                          value: playerName,
                          type: 'text',
                          autoFocus: index + 1 === players.length,
                          onChange: this.updatePlayers(index)
                        }),
                        h('div', {className: 'remove-player-button', onClick: this.removePlayer(index)},
                          h('div', {}),
                          h('div', {}))))
                  }.bind(this)),
                  h('input', {
                    placeholder: 'enter player name',
                    type: 'text',
                    onFocus: this.addPlayer
                  })),
              h('button', {onClick: () => this.startGame(CLASSIC_EDITION)}, 'The Classic'),
              h('button', {onClick: () => this.startGame(TOGA_EDITION)}, 'Toga Edition')),
            h('div', {className: menuIsOpen ? 'hidden' : ''},
              h(Game, {players: players, openMenu: this.openMenu, edition: this.state.edition}))))))}})

export default Menu;
