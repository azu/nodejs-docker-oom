FROM node:18.0

COPY . .

USER node
CMD ["node", "index.js"]
