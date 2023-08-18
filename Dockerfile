FROM node:18.16.0-alpine

COPY . .
# npmのアップデート通知を無効化
RUN npm config set update-notifier false
RUN corepack enable npm yarn
RUN npm ci
RUN npm -v
USER node
CMD ["npm", "test"]
