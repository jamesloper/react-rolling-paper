React component that creates a `div` with an optimized custom scrollbar inside of it. The built file is about 1k, only 70 lines of code! I doubt I can make it any smaller.

`npm install --save react-rolling-paper`

![Screenshot](https://i.imgur.com/IC2qON7.png)

## Usage

```javascript
import RollingPaper from 'react-rolling-paper';

<RollingPaper>
    <div>Long content to scroll</div>
</RollingPaper>
```

## Some CSS Required
You may wish to configure the css in your own project. Please use this as a starting point for your own needs.

```css
.scroller {position:relative; touch-action:pan-x;}
.scroller-content {height:100%; overflow:scroll; overflow:-moz-scrollbars-none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch;}
.scroller-content::-webkit-scrollbar {display:none;}
.scrollbar {position:absolute; top:0; right:0; background:#888; width:4px; opacity:0; border-radius:2px; transition:opacity .2s;}
.scroller:hover .scrollbar, .scroller.active .scrollbar {opacity:1;}
```
