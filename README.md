# Area Gradient plugin for Chartist.js

This is a plugin for Chartist.js that will place a gradient on your chart that spans opposite directions relative to a baseline threshold.

## Download
```
npm install chartist-plugin-gradient --save
```

## Available options and their defaults

```javascript
var defaultOptions = {
  threshold: 0
};
```

## Sample usage in Chartist.js

```javascript
var chart = new Chartist.Line('.ct-chart', {
  series: [
    [1, 5, 3, 4, 6, 2, 3],
    [2, 4, 2, 5, 4, 3, 6]
  ]
}, {
  plugins: [
    ctAreaGradient({
      threshold: this.areaBase
    })
  ]
});
```
