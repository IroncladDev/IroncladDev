import { defineConfig } from 'astro/config'

export default defineConfig({
    vite: {
        server: {
            allowedHosts: ['local-host.live'],
        },
        preview: {
            allowedHosts: ['local-host.live'],
        },
    },
})
