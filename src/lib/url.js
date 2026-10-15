/* Every in-site link and image path goes through here, so the site works at
   the domain root (local dev, a custom domain) and under a sub-folder such
   as GitHub Pages' /Karam-Motors-website-demo/. BASE_URL comes from `base` in
   vite.config.js and always ends in a slash. */
export const url = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')
