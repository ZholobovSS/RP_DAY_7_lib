import esbuild from 'esbuild';

import path from 'path';

esbuild
    .build({
        bundle: true,
        outdir: 'build',
        entryPoints: [path.resolve(process.cwd(), 'src', 'index.ts')],
        jsx: 'automatic',
        format: 'esm',
        external: ['react', 'react-dom', 'react-router'],
    })
    .then(console.log)
    .catch(console.error);
