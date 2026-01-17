FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Salin file konfigurasi utama
COPY package.json pnpm-lock.yaml* tsconfig.json ./

# Instal semua dependensi
RUN pnpm install

# Salin folder src dan file lainnya
COPY . .

EXPOSE 3000

# Jalankan script dev
CMD ["pnpm", "run", "dev"]
