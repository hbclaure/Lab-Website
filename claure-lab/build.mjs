import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(root,'dist');
const destination='https://claurelab.github.io/';

// The legacy deployment contains redirects only, including after a local rebuild.
fs.rmSync(dist,{recursive:true,force:true});
fs.mkdirSync(dist,{recursive:true});
fs.writeFileSync(path.join(dist,'.nojekyll'),'');

function redirectPage(route,{preservePath=false}={}){
 const target=new URL(route,destination).href;
 const routeScript=preservePath
  ? `const target=new URL(${JSON.stringify(destination)});\nconst legacyPath=window.location.pathname.replace(/^\\/Lab-Website(?:\\/|$)/,'/');\ntarget.pathname=legacyPath;`
  : `const target=new URL(${JSON.stringify(target)});`;
 return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Claure Lab has moved</title>
<link rel="canonical" href="${target}">
<script>
${routeScript}
target.search=window.location.search;
target.hash=window.location.hash;
window.location.replace(target.href);
</script>
<noscript><meta http-equiv="refresh" content="0; url=${target}"></noscript>
<style>body{max-width:42rem;margin:15vh auto;padding:1.5rem;font-family:system-ui,sans-serif;font-size:1.1rem;line-height:1.5;color:#333}h1{font-size:1.8rem;color:#000}a{color:#0056b3}a:focus-visible{outline:3px solid #0056b3;outline-offset:4px}</style>
</head>
<body>
<h1>Claure Lab has moved</h1>
<p>Our website is now at <a href="${target}">${target}</a>.</p>
<p>If you are not redirected automatically, follow the link above.</p>
</body>
</html>
`;
}

for(const route of ['','people/','publications/','research/','joining/']){
 const directory=path.join(dist,route);
 fs.mkdirSync(directory,{recursive:true});
 fs.writeFileSync(path.join(directory,'index.html'),redirectPage(route));
}
fs.writeFileSync(path.join(dist,'404.html'),redirectPage('',{preservePath:true}));
console.log('Built five legacy route redirects and a path-preserving 404 redirect to '+destination);
