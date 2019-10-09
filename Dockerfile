FROM node:10
WORKDIR /usr/src/app
COPY . .
EXPOSE 9090
EXPOSE 9099
CMD ["node","index.js"]
