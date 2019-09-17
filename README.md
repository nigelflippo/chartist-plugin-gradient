# Area Gradient plugin for Chartist.js

This is a plugin for Chartist.js that will append a gradient to your line chart that spans opposite directions relative to a baseline threshold.

![Gradient Example Screenshot](https://raw.github.com/nigelflippo/chartist-plugin-gradient/master/ct-gradient-example.png "Gradient Example Screenshot")

## Download
```
npm install --save chartist-plugin-gradient
```

## Available options and their defaults

```javascript
var defaultOptions = {
  threshold: 0;
};
```

## Sample usage in Chartist.js

```javascript
import ctAreaGradient from 'chartist-plugin-gradient';

var chart = new Chartist.Line('.ct-chart', {
  series: [
    [1, 5, -3, 4, -6, 2, -3, 0]
  ]
}, {
  showArea: true,
  areaBase: 0,
  plugins: [
    ctAreaGradient({
      threshold: 0
    })
  ]
});
```

```css
.ct-base-above, .ct-base-below {
  fill: #000;
}
```
