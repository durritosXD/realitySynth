FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY server/package.json server/package.json
RUN npm install --workspace server
COPY server server
RUN npm run build --workspace server

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
COPY server/package.json server/package.json
RUN npm install --omit=dev --workspace server
COPY --from=build /app/server/dist server/dist
COPY --from=build /app/server/src/prisma server/src/prisma
COPY --from=build /app/node_modules/.prisma node_modules/.prisma
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "server"]
