# Claure Lab — legacy website redirects

The Claure Lab website has moved to **https://claurelab.github.io/**.

The active website source is maintained at **https://github.com/ClaureLab/claurelab.github.io**. Make future content changes there.

This repository, `hbclaure/Lab-Website`, remains online so existing links continue to work. Its build produces lightweight redirect pages for Home, People, Publications, Research, and Joining. Each route sends visitors to the corresponding route on the new site. JavaScript redirects preserve query strings and URL fragments; the 404 redirect also preserves the requested path after removing the legacy `/Lab-Website/` prefix. Each page includes a canonical URL, a no-JavaScript meta refresh, and a visible fallback link.

## Build and preview

```sh
node claure-lab/build.mjs
python3 -m http.server 4173 --directory claure-lab/dist
```

The build clears `claure-lab/dist` before generating redirects, so old site pages and assets are not included in the deployment. Existing content and image files in this repository are retained as historical source but are not copied into the redirect output.

The existing `.github/workflows/pages.yml` publishes the redirect output on pushes to `main` or a manual workflow run. No custom-domain or DNS changes are required.
