FROM denoland/deno:2.5.6

WORKDIR /app

RUN mkdir -p /usr/share/fonts

COPY . .

RUN deno cache --unstable index.ts

CMD ["run", "-A", "index.ts"]