FROM denoland/deno:1.24.0

WORKDIR /app

COPY . .

RUN deno cache --unstable index.ts

CMD ["run", "-A", "index.ts"]