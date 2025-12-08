import ISolution from "./ISolution.ts";

export default class S2507 implements ISolution {
    makeConnections(input: string, shortest: number) {
        const positions = input.split("\n").map(line => line.split(",").map(Number));

        // Calculate all distances between all positions
        const lengths = new Map<string, Map<string, number>>();
        for (const position of positions) {
            for (const position2 of positions) {
                if (position === position2) continue;
                const distance = Math.sqrt(Math.pow(position[ 0 ] - position2[ 0 ], 2) + Math.pow(position[ 1 ] - position2[ 1 ], 2) + Math.pow(position[ 2 ] - position2[ 2 ], 2));
                if (!lengths.has(position.join(","))) {
                    lengths.set(position.join(","), new Map<string, number>());
                }
                lengths.get(position.join(","))!.set(position2.join(","), distance);
            }
        }
        // console.log(lengths);

        // Find shortest distances
        let mins: { from: string; to: string; distance: number }[] = [];
        for (const [ key, map ] of lengths) {
            for (const [ key2, distance ] of map) {
                if (mins.some(({ distance: d }) => distance < d) || mins.length < shortest) {
                    if (mins.filter(({ from: f, to: t }) => (f === key && t === key2) || (f === key2 && t === key)).length === 0) {
                        mins.push({ from: key, to: key2, distance });
                        mins = mins.sort((a, b) => a.distance - b.distance).slice(0, shortest);
                    }
                }
            }
        }
        // console.log(mins);

        // Make connections based on shortest distances
        const connections: Set<string>[] = positions.map((position) => new Set<string>([ position.join(",") ]));
        for (const min of mins) {
            if (!connections.some(conn => conn.has(min.from) || conn.has(min.to))) {
                connections.push(new Set([ min.from, min.to ]));
            } else {
                if (connections.filter(conn => conn.has(min.from) || conn.has(min.to)).length === 2) {
                    const conn1 = connections.find(conn => conn.has(min.from))!;
                    const conn2 = connections.find(conn => conn.has(min.to))!;
                    connections.push(new Set([ ...conn1, ...conn2 ]));
                    connections.splice(connections.indexOf(conn1), 1);
                    connections.splice(connections.indexOf(conn2), 1);
                } else if (connections.some(conn => conn.has(min.from))) {
                    const conn = connections.find(conn => conn.has(min.from))!;
                    conn.add(min.to);
                } else if (connections.some(conn => conn.has(min.to))) {
                    const conn = connections.find(conn => conn.has(min.to))!;
                    conn.add(min.from);
                }
            }
        }
        // console.log(connections);
        return { connections, lengths, positions };
    }
    firstPart(input: string): string | number {
        const { connections } = this.makeConnections(input, 1000);
        return connections.map(conn => conn.size).sort((a,b) => a - b).reverse().slice(0,3).reduce((a, b) => a * b, 1);
    }
    secondPart(input: string): string | number {
        const { connections, lengths } = this.makeConnections(input, 1000);
        const connectionsWithId = connections.map((conn, i) => ({ id: i, conn }));
        let minConnectionLengths: { fromid: number; toid: number; from: string; to: string; distance: number }[] = [];
        const computeMinConnections = (filter?: number) => {
            for (const conn of connectionsWithId) {
                for (const conn2 of connectionsWithId) {
                    if (conn === conn2) continue;
                    if (filter !== undefined) {
                        if (conn.id !== filter && conn2.id !== filter) continue;
                    }
                    // already computed
                    if (minConnectionLengths.some(({ fromid: f, toid: t }) => (f === conn.id && t === conn2.id) || (f === conn2.id && t === conn.id))) {
                        continue;
                    }
                    let minDistance = Infinity;
                    let bestfrom = "";
                    let bestto = "";
                    for (const from of conn.conn) {
                        for (const to of conn2.conn) {
                            const distance = lengths.get(from)!.get(to)!;
                            if (distance < minDistance) {
                                minDistance = distance;
                                bestfrom = from;
                                bestto = to;
                            }
                        }
                    }
                    minConnectionLengths.push({ fromid: conn.id, toid: conn2.id, from: bestfrom, to: bestto, distance: minDistance });
                }
            }
            minConnectionLengths.sort((a, b) => a.distance - b.distance);
        };
        computeMinConnections();
        while (connectionsWithId.length > 2) {
            const conn1 = connectionsWithId.find(conn => conn.id === minConnectionLengths[ 0 ].fromid);
            const conn2 = connectionsWithId.find(conn => conn.id === minConnectionLengths[ 0 ].toid);
            if (!conn1 || !conn2) {
                // Should not happen
                console.log("could not find connections", minConnectionLengths[0]);
                return 0;
            }
            const newId = connections.length + connectionsWithId.length;
            if (connectionsWithId.some(conn => conn.id === newId)) {
                // Should not happen
                console.log("already exists", connections.length + connectionsWithId.length);
                return 0;
            }
            connectionsWithId.push({ id: newId, conn: new Set([ ...conn1!.conn, ...conn2!.conn ]) });
            connectionsWithId.splice(connectionsWithId.indexOf(conn1!), 1);
            connectionsWithId.splice(connectionsWithId.indexOf(conn2!), 1);
            minConnectionLengths = minConnectionLengths.filter(({ fromid, toid }) => fromid !== conn1.id && toid !== conn1.id && fromid !== conn2.id && toid !== conn2.id);
            computeMinConnections(newId);
        }
        if (minConnectionLengths.length === 0) {
            // Happens when there is only one connection from the start
            console.log("no connections found");
            return 0;
        }
        return Number(minConnectionLengths[ 0 ].from.split(",")[ 0 ]) * Number(minConnectionLengths[ 0 ].to.split(",")[ 0 ]);
    }
}