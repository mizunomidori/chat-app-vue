FROM node:lts-bookworm-slim

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# ビルド
RUN npm run build

# アプリケーションを公開するポートを指定
EXPOSE 8080

# アプリケーションを起動
CMD ["npm", "run", "serve"]
