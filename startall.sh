chmod 755 ./startserver.sh
screen -dmS aoc-server ./startserver.sh

cd ./clients/java/
chmod 755 ./start.sh
screen -dmS aoc-java ./start.sh

cd ../typescript/
chmod 755 ./start.sh
screen -dmS aoc-ts ./start.sh