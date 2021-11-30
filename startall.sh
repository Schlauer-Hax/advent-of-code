git pull

chmod 755 ./startserver.sh
screen -dmS aoc-server ./startserver.sh

cd ./clients/java/
chmod 755 ./start.sh
screen -dmS aoc-java ./start.sh

cd ./clients/typescript/
chmod 755 ./start.sh
screen -dmS aoc-ts ./start.sh
