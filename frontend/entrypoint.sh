#!/bin/sh
# Reemplaza BACKEND_URL en app.js al iniciar el contenedor
envsubst '${BACKEND_URL}' < /usr/share/nginx/html/js/app.js > /tmp/app.js && \
mv /tmp/app.js /usr/share/nginx/html/js/app.js

# Inicia Nginx
exec "$@"