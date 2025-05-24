FROM nginx:alpine

# Copiar archivos estáticos
COPY . /usr/share/nginx/html

# Instalar envsubst para reemplazar variables en el JS
RUN apk add --no-cache gettext

# Script para procesar variables
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]