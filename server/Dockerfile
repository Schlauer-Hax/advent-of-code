FROM denoland/deno:2.5.6

WORKDIR /app

EXPOSE 9000
EXPOSE 1337

COPY . .

RUN deno cache --unstable index.ts

CMD ["run", "-A", "index.ts"]