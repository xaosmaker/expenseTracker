FROM  node:24-alpine3.22 as builder 
WORKDIR /server
COPY server .
RUN npm install && npm run build

FROM  node:24-alpine3.22 as runner

WORKDIR /app

COPY  --from=builder /server/dist /app/dist
COPY --from=builder /server/package.json .
RUN npm install --only=production






