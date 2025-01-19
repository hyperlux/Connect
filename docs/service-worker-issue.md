# Service Worker Registration Issue Documentation

## Error Details
- Error: Failed to register ServiceWorker for scope ('https://auroville.social/undefined/')
- Script URL: 'https://auroville.social/undefined/service-worker.js'
- Error Type: 404 Not Found
- Affected File: src/App.tsx (line 31)

## Current Configuration Analysis
1. Vite PWA Plugin Configuration (vite.config.ts):
   - registerType: 'autoUpdate'
   - injectRegister: 'auto'
   - srcDir: 'src'
   - filename: 'service-worker.js'
   - strategies: 'injectManifest'
   - base: '/'
   - scope: '/'

2. Service Worker Files:
   - src/service-worker.js exists
   - src/serviceWorkerRegistration.tsx handles registration

3. Build Process:
   - Service worker is built during Vite production build
   - Output should be in dist/service-worker.js

## Root Cause
The undefined path suggests that the base URL for the service worker is not being properly set in the production environment. This could be due to:
1. Missing or incorrect base URL configuration in Vite
2. Issues with the Vite PWA plugin's path resolution
3. Nginx configuration not properly serving the service worker file

## Proposed Solutions
1. Verify Vite base configuration:
   - Ensure base URL is correctly set in vite.config.ts
   - Check environment variables for production build

2. Update Vite PWA Plugin Configuration:
   - Explicitly set the scope and base path
   - Verify injectManifest settings

3. Check Nginx Configuration:
   - Ensure service-worker.js is accessible
   - Verify MIME types and caching headers

## Steps to Verify Fixes
1. Rebuild the application with updated configuration
2. Check service worker registration in browser console
3. Verify service worker file is accessible at correct URL
4. Test offline functionality

## Next Steps
1. Update Vite configuration
2. Modify Nginx configuration if needed
3. Test in production environment
4. Monitor service worker registration and functionality

---

(22/28) Purging libbz2 (1.0.8-r6)
(23/28) Purging libexpat (2.6.4-r0)
(24/28) Purging libffi (3.4.6-r0)
(25/28) Purging libpanelw (6.5_p20241006-r3)
(26/28) Purging libncursesw (6.5_p20241006-r3)
(27/28) Purging ncurses-terminfo-base (6.5_p20241006-r3)
(28/28) Purging mpdecimal (4.0.0-r0)
Executing busybox-1.37.0-r9.trigger
OK: 14 MiB in 26 packages
npm warn config production Use `--omit=dev` instead.

up to date, audited 160 packages in 2s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 ---> Removed intermediate container 428fc0c9f831
 ---> 14090a9a5db4
Step 48/53 : RUN pm2 set pm2-logrotate:max_size 10M &&     pm2 set pm2-logrotate:retain 30 &&     pm2 set pm2-logrotate:compress true &&     pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss &&     pm2 set pm2-logrotate:workerInterval 30 &&     pm2 set pm2-logrotate:rotateInterval '0 0 * * *' &&     pm2 set pm2-logrotate:rotateModule true
 ---> Running in fcb5dbd81f40

                        -------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
 _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
  _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
   _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
    _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
     _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
      _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
       _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
        _\///______________\///______________\///__\///////////////__


                          Runtime Edition

        PM2 is a Production Process Manager for Node.js applications
                     with a built-in Load Balancer.

                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/


                        -------------

[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
$ pm2 set pm2-logrotate:workerInterval 30
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
$ pm2 set pm2-logrotate:workerInterval 30
$ pm2 set pm2-logrotate:rotateInterval 0 0 * * *
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
$ pm2 set pm2-logrotate:workerInterval 30
$ pm2 set pm2-logrotate:rotateInterval 0 0 * * *
$ pm2 set pm2-logrotate:rotateModule true
 ---> Removed intermediate container fcb5dbd81f40
 ---> 8fff7d87f2e8
Step 49/53 : COPY server/health-check.sh /app/server/
 ---> e6256901d4a5
Step 50/53 : RUN chmod +x /app/server/health-check.sh &&     chown appuser:appuser /app/server/health-check.sh
 ---> Running in f75a34404588
 ---> Removed intermediate container f75a34404588
 ---> a87089fa4802
Step 51/53 : USER appuser
 ---> Running in d2605daade35
 ---> Removed intermediate container d2605daade35
 ---> 6b9fa5ee1dba
Step 52/53 : EXPOSE 5000
 ---> Running in ac4d290a738e
 ---> Removed intermediate container ac4d290a738e
 ---> d467df5d6011
Step 53/53 : CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]
 ---> Running in 1b57691addc4
 ---> Removed intermediate container 1b57691addc4
 ---> 511ffda4933b
Successfully built 511ffda4933b
Successfully tagged aurovilleconnect_app:latest
Building nginx
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  144.3MB
Step 1/60 : FROM node:20 AS frontend-builder
 ---> 7b632d45f5d2
Step 2/60 : ENV NODE_OPTIONS="--max-old-space-size=2048"
 ---> Running in ce7ea699bde7
 ---> Removed intermediate container ce7ea699bde7
 ---> 924009ef1b03
Step 3/60 : ENV NODE_ENV=production
 ---> Running in 44ae6120060d
 ---> Removed intermediate container 44ae6120060d
 ---> 27db6de570ab
Step 4/60 : ENV VITE_NODE_ENV=production
 ---> Running in a632574d0908
 ---> Removed intermediate container a632574d0908
 ---> b6b4c33c2710
Step 5/60 : ENV VITE_FRONTEND_URL=https://auroville.social
 ---> Running in d705f79676a0
 ---> Removed intermediate container d705f79676a0
 ---> 92493f065542
Step 6/60 : ENV npm_config_cache=/tmp/npm-cache
 ---> Running in 1dc90946ef6f
 ---> Removed intermediate container 1dc90946ef6f
 ---> d1eb340cbb33
Step 7/60 : WORKDIR /app/frontend
 ---> Running in 631997ee80e8
 ---> Removed intermediate container 631997ee80e8
 ---> e6482fe96efb
Step 8/60 : COPY package*.json ./
 ---> a9bbb0534bc0
Step 9/60 : COPY vite.config.ts ./
 ---> 00f96189bc0d
Step 10/60 : COPY index.html ./
 ---> f2986c8d3c33
Step 11/60 : COPY tsconfig*.json ./
 ---> 59373ea2246e
Step 12/60 : COPY postcss.config.js ./
 ---> 3924ffd37bc6
Step 13/60 : COPY tailwind.config.js ./
 ---> 4292d94078e3
Step 14/60 : RUN npm cache clean --force &&     npm install --include=dev --no-audit --legacy-peer-deps --force
 ---> Running in b900947b7fe8
npm warn using --force Recommended protections disabled.
npm warn using --force Recommended protections disabled.
npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported

added 1037 packages in 1m

176 packages are looking for funding
  run `npm fund` for details
 ---> Removed intermediate container b900947b7fe8
 ---> 3b2e484a86a9
Step 15/60 : COPY src ./src
 ---> 467056430ab2
Step 16/60 : COPY public ./public
 ---> e2cb0a610dca
Step 17/60 : RUN echo "Building frontend..." &&     NODE_ENV=production npx vite build &&     echo "Build completed successfully" &&     echo "Build output:" &&     ls -la dist &&     echo "Detailed directory structure:" &&     find dist -type d -exec echo "Directory: {}" \; &&     find dist -type f -exec echo "File: {}" \; &&     echo "Verifying build files:" &&     [ -f dist/index.html ] &&     [ -f dist/service-worker.js ] &&     [ -d dist/assets ] &&     echo "Verifying CSS files:" &&     find dist/assets -name "*.css" -exec echo "Found CSS file: {}" \; &&     find dist/assets -name "*.css" -exec cat {} \; | grep -q "\.dark" &&     echo "CSS verification successful - dark mode styles found" &&             echo "CSS verification complete" &&             echo "Build verification successful" ||             echo "Build verification completed with warnings"
 ---> Running in 5249e2739db9
Building frontend...
The CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
vite v6.0.7 building for production...
transforming...
✓ 2571 modules transformed.
rendering chunks...
computing gzip size...
dist/manifest.webmanifest                            0.27 kB
dist/index.html                                      1.59 kB │ gzip:   0.74 kB
dist/assets/styles.BJPRlUAC.css                     43.47 kB │ gzip:   7.76 kB
dist/assets/virtual_pwa-register.Bo2OnySd.js         0.89 kB │ gzip:   0.53 kB │ map:     4.04 kB
dist/assets/workbox-window.prod.es5.B9K5rw8f.js      5.78 kB │ gzip:   2.40 kB │ map:    13.62 kB
dist/assets/index.oMTIbPWT.js                    1,016.86 kB │ gzip: 291.30 kB │ map: 4,194.63 kB
✓ built in 41.33s

(!) Some chunks are larger than 1000 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.

PWA v0.21.1
Building src/service-worker.js service worker ("iife" format)...
vite v6.0.7 building for production...
transforming...
✓ 82 modules transformed.
rendering chunks...
computing gzip size...
dist/service-worker.js  25.67 kB │ gzip: 8.32 kB │ map: 220.39 kB
✓ built in 1.28s

PWA v0.21.1
mode      injectManifest
format:   iife
precache  11 entries (6306.04 KiB)
files generated
  dist/service-worker.js
  dist/service-worker.js.map
Build completed successfully
Build output:
total 452
drwxr-xr-x 4 root root   4096 Jan 17 03:32 .
drwxr-xr-x 1 root root   4096 Jan 17 03:31 ..
drwxr-xr-x 2 root root   4096 Jan 17 03:32 assets
drwxr-xr-x 2 root root   4096 Jan 17 03:31 auroimgs
-rw-r--r-- 1 root root  42019 Jan 17 03:31 favicon.png
-rwxr-xr-x 1 root root   1586 Jan 17 03:32 index.html
-rwxr-xr-x 1 root root  68712 Jan 17 03:31 logodark.png
-rwxr-xr-x 1 root root  68951 Jan 17 03:31 logolight.png
-rw-r--r-- 1 root root    677 Jan 17 03:31 manifest.json
-rw-r--r-- 1 root root    267 Jan 17 03:32 manifest.webmanifest
-rw-r--r-- 1 root root  26389 Jan 17 03:32 service-worker.js
-rw-r--r-- 1 root root 217631 Jan 17 03:32 service-worker.js.map
Detailed directory structure:
Directory: dist
Directory: dist/auroimgs
Directory: dist/assets
File: dist/manifest.webmanifest
File: dist/logolight.png
File: dist/index.html
File: dist/logodark.png
File: dist/auroimgs/fred-c-drone-photos_43068849880_o.jpg
File: dist/auroimgs/22general-meeting-in-unity-pavilion_43969150785_o.jpg
File: dist/auroimgs/18permaculture-garden_44880878331_o.jpg
File: dist/auroimgs/27the-learning-community-students_43969157465_o.jpg
File: dist/auroimgs/10building-new-roads_44830149562_o.jpg
File: dist/auroimgs/29udavi-outreach-school_44160225694_o.jpg
File: dist/auroimgs/26transition-school_44830164662_o.jpg
File: dist/auroimgs/12new-dawn-carpentry_44880868171_o.jpg
File: dist/auroimgs/33the-visitors-centre_29944086237_o.jpg
File: dist/auroimgs/32building-a-city_31007558868_o.jpg
File: dist/auroimgs/23international-meeting-in-unity-pavilion_43068790570_o.jpg
File: dist/auroimgs/14botanical-garden-nursery_43068782600_o.jpg
File: dist/auroimgs/20savitri-bhavan_43068788430_o.jpg
File: dist/auroimgs/13buddha-garden-work_44880869151_o.jpg
File: dist/auroimgs/35mira-boutique-in-visitors-centre_44880897981_o.jpg
File: dist/auroimgs/08architecture_44830142842_o.jpg
File: dist/auroimgs/19residential-building_43068787770_o.jpg
File: dist/auroimgs/25dehashakti-sportsground_44160221854_o.jpg
File: dist/auroimgs/06residential-zone_44160197054_o.jpg
File: dist/auroimgs/21meeting-in-unity-pavilion_43969149445_o.jpg
File: dist/auroimgs/05jogging-in-the-green-belt_29944057187_o.jpg
File: dist/auroimgs/30aikiyam-outreach-school_43969160545_o.jpg
File: dist/auroimgs/17preparing-lunch_44880875711_o.jpg
File: dist/auroimgs/36auroville-consulting-office_31007561908_o.jpg
File: dist/auroimgs/tofix.png
File: dist/auroimgs/24auroville-village-action-group_43068792440_o.jpg
File: dist/auroimgs/31future-school-students-presentation_44880893391_o.jpg
File: dist/favicon.png
File: dist/service-worker.js.map
File: dist/assets/index.oMTIbPWT.js
File: dist/assets/virtual_pwa-register.Bo2OnySd.js
File: dist/assets/workbox-window.prod.es5.B9K5rw8f.js.map
File: dist/assets/index.oMTIbPWT.js.map
File: dist/assets/workbox-window.prod.es5.B9K5rw8f.js
File: dist/assets/styles.BJPRlUAC.css
File: dist/assets/virtual_pwa-register.Bo2OnySd.js.map
File: dist/manifest.json
File: dist/service-worker.js
Verifying build files:
Verifying CSS files:
Found CSS file: dist/assets/styles.BJPRlUAC.css
CSS verification successful - dark mode styles found
CSS verification complete
Build verification successful
 ---> Removed intermediate container 5249e2739db9
 ---> c84622ede574
