# 1. Gunakan image Node.js sebagai base
FROM node:20-alpine AS builder

# 2. Set direktori kerja
WORKDIR /app

# 3. Salin file dependency
COPY package.json yarn.lock tsconfig.json ./

# 4. Install dependency menggunakan Yarn
RUN yarn install

# 5. Salin seluruh source code
COPY . .

# 6. Compile TypeScript ke JavaScript
RUN yarn build

# -------------------------------------

# 7. Buat image produksi
FROM node:20-alpine

# 8. Set direktori kerja
WORKDIR /app

# 9. Salin dependency dan hasil build dari builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# 10. Jalankan aplikasi
CMD ["node", "dist/src/server.js"]
