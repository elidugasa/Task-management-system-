FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY backend/package*.json ./
COPY backend/prisma ./prisma
COPY backend/scripts ./scripts

RUN npm ci --omit=dev

COPY backend/src ./src

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy --schema prisma/schema.prisma && npm start"]