Step 18/60 : RUN rm -rf node_modules
 ---> Running in 0ef419005615
 ---> Removed intermediate container 0ef419005615
 ---> 4b58b8a8efe2
Step 19/60 : FROM node:20 AS server-builder
 ---> 7b632d45f5d2
Step 20/60 : ENV NODE_OPTIONS="--max-old-space-size=2048"
 ---> Running in 6e59d6e87cce
 ---> Removed intermediate container 6e59d6e87cce
 ---> f1176751f2ba
Step 21/60 : ENV NODE_ENV=production
 ---> Running in 572f8f1ef61f
 ---> Removed intermediate container 572f8f1ef61f
 ---> fd9ca0cd92a7
Step 22/60 : ENV npm_config_cache=/tmp/npm-cache
 ---> Running in f9ccc87a54f5
 ---> Removed intermediate container f9ccc87a54f5
 ---> 795d7c9c0221
Step 23/60 : WORKDIR /app/server
 ---> Running in 5ac31ffa9a6c
 ---> Removed intermediate container 5ac31ffa9a6c
 ---> a758625fc683
Step 24/60 : RUN mkdir -p /app/server/logs &&     chown -R 1001:1001 /app/server/logs &&     chmod -R 775 /app/server/logs
 ---> Running in 5b261682117c
 ---> Removed intermediate container 5b261682117c
 ---> ff4274099282
Step 25/60 : COPY server/package.json ./
 ---> 372275e5d557
Step 26/60 : RUN echo "Verifying package.json contents:" &&     cat package.json &&     echo "Current directory contents:" &&     pwd && ls -la &&     echo "File permissions:" &&     ls -l package.json &&     echo "Checking for prisma:generate script:" &&     npm run | grep prisma:generate &&     echo "Package.json location:" &&     find / -name package.json 2>/dev/null &&     echo "Environment variables:" &&     printenv
 ---> Running in f58d5e90839f
