import React from 'react';
import createReactClass from 'create-react-class';

const h = React.createElement

const Challenge = createReactClass({
  render: function () {
    const challenge = this.props.challenge
    return (
      h('div', {className: 'challenge outer'},
        h('div', {className: 'challenge middle'},
          h('div', {className: 'challenge inner'},
            h('div', {}, challenge || 'Done!'),
            !challenge && h('button', {onClick: this.props.restart}, 'restart')))));
  }
})

export default Challenge;
