const roost = require("../dist/roost.cjs");

console.log(roost.convert({
    "img-0":{
        src: "image.png",
        closed:true,
        class: "image"
    }
}))