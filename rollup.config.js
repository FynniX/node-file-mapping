// rollup.config.js
import typescript from '@rollup/plugin-typescript'
import multi from '@rollup/plugin-multi-entry'

export default {
    input: 'src/**/*.ts',
    output: [
        {
            dir: 'dist',
            format: 'cjs',
            entryFileNames: '[name].cjs',
            preserveModules: true,
            exports: 'named'
        },
        {
            dir: 'dist',
            format: 'es',
            entryFileNames: '[name].mjs',
            preserveModules: true,
            exports: 'named'
        }
    ],
    plugins: [
        typescript(),
        multi({
            preserveModules: true,
            exports: true
        })
    ]
};