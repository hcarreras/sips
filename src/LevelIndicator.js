import React from 'react';
import createReactClass from 'create-react-class';
const h = React.createElement

const LevelIndicator = createReactClass({
  render: function () {
    return (
      h('div', {className: 'level-indicator'},  this.props.level));
  }
})

export default LevelIndicator;
