import React from 'react'
import createReactClass from 'create-react-class'

const h = React.createElement

const Background = createReactClass({
  render: function () {
    const fillMap = ['#00e2cc', '#e984ef', '#ff9d00', '#b820ff', '#f2da00', '#ff402c', '#65c949', '#0086b8', '#00b2ff'];
    return h('svg', { viewBox: "0 0 3026.65 3026.65", className: 'fancy-background' },
      fillMap.map((fill, index) => h('polygon', {
        key: index,
        fill,
        points: '310.65 1992.74 313.31 1830.47 430.65 1708.4 274.29 1615.3 224.34 1455.39 86.31 1588.7 0 1545.24 0 1986.21 140.4 1934.52 310.65 1992.74'
      }))
    );
  }
});

export default Background;
