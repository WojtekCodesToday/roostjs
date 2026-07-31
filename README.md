## ⚠️ `if looking for @roostjs/, this is not the place!`
i just only now found about it! (31.07.2026)
- https://github.com/birdcar/roost
- https://npmjs.com/@roostjs/cli
- https://roost.birdcar.dev

<hr>

<h1 align=center> roostjs</h1>

<p align=center>json to html parser</p>

roost can run server side or client side, it won't need extra dependencies either...

## usage

```js
// CJS
const roost = require("roostjs");

// ESM
import roost from "roostjs";
```



```js
roost.convert({
    "":{
        child:"text!"
    }
})
//text!

roost.convert({
    "h1-0":{
        child:{
            "i-0":{
                child:"text!"
            }
        }
    }
})
//<h1><i>text</i></h1>

roost.convert({
    "-0":{
        child:"one!"
    },
    "br-0":{
        closed:true
    },
    "-1":{
        child:"two!"
    }
})
//one!<br/>two!
```

## JSX?

it can work with JSX but not exactly like React as there aren't any states, hooks...

`babel.config.json`:
```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "classic",
        "pragma": "roost.convertJSX",
        "pragmaFrag": "roost.convertJSX"
      }
    ]
  ]
}
```

the code might work but not in the exact way you would do in React

(there's no useState, hooks... you would have to reinvent the wheel for that)

```jsx
// (taken from test2 in test/)
// original reference (for comparison)
console.log(roost.convert({
    "h1-0":{
        child:{
            "-0":{
                child:"test 2!"
            },
            "br-0":{closed:true},
            "-1":{
                child:"test 1!"
            },
        }
    }
}))

/*******************************/

// the JSX version
console.log(roost.convert(
    <h1>
        test 2!
        <br />
        test 1!
    </h1>
))

// after a babel transpile of the JSX file
console.log(roost.convert(roost.convertJSX("h1", null, "test 2!", roost.convertJSX("br", null), "test 1!")));
```
