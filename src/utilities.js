export const setContainerColors = (container, mainColor, secondaryColor) => {
  container.style.backgroundColor = mainColor
  container.style.color = secondaryColor
}

export const randomIndex = (array) => {
  return Math.floor(Math.random()*array.length)
}

export const randomColor = () => {
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

export const hexToComplimentary = (hex) => {
  var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

  rgb = rgb.replace(/[^\d,]/g, '').split(',');

  var r = rgb[0], g = rgb[1], b = rgb[2];

  r /= 255.0;
  g /= 255.0;
  b /= 255.0;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2.0;

  if(max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

    if(max == r && g >= b) {
      h = 1.0472 * (g - b) / d ;
    } else if(max == r && g < b) {
      h = 1.0472 * (g - b) / d + 6.2832;
    } else if(max == g) {
      h = 1.0472 * (b - r) / d + 2.0944;
    } else if(max == b) {
      h = 1.0472 * (r - g) / d + 4.1888;
    }
  }

  h = h / 6.2832 * 360.0 + 0;

  h+= 180;
  if (h > 360) { h -= 360; }
  h /= 360;

  if(s === 0){
    r = g = b = l;
  } else {
    var hue2rgb = function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  rgb = b | (g << 8) | (r << 16);
  return "#" + (0x1000000 | rgb).toString(16).substring(1);
}
