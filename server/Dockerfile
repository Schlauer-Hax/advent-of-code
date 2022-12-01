FROM denoland/deno:1.24.0

WORKDIR /app

EXPOSE 9000
EXPOSE 1337

COPY . .

RUN deno cache --unstable index.ts

CMD ["run", "-A", "index.ts"]