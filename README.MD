# Advent-of-Code
My Solutions for [Advent of Code](https://adventofcode.com/).

## What is it exacly?
This project includes: 
- A Webserver which serves a Website and a Websocketserver for the Website so everyone can run the code. A Version of it is hosted [on my Site](https://aoc.haxis.me/).
- A Apiserver which serves a Websocketsocketserver for the Code Runners.
- Code Runners which run the code that i wrote.

## Why tho?
With this its possible to get the results in the browser, independent of what programming language is being used. 
In summary: Because i was bored and wanted to code the solutions in other languages without anyone noticing.

## What do i need?
You need the following programs:
- `JDK 15`
- `Maven`
- `Node`
- `NPM`

That should be everything to start and use everything. To use the start script you need `Screen` installed

## Running dae Code
### Simple Mode
Just use `./startall.sh` which starts all clients, the webserver and the apiserver in screens. **Screen must be installed**

If you want to only start the Web- and Apiserver you can use `./startserver.sh`

### Manual Mode
Building the Website:
1. Change your directory to the website directory `cd website/`
2. Install packages using npm `npm i`
3. Build the Website `npm run build`

Copying the Website:
1. From the root directory change to the server directory `cd server/`
2. Copy the files `cp -r ../website/build/ ./public/`

Running the Web- and Apiserver:
1. In the server directory install packages `npm i`
2. Run the Server `ts-node index.ts`

Running the clients:

All clients should have a `start.sh` File in their directory which automatically builds and starts the code runners

Example: Starting the Java Client
1. cd into the directory `cd clients/java/`
2. Run start.sh `./start.sh`

### Changing Ports
1. Open the file at `server/index.ts`
2. Change webport and apiport to ports you want to use
3. Open the file at `website/src/View.tsx`
4. Change the url to use the port you specified earlier when setting the webport
5. Open the file at `clients/java/src/main/java/com/hax/adventofcode/Main.java`
6. Change the url to use the port you specified earlier when setting the apiport

Thats about it. I'll add a config file for that in the future, maybe.