import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['src/roost.ts'],
    clean: false,
    dts: true,
    format: ["cjs", "esm", "iife"], 
    minify: true,
    sourcemap: 'inline',

    globalName: 'roost', 
});
