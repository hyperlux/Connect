#!/bin/sh
curl -f --max-time 3 --ipv4 http://127.0.0.1:5000/health || exit 1