Verifying package.json contents:
{
  "name": "auroville-connect-server",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "NODE_ENV=development nodemon index.js",
    "prisma:generate": "prisma generate --schema=./prisma/schema.prisma"
  },
  "dependencies": {
    "@prisma/client": "^6.2.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "pg": "^8.13.1",
    "pg-format": "^1.0.4",
    "prisma": "^6.2.1",
    "winston": "^3.17.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
Current directory contents:
/app/server
total 16
drwxr-xr-x 1 root root 4096 Jan 17 03:32 .
drwxr-xr-x 1 root root 4096 Jan 17 03:32 ..
drwxrwxr-x 2 1001 1001 4096 Jan 17 03:32 logs
-rwxr-xr-x 1 root root  731 Jan 14 21:27 package.json
File permissions:
-rwxr-xr-x 1 root root 731 Jan 14 21:27 package.json
Checking for prisma:generate script:
  prisma:generate
Package.json location:
/usr/local/lib/node_modules/corepack/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmdiff/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmversion/package.json
/usr/local/lib/node_modules/npm/node_modules/treeverse/package.json
/usr/local/lib/node_modules/npm/node_modules/write-file-atomic/package.json
/usr/local/lib/node_modules/npm/node_modules/pacote/package.json
/usr/local/lib/node_modules/npm/node_modules/spdx-correct/node_modules/spdx-expression-parse/package.json
/usr/local/lib/node_modules/npm/node_modules/spdx-correct/package.json
/usr/local/lib/node_modules/npm/node_modules/postcss-selector-parser/package.json
/usr/local/lib/node_modules/npm/node_modules/promise-retry/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-flush/node_modules/minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-flush/package.json
/usr/local/lib/node_modules/npm/node_modules/json-parse-even-better-errors/package.json
/usr/local/lib/node_modules/npm/node_modules/supports-color/package.json
/usr/local/lib/node_modules/npm/node_modules/safer-buffer/package.json
/usr/local/lib/node_modules/npm/node_modules/qrcode-terminal/package.json
/usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/ansi-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/string-width/package.json
/usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/strip-ansi/package.json
/usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/emoji-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/wrap-ansi/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-normalize-package-bin/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmpack/package.json
/usr/local/lib/node_modules/npm/node_modules/balanced-match/package.json
/usr/local/lib/node_modules/npm/node_modules/strip-ansi-cjs/package.json
/usr/local/lib/node_modules/npm/node_modules/negotiator/package.json
/usr/local/lib/node_modules/npm/node_modules/hosted-git-info/package.json
/usr/local/lib/node_modules/npm/node_modules/read/package.json
/usr/local/lib/node_modules/npm/node_modules/read/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/read/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/util-deprecate/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmhook/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-registry-fetch/package.json
/usr/local/lib/node_modules/npm/node_modules/chownr/package.json
/usr/local/lib/node_modules/npm/node_modules/jsonparse/package.json
/usr/local/lib/node_modules/npm/node_modules/nopt/package.json
/usr/local/lib/node_modules/npm/node_modules/jsbn/package.json
/usr/local/lib/node_modules/npm/node_modules/brace-expansion/package.json
/usr/local/lib/node_modules/npm/node_modules/jackspeak/package.json
/usr/local/lib/node_modules/npm/node_modules/jackspeak/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/jackspeak/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/ansi-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/cacache/package.json
/usr/local/lib/node_modules/npm/node_modules/cmd-shim/package.json
/usr/local/lib/node_modules/npm/node_modules/is-lambda/package.json
/usr/local/lib/node_modules/npm/node_modules/promise-all-reject-late/package.json
/usr/local/lib/node_modules/npm/node_modules/cssesc/package.json
/usr/local/lib/node_modules/npm/node_modules/@pkgjs/parseargs/package.json
/usr/local/lib/node_modules/npm/node_modules/shebang-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/socks/package.json
/usr/local/lib/node_modules/npm/node_modules/mkdirp/package.json
/usr/local/lib/node_modules/npm/node_modules/imurmurhash/package.json
/usr/local/lib/node_modules/npm/node_modules/spdx-exceptions/package.json
/usr/local/lib/node_modules/npm/node_modules/color-name/package.json
/usr/local/lib/node_modules/npm/node_modules/diff/package.json
/usr/local/lib/node_modules/npm/node_modules/read-cmd-shim/package.json
/usr/local/lib/node_modules/npm/node_modules/unique-slug/package.json
/usr/local/lib/node_modules/npm/node_modules/sigstore/package.json
/usr/local/lib/node_modules/npm/node_modules/ms/package.json
/usr/local/lib/node_modules/npm/node_modules/socks-proxy-agent/package.json
/usr/local/lib/node_modules/npm/node_modules/@tufjs/canonical-json/package.json
/usr/local/lib/node_modules/npm/node_modules/@tufjs/models/package.json
/usr/local/lib/node_modules/npm/node_modules/graceful-fs/package.json
/usr/local/lib/node_modules/npm/node_modules/smart-buffer/package.json
/usr/local/lib/node_modules/npm/node_modules/https-proxy-agent/package.json
/usr/local/lib/node_modules/npm/node_modules/ignore-walk/package.json
/usr/local/lib/node_modules/npm/node_modules/json-stringify-nice/package.json
/usr/local/lib/node_modules/npm/node_modules/package-json-from-dist/package.json
/usr/local/lib/node_modules/npm/node_modules/package-json-from-dist/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/package-json-from-dist/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/lru-cache/package.json
/usr/local/lib/node_modules/npm/node_modules/lru-cache/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/lru-cache/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/tiny-relative-date/package.json
/usr/local/lib/node_modules/npm/node_modules/minimatch/package.json
/usr/local/lib/node_modules/npm/node_modules/minimatch/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/minimatch/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/proc-log/package.json
/usr/local/lib/node_modules/npm/node_modules/spdx-license-ids/package.json
/usr/local/lib/node_modules/npm/node_modules/debug/node_modules/ms/package.json
/usr/local/lib/node_modules/npm/node_modules/debug/package.json
/usr/local/lib/node_modules/npm/node_modules/bin-links/package.json
/usr/local/lib/node_modules/npm/node_modules/archy/package.json
/usr/local/lib/node_modules/npm/node_modules/err-code/package.json
/usr/local/lib/node_modules/npm/node_modules/glob/package.json
/usr/local/lib/node_modules/npm/node_modules/glob/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/glob/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/iconv-lite/package.json
/usr/local/lib/node_modules/npm/node_modules/env-paths/package.json
/usr/local/lib/node_modules/npm/node_modules/aproba/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-install-checks/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-collect/package.json
/usr/local/lib/node_modules/npm/node_modules/validate-npm-package-name/package.json
/usr/local/lib/node_modules/npm/node_modules/parse-conflict-json/package.json
/usr/local/lib/node_modules/npm/node_modules/p-map/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-pipeline/node_modules/minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-pipeline/package.json
/usr/local/lib/node_modules/npm/node_modules/text-table/package.json
/usr/local/lib/node_modules/npm/node_modules/sprintf-js/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-profile/package.json
/usr/local/lib/node_modules/npm/node_modules/minizlib/node_modules/minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/minizlib/package.json
/usr/local/lib/node_modules/npm/node_modules/clean-stack/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-audit-report/package.json
/usr/local/lib/node_modules/npm/node_modules/signal-exit/package.json
/usr/local/lib/node_modules/npm/node_modules/signal-exit/dist/mjs/package.json
/usr/local/lib/node_modules/npm/node_modules/signal-exit/dist/cjs/package.json
/usr/local/lib/node_modules/npm/node_modules/cidr-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/color-convert/package.json
/usr/local/lib/node_modules/npm/node_modules/encoding/package.json
/usr/local/lib/node_modules/npm/node_modules/shebang-command/package.json
/usr/local/lib/node_modules/npm/node_modules/string-width/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-bundled/package.json
/usr/local/lib/node_modules/npm/node_modules/ip-address/package.json
/usr/local/lib/node_modules/npm/node_modules/semver/package.json
/usr/local/lib/node_modules/npm/node_modules/ansi-styles/package.json
/usr/local/lib/node_modules/npm/node_modules/wrap-ansi-cjs/node_modules/ansi-styles/package.json
/usr/local/lib/node_modules/npm/node_modules/wrap-ansi-cjs/package.json
/usr/local/lib/node_modules/npm/node_modules/just-diff-apply/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/exponential-backoff/package.json
/usr/local/lib/node_modules/npm/node_modules/tuf-js/package.json
/usr/local/lib/node_modules/npm/node_modules/foreground-child/package.json
/usr/local/lib/node_modules/npm/node_modules/foreground-child/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/foreground-child/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/common-ancestor-path/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-pick-manifest/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmaccess/package.json
/usr/local/lib/node_modules/npm/node_modules/string-width-cjs/package.json
/usr/local/lib/node_modules/npm/node_modules/make-fetch-happen/package.json
/usr/local/lib/node_modules/npm/node_modules/fastest-levenshtein/package.json
/usr/local/lib/node_modules/npm/node_modules/binary-extensions/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/fs/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/promise-spawn/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/package-json/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/config/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/redact/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/installed-package-contents/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/query/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/git/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/map-workspaces/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/arborist/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/name-from-folder/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/agent/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/node-gyp/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/metavuln-calculator/package.json
/usr/local/lib/node_modules/npm/node_modules/@npmcli/run-script/package.json
/usr/local/lib/node_modules/npm/node_modules/retry/package.json
/usr/local/lib/node_modules/npm/node_modules/ip-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/path-scurry/package.json
/usr/local/lib/node_modules/npm/node_modules/path-scurry/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/path-scurry/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/is-fullwidth-code-point/package.json
/usr/local/lib/node_modules/npm/node_modules/strip-ansi/package.json
/usr/local/lib/node_modules/npm/node_modules/init-package-json/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmfund/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-sized/node_modules/minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-sized/package.json
/usr/local/lib/node_modules/npm/node_modules/promzard/package.json
/usr/local/lib/node_modules/npm/node_modules/mute-stream/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmorg/package.json
/usr/local/lib/node_modules/npm/node_modules/read-package-json-fast/package.json
/usr/local/lib/node_modules/npm/node_modules/eastasianwidth/package.json
/usr/local/lib/node_modules/npm/node_modules/emoji-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/unique-filename/package.json
/usr/local/lib/node_modules/npm/node_modules/ci-info/package.json
/usr/local/lib/node_modules/npm/node_modules/tar/node_modules/minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/tar/node_modules/fs-minipass/node_modules/minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/tar/node_modules/fs-minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/tar/package.json
/usr/local/lib/node_modules/npm/node_modules/aggregate-error/package.json
/usr/local/lib/node_modules/npm/node_modules/spdx-expression-parse/package.json
/usr/local/lib/node_modules/npm/node_modules/http-proxy-agent/package.json
/usr/local/lib/node_modules/npm/node_modules/isexe/package.json
/usr/local/lib/node_modules/npm/node_modules/fs-minipass/package.json
/usr/local/lib/node_modules/npm/node_modules/cross-spawn/node_modules/which/package.json
/usr/local/lib/node_modules/npm/node_modules/cross-spawn/package.json
/usr/local/lib/node_modules/npm/node_modules/just-diff/package.json
/usr/local/lib/node_modules/npm/node_modules/cli-columns/package.json
/usr/local/lib/node_modules/npm/node_modules/proggy/package.json
/usr/local/lib/node_modules/npm/node_modules/chalk/package.json
/usr/local/lib/node_modules/npm/node_modules/normalize-package-data/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-packlist/package.json
/usr/local/lib/node_modules/npm/node_modules/minipass-fetch/package.json
/usr/local/lib/node_modules/npm/node_modules/http-cache-semantics/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmsearch/package.json
/usr/local/lib/node_modules/npm/node_modules/abbrev/package.json
/usr/local/lib/node_modules/npm/node_modules/indent-string/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-user-validate/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmteam/package.json
/usr/local/lib/node_modules/npm/node_modules/@sigstore/sign/package.json
/usr/local/lib/node_modules/npm/node_modules/@sigstore/tuf/package.json
/usr/local/lib/node_modules/npm/node_modules/@sigstore/verify/package.json
/usr/local/lib/node_modules/npm/node_modules/@sigstore/bundle/package.json
/usr/local/lib/node_modules/npm/node_modules/@sigstore/core/package.json
/usr/local/lib/node_modules/npm/node_modules/@sigstore/protobuf-specs/package.json
/usr/local/lib/node_modules/npm/node_modules/npm-package-arg/package.json
/usr/local/lib/node_modules/npm/node_modules/node-gyp/node_modules/proc-log/package.json
/usr/local/lib/node_modules/npm/node_modules/node-gyp/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmexec/package.json
/usr/local/lib/node_modules/npm/node_modules/libnpmpublish/package.json
/usr/local/lib/node_modules/npm/node_modules/which/node_modules/isexe/package.json
/usr/local/lib/node_modules/npm/node_modules/which/node_modules/isexe/dist/mjs/package.json
/usr/local/lib/node_modules/npm/node_modules/which/node_modules/isexe/dist/cjs/package.json
/usr/local/lib/node_modules/npm/node_modules/which/package.json
/usr/local/lib/node_modules/npm/node_modules/promise-inflight/package.json
/usr/local/lib/node_modules/npm/node_modules/@isaacs/cliui/node_modules/ansi-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/@isaacs/cliui/node_modules/string-width/package.json
/usr/local/lib/node_modules/npm/node_modules/@isaacs/cliui/node_modules/strip-ansi/package.json
/usr/local/lib/node_modules/npm/node_modules/@isaacs/cliui/node_modules/emoji-regex/package.json
/usr/local/lib/node_modules/npm/node_modules/@isaacs/cliui/package.json
/usr/local/lib/node_modules/npm/node_modules/@isaacs/string-locale-compare/package.json
/usr/local/lib/node_modules/npm/node_modules/path-key/package.json
/usr/local/lib/node_modules/npm/node_modules/promise-call-limit/package.json
/usr/local/lib/node_modules/npm/node_modules/promise-call-limit/dist/esm/package.json
/usr/local/lib/node_modules/npm/node_modules/promise-call-limit/dist/commonjs/package.json
/usr/local/lib/node_modules/npm/node_modules/ini/package.json
/usr/local/lib/node_modules/npm/node_modules/ssri/package.json
/usr/local/lib/node_modules/npm/node_modules/walk-up-path/package.json
/usr/local/lib/node_modules/npm/node_modules/walk-up-path/dist/mjs/package.json
/usr/local/lib/node_modules/npm/node_modules/walk-up-path/dist/cjs/package.json
/usr/local/lib/node_modules/npm/node_modules/is-cidr/package.json
/usr/local/lib/node_modules/npm/node_modules/agent-base/package.json
/usr/local/lib/node_modules/npm/node_modules/validate-npm-package-license/node_modules/spdx-expression-parse/package.json
/usr/local/lib/node_modules/npm/node_modules/validate-npm-package-license/package.json
/usr/local/lib/node_modules/npm/node_modules/yallist/package.json
/usr/local/lib/node_modules/npm/package.json
/opt/yarn-v1.22.22/package.json
/app/server/package.json
Environment variables:
NODE_VERSION=20.18.1
HOSTNAME=f58d5e90839f
YARN_VERSION=1.22.22
HOME=/root
NODE_OPTIONS=--max-old-space-size=2048
npm_config_cache=/tmp/npm-cache
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PWD=/app/server
NODE_ENV=production
 ---> Removed intermediate container f58d5e90839f
 ---> 00b834268529
Step 27/60 : COPY server/package-lock.json ./
 ---> 058d61cafdc1
Step 28/60 : RUN echo "Verifying package-lock.json:" &&     ls -l package-lock.json &&     echo "Listing available npm scripts:" &&     npm run &&     echo "Package-lock.json location:" &&     find / -name package-lock.json 2>/dev/null &&     echo "Node version:" &&     node -v &&     echo "NPM version:" &&     npm -v
 ---> Running in a0b43d971a16
Verifying package-lock.json:
-rw-r--r-- 1 root root 73487 Jan 14 12:31 package-lock.json
Listing available npm scripts:
Lifecycle scripts included in auroville-connect-server@1.0.0:
  start
    node index.js
available via `npm run-script`:
  dev
    NODE_ENV=development nodemon index.js
  prisma:generate
    prisma generate --schema=./prisma/schema.prisma
Package-lock.json location:
/app/server/package-lock.json
Node version:
v20.18.1
NPM version:
10.8.2
 ---> Removed intermediate container a0b43d971a16
 ---> 0c38e6da72c0
Step 29/60 : COPY prisma/schema.prisma ./prisma/
 ---> 6b0aecb1a971
Step 30/60 : RUN npm install &&     npm install -g prisma &&     npx prisma generate &&     ls -la node_modules/.prisma/client &&     node -e "require('@prisma/client')" &&     echo "Prisma client generated and verified successfully" &&     npm cache clean --force
 ---> Running in 82b107e3d138

added 159 packages, and audited 160 packages in 11s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

added 6 packages in 8s
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v6.2.1) to ./node_modules/@prisma/client in 811ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

Tip: Interested in query caching in just a few lines of code? Try Accelerate today! https://pris.ly/tip-3-accelerate

total 16052
drwxr-xr-x 3 root root     4096 Jan 17 03:32 .
drwxr-xr-x 3 root root     4096 Jan 17 03:32 ..
-rw-r--r-- 1 root root       23 Jan 17 03:32 default.d.ts
-rw-r--r-- 1 root root       36 Jan 17 03:32 default.js
drwxr-xr-x 2 root root     4096 Jan 17 03:32 deno
-rw-r--r-- 1 root root       25 Jan 17 03:32 edge.d.ts
-rw-r--r-- 1 root root    32090 Jan 17 03:32 edge.js
-rw-r--r-- 1 root root     8146 Jan 17 03:32 index-browser.js
-rw-r--r-- 1 root root   474192 Jan 17 03:32 index.d.ts
-rw-r--r-- 1 root root    32789 Jan 17 03:32 index.js
-rwxr-xr-x 1 root root 15837368 Jan 17 03:32 libquery_engine-debian-openssl-3.0.x.so.node
-rw-r--r-- 1 root root     2600 Jan 17 03:32 package.json
-rw-r--r-- 1 root root     3237 Jan 17 03:32 schema.prisma
-rw-r--r-- 1 root root       23 Jan 17 03:32 wasm.d.ts
-rw-r--r-- 1 root root     8146 Jan 17 03:32 wasm.js
Prisma client generated and verified successfully
npm warn using --force Recommended protections disabled.
 ---> Removed intermediate container 82b107e3d138
 ---> ff0603a5ac19
Step 31/60 : COPY server/index.js ./
 ---> 058142472e6a
Step 32/60 : COPY server/package.json ./
 ---> c946320262ef
Step 33/60 : COPY server/package-lock.json ./
 ---> 22be592d92d8
Step 34/60 : COPY server/config ./config
 ---> d4c41dd27ee2
Step 35/60 : COPY server/lib ./lib
 ---> 4bcf38592749
Step 36/60 : COPY server/middleware ./middleware
 ---> bb61a4549652
Step 37/60 : COPY server/routes ./routes
 ---> 70515769a2e0
Step 38/60 : RUN find . -name "*.cjs" -exec sh -c 'mv "$1" "${1%.cjs}.js"' _ {} \;
 ---> Running in 3a26958afef2
 ---> Removed intermediate container 3a26958afef2
 ---> dbc86e61b874
Step 39/60 : FROM node:20-alpine AS app
 ---> 70ad5a57af6a
Step 40/60 : ENV NODE_ENV=production
 ---> Running in 1c0ddba2e6e7
 ---> Removed intermediate container 1c0ddba2e6e7
 ---> ca8ee5a25247
Step 41/60 : ENV NODE_OPTIONS="--max-old-space-size=2048"
 ---> Running in d1a5a86627fe
 ---> Removed intermediate container d1a5a86627fe
 ---> e29b5803598f
Step 42/60 : RUN apk add --no-cache python3 make g++ curl &&     npm install -g pm2 prisma
 ---> Running in 4cfde56e0c25
fetch https://dl-cdn.alpinelinux.org/alpine/v3.21/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.21/community/x86_64/APKINDEX.tar.gz
(1/37) Installing brotli-libs (1.1.0-r2)
(2/37) Installing c-ares (1.34.3-r0)
(3/37) Installing libunistring (1.2-r0)
(4/37) Installing libidn2 (2.3.7-r0)
(5/37) Installing nghttp2-libs (1.64.0-r0)
(6/37) Installing libpsl (0.21.5-r3)
(7/37) Installing zstd-libs (1.5.6-r2)
(8/37) Installing libcurl (8.11.1-r0)
(9/37) Installing curl (8.11.1-r0)
(10/37) Installing libstdc++-dev (14.2.0-r4)
(11/37) Installing jansson (2.14-r4)
(12/37) Installing binutils (2.43.1-r1)
(13/37) Installing libgomp (14.2.0-r4)
(14/37) Installing libatomic (14.2.0-r4)
(15/37) Installing gmp (6.3.0-r2)
(16/37) Installing isl26 (0.26-r1)
(17/37) Installing mpfr4 (4.2.1-r0)
(18/37) Installing mpc1 (1.3.1-r1)
(19/37) Installing gcc (14.2.0-r4)
(20/37) Installing musl-dev (1.2.5-r8)
(21/37) Installing g++ (14.2.0-r4)
(22/37) Installing make (4.4.1-r2)
(23/37) Installing libbz2 (1.0.8-r6)
(24/37) Installing libexpat (2.6.4-r0)
(25/37) Installing libffi (3.4.6-r0)
(26/37) Installing gdbm (1.24-r0)
(27/37) Installing xz-libs (5.6.3-r0)
(28/37) Installing mpdecimal (4.0.0-r0)
(29/37) Installing ncurses-terminfo-base (6.5_p20241006-r3)
(30/37) Installing libncursesw (6.5_p20241006-r3)
(31/37) Installing libpanelw (6.5_p20241006-r3)
(32/37) Installing readline (8.2.13-r0)
(33/37) Installing sqlite-libs (3.47.1-r0)
(34/37) Installing python3 (3.12.8-r1)
(35/37) Installing python3-pycache-pyc0 (3.12.8-r1)
(36/37) Installing pyc (3.12.8-r1)
(37/37) Installing python3-pyc (3.12.8-r1)
Executing busybox-1.37.0-r9.trigger
OK: 273 MiB in 54 packages

added 143 packages in 57s

13 packages are looking for funding
  run `npm fund` for details
npm notice
npm notice New major version of npm available! 10.8.2 -> 11.0.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.0.0
npm notice To update run: npm install -g npm@11.0.0
npm notice
 ---> Removed intermediate container 4cfde56e0c25
 ---> 79f2ae22d9b8
Step 43/60 : RUN addgroup -g 1001 appuser &&     adduser -u 1001 -G appuser -s /bin/sh -D appuser
 ---> Running in cd2ab22f3fde
 ---> Removed intermediate container cd2ab22f3fde
 ---> 7b42c79fd477
Step 44/60 : WORKDIR /app/server
 ---> Running in 60207ba26f0f
 ---> Removed intermediate container 60207ba26f0f
 ---> 4e7a2104a1ce
Step 45/60 : COPY --from=server-builder /app/server .
 ---> 2f52f947be8a
Step 46/60 : COPY ecosystem.config.cjs .
 ---> b3b9b067cf63
Step 47/60 : RUN npm install &&     npx prisma generate &&     apk del python3 make g++ &&     npm prune --production &&     mkdir -p /app/server/logs &&     chown -R appuser:appuser /app/server &&     chmod -R 775 /app/server/logs
 ---> Running in bbcaa803bfeb

up to date, audited 160 packages in 2s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v6.2.1) to ./node_modules/@prisma/client in 419ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

Tip: Want real-time updates to your database without manual polling? Discover how with Pulse: https://pris.ly/tip-0-pulse

WARNING: opening from cache https://dl-cdn.alpinelinux.org/alpine/v3.21/main: No such file or directory
WARNING: opening from cache https://dl-cdn.alpinelinux.org/alpine/v3.21/community: No such file or directory
(1/28) Purging g++ (14.2.0-r4)
(2/28) Purging libstdc++-dev (14.2.0-r4)
(3/28) Purging gcc (14.2.0-r4)
(4/28) Purging binutils (2.43.1-r1)
(5/28) Purging libatomic (14.2.0-r4)
(6/28) Purging libgomp (14.2.0-r4)
(7/28) Purging musl-dev (1.2.5-r8)
(8/28) Purging isl26 (0.26-r1)
(9/28) Purging jansson (2.14-r4)
(10/28) Purging make (4.4.1-r2)
(11/28) Purging mpc1 (1.3.1-r1)
(12/28) Purging mpfr4 (4.2.1-r0)
(13/28) Purging python3-pyc (3.12.8-r1)
(14/28) Purging python3-pycache-pyc0 (3.12.8-r1)
(15/28) Purging pyc (3.12.8-r1)
(16/28) Purging python3 (3.12.8-r1)
(17/28) Purging readline (8.2.13-r0)
(18/28) Purging sqlite-libs (3.47.1-r0)
(19/28) Purging xz-libs (5.6.3-r0)
(20/28) Purging gdbm (1.24-r0)
(21/28) Purging gmp (6.3.0-r2)
(22/28) Purging libbz2 (1.0.8-r6)
(23/28) Purging libexpat (2.6.4-r0)
(24/28) Purging libffi (3.4.6-r0)
(25/28) Purging libpanelw (6.5_p20241006-r3)
(26/28) Purging libncursesw (6.5_p20241006-r3)
(27/28) Purging ncurses-terminfo-base (6.5_p20241006-r3)
(28/28) Purging mpdecimal (4.0.0-r0)
Executing busybox-1.37.0-r9.trigger
OK: 14 MiB in 26 packages
npm warn config production Use `--omit=dev` instead.

up to date, audited 160 packages in 1s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 ---> Removed intermediate container bbcaa803bfeb
 ---> 91cf5dceddeb
Step 48/60 : RUN pm2 set pm2-logrotate:max_size 10M &&     pm2 set pm2-logrotate:retain 30 &&     pm2 set pm2-logrotate:compress true &&     pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss &&     pm2 set pm2-logrotate:workerInterval 30 &&     pm2 set pm2-logrotate:rotateInterval '0 0 * * *' &&     pm2 set pm2-logrotate:rotateModule true
 ---> Running in 3690621efd42

                        -------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
 _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
  _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
   _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
    _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
     _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
      _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
       _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
        _\///______________\///______________\///__\///////////////__


                          Runtime Edition

        PM2 is a Production Process Manager for Node.js applications
                     with a built-in Load Balancer.

                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/


                        -------------

[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
$ pm2 set pm2-logrotate:workerInterval 30
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
$ pm2 set pm2-logrotate:workerInterval 30
$ pm2 set pm2-logrotate:rotateInterval 0 0 * * *
[PM2] Setting changed
Module: pm2-logrotate
$ pm2 set pm2-logrotate:max_size 10M
$ pm2 set pm2-logrotate:retain 30
$ pm2 set pm2-logrotate:compress true
$ pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
$ pm2 set pm2-logrotate:workerInterval 30
$ pm2 set pm2-logrotate:rotateInterval 0 0 * * *
$ pm2 set pm2-logrotate:rotateModule true
 ---> Removed intermediate container 3690621efd42
 ---> 6d35ce248496
Step 49/60 : COPY server/health-check.sh /app/server/
 ---> c3f22627673b
Step 50/60 : RUN chmod +x /app/server/health-check.sh &&     chown appuser:appuser /app/server/health-check.sh
 ---> Running in 9b3ce78e9d4e
 ---> Removed intermediate container 9b3ce78e9d4e
 ---> 501230e2d45e
Step 51/60 : USER appuser
 ---> Running in 12577f472020
 ---> Removed intermediate container 12577f472020
 ---> ac35f0fb0a89
Step 52/60 : EXPOSE 5000
 ---> Running in 5ff7b2616152
 ---> Removed intermediate container 5ff7b2616152
 ---> 1512b7e44696
Step 53/60 : CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]
 ---> Running in 23bb4793fc31
 ---> Removed intermediate container 23bb4793fc31
 ---> f8505baf66d4
Step 54/60 : FROM nginx:stable-alpine AS nginx
 ---> 4ebaceb1bd2e
Step 55/60 : COPY deploy/nginx.conf/nginx.docker.conf /etc/nginx/conf.d/auroville.conf
 ---> dbd654f1b83d
Step 56/60 : COPY --from=frontend-builder /app/frontend/dist/. /usr/share/nginx/html/
 ---> 4b12cad771c9
Step 57/60 : COPY public/auroimgs /usr/share/nginx/html/auroimgs
 ---> c62247135df0
Step 58/60 : RUN echo "Verifying CSS files in nginx:" &&     find /usr/share/nginx/html/assets -name "*.css" -exec echo "Found CSS file: {}" \; &&     echo "CSS files verification complete"
 ---> Running in 08cadc950b8e
Verifying CSS files in nginx:
Found CSS file: /usr/share/nginx/html/assets/styles.BJPRlUAC.css
CSS files verification complete
 ---> Removed intermediate container 08cadc950b8e
 ---> 2772dd0c3217
Step 59/60 : EXPOSE 80 443
 ---> Running in b401326123de
 ---> Removed intermediate container b401326123de
 ---> 44bc6e9f66e7
Step 60/60 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in edbb75cacaad
 ---> Removed intermediate container edbb75cacaad
 ---> c06ea2395e8c
Successfully built c06ea2395e8c
Successfully tagged aurovilleconnect_nginx:latest
Stopping existing containers...
Removing network aurovilleconnect_auroville_network
WARNING: Network aurovilleconnect_auroville_network not found.
Starting services...
Creating network "aurovilleconnect_auroville_network" with driver "bridge"
Creating volume "aurovilleconnect_postgres_data" with default driver
Creating volume "aurovilleconnect_static_assets" with local driver
Creating auroville_db ... done
Creating auroville_app ... done
Creating auroville_nginx ... done
Waiting for services to be healthy...
Checking db...
db is healthy
Checking app...
app is healthy
Checking nginx...
nginx is healthy
All services are healthy. Deployment complete!
root@ubuntu-s-1vcpu-2gb-blr1-01:~/AurovilleConnect# 

---