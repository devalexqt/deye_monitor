import { defineConfig, loadEnv, } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import htmlMinifier from 'vite-plugin-html-minifier'

// const apiUrl = import.meta.env.VITE_API_URL//client side

export default defineConfig(({mode})=>{
    
    const env = loadEnv(mode, process.cwd(), '')

    return {
        /////////////////////////////////////////////////////////////////////////////// server proxy //////////////////////////////////////////////////
            server: {
                proxy: {
                // Any request starting with '/api' will be redirected
                '/api': {
                    target: env.VITE_API_URL, // Your backend URL
                    changeOrigin: true,             // Makes the server think the request is local
                    // rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' from the actual URL
                },
                },
            },

        /////////////////////////////////////////////////////////////////////////////////// resolve ///////////////////////////////////////////////////
        resolve: {
            alias: {
            // General root alias
            '@': path.resolve(__dirname, './src'),
            
            // Folder-specific aliases
            '@components': path.resolve(__dirname, './src/js/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@sounds': path.resolve(__dirname, './src/assets/sounds'),
            '@styles': path.resolve(__dirname, './src/styles'),
            },
        },


        ////////////////////////////////////////////////////////////////////////////// build /////////////////////////////////////////////////////////////
        build: {
        // Generates .vite/manifest.json in outDir
            manifest: true,            
            // We want to target modern browsers (es) or universal (umd)
            // formats: ['iife'],

            // 2. Target: Browserslist equivalent (default is 'modules')
            target: 'esnext', 
            
            // 3. OutDir: Change the output folder name (default is 'dist')
            outDir: 'dist',

            // 4. AssetsInlineLimit: Inline small assets as base64 (default 4kb)
            assetsInlineLimit: 4096,

            // 5. Minification: 'esbuild' is fastest, 'terser' is slightly smaller
            minify: 'esbuild',

            // 6. Source Maps: Useful for debugging production errors
            sourcemap: false,

            // 7. Rollup Specific Options
            rollupOptions: {
            output: {
                // Manual Chunking: Split large libraries (like vendor) into separate files
                manualChunks(id) {
                if (id.includes('node_modules')) {
                    return 'vendor';
                }
                },
            },
            },
            esbuild: {
                // Drop console and/or debugger
                drop: ['console', 'debugger'],
            },        
        },//build


        ////////////////////////////////////////////////////////////////////////////// plugins /////////////////////////////////////////////////////////////
        plugins: [
            viteStaticCopy({
            targets: [
                {
                src: 'src/assets/icons',
                dest: 'assets' // This puts them in dist/assets/icons
                }
            ]
            }),

            htmlMinifier({
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true,     // Minifies JS inside <script> tags
                minifyCSS: true,    // Minifies CSS inside <style> tags
                decodeEntities: true,
                removeAttributesQuotes: false,
                }),            
        ]        

    }//return config
})//defineConfig