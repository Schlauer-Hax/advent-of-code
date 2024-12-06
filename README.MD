# Advent-of-Code

My Solutions for [Advent of Code](https://adventofcode.com/).

## What is it exacly?

This project consists of:

- A Server which serves a Website, a Websocket for the Website and a Websocket for the solution runners. The Website is also available [on my Site](https://aoc.haxis.me/). (located in `server/`)
- Solution Runners which run the code I wrote. (located in `clients/`)
- A Helper which is intented for development which downloads input data and triggers the solutions when they are reloaded. (located in `helper/`)
- My input data. (located in `data/`)

## Why tho?

With this its possible to get the results in the browser, independent of what programming language is being used.
In summary: Because i was bored and wanted to code the solutions in other languages without anyone noticing.

## Running the Code

Just use the `docker-compose.yml` which builds and starts all solution runners and the server in containers.

If you don't want to build the images yourself, you can use `docker-compose-images.yml` which uses images built by docker.

You need to provide a data directory where your solution inputs are located. The filenames are following the naming convention `S[last 2 digits of year][day with 2 digits].txt`

### Changing the webservers port

1. Change the port by changing the following section (which can be found in your `docker-compose.yml`) to your needs.

   ```yaml
   ports:
         - "9000:9000" # host:container - change the host port
   ```
