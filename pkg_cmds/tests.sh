tsdown

# test1
node test/test1.cjs
node test/test1.mjs
babel test/jsx/test1cjs.jsx -o test/jsx/test1cjs.js; node test/jsx/test1cjs.js
babel test/jsx/test1mjs.jsx -o test/jsx/test1mjs.js; node test/jsx/test1mjs.js

# test2
node test/test2.cjs
node test/test2.mjs
babel test/jsx/test2cjs.jsx -o test/jsx/test2cjs.js; node test/jsx/test2cjs.js
babel test/jsx/test2mjs.jsx -o test/jsx/test2mjs.js; node test/jsx/test2mjs.js

# test3
node test/test3.cjs
node test/test3.mjs
babel test/jsx/test3cjs.jsx -o test/jsx/test3cjs.js; node test/jsx/test3cjs.js
babel test/jsx/test3mjs.jsx -o test/jsx/test3mjs.js; node test/jsx/test3mjs.js

# test4
node test/test4.cjs
node test/test4.mjs
babel test/jsx/test4cjs.jsx -o test/jsx/test4cjs.js; node test/jsx/test4cjs.js
babel test/jsx/test4mjs.jsx -o test/jsx/test4mjs.js; node test/jsx/test4mjs.js

#cleanup for the jsx!
rm -rf test/jsx/*.js