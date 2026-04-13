import roost from "../roost.mjs"

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