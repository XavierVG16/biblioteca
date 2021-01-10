    FROM node:12 as node 
    WORKDIR /app
   COPY ./ /app/
    ARG PORT

   
   RUN npm install 
   RUN  npm run build -- --prod 
    FROM nginx:alpine
    

    COPY --from=node /app/dist/frontend /usr/share/nginx/html
   COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

   # COPY --from=node /app/dist/frontend /usr/share/nginx/html

   CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'