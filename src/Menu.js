import * as R from 'ramda';
import React from 'react';
import createReactClass from 'create-react-class';
import Game from './Game'

const h = React.createElement

const Menu = createReactClass({

  getInitialState: function () {
    return {
      menuIsOpen: true,
      players: {}
    }
  },

  closeMenu: function () {
    this.setState({
      menuIsOpen: false
    })
  },

  updatePlayers: function (index) {
    return function (event) {
      const value = event.target.value
      const players = this.state.players
      this.setState({
        players: Object.assign({}, players, R.objOf(index + 1, value))
      })
    }.bind(this)
  },

  addPlayer: function () {
    const players = this.state.players
    const playersArray = R.values(players)
    this.setState({
      players: Object.assign({}, players, R.objOf(playersArray.length + 1, null))
    })
  },

  render: function () {
    const menuIsOpen = this.state.menuIsOpen
    const players = this.state.players
    const playersArray = R.values(players)
    return (
      h('div', {className: 'menu outer'},
        h('div', {className: 'menu middle'},
          h('div', {className: 'menu inner'},
            menuIsOpen && h('div', {},
              h('img', {className: 'logo', src: './assets/logo-svg.svg'}),
                playersArray.map(function (playerName, index) {
                  return (
                    h('input', {
                      defaultValue: playerName,
                      key: index,
                      type: 'text',
                      autoFocus: index + 1 === playersArray.length,
                      onChange: this.updatePlayers(index)
                    }))
                }.bind(this)),
                h('input', {
                  placeholder: 'enter player name',
                  type: 'text',
                  onFocus: this.addPlayer
                }),
              h('button', {onClick: this.closeMenu}, 'start game')),
            !menuIsOpen && h('div', {},
              h(Game, {players}))))))}})

export default Menu;
