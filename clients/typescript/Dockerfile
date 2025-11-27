FROM denoland/deno:2.5.6

WORKDIR /app

COPY . .

RUN deno cache --unstable index.ts

CMD ["run", "-A", "index.ts"]