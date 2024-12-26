#!/bin/sh
export VITE_API_URL=$VITE_API_URL
export VITE_FRONTEND_URL=$VITE_FRONTEND_URL
cd /Users/love/Downloads/AurovilleConnect
/bin/sh -c "/usr/local/opt/node@18/bin/node /usr/local/opt/node@18/bin/npm run dev"