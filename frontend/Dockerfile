# --- build ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

ARG VITE_BASE_API_URL=http://localhost:8080
ARG VITE_OPENROUTER_API_KEY=
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL
ENV VITE_OPENROUTER_API_KEY=$VITE_OPENROUTER_API_KEY

RUN npm run build

# --- run ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]