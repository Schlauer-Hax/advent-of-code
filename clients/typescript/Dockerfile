FROM denoland/deno:2.1.2

WORKDIR /app

COPY . .

RUN deno cache --unstable index.ts

CMD ["run", "-A", "index.ts"]