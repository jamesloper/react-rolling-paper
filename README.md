A simple React Component that is under 1k, only 90 lines of code, and is totally optimized!

`npm install --save react-rolling-paper`

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
.scroller {position:relative; overflow:hidden;}
.scrollbar {position:absolute; top:0; right:0; background-color:#888; width:4px; opacity:0; border-radius:2px; transition:opacity .2s;}
.scroller:hover .scrollbar, .scroller-active .scrollbar {opacity:1;}
```