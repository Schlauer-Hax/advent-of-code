import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import ApiServer from "./apiserver.ts";


export default class WebServer {
  solutions: [string, string[]][] = [];
  clients: WebSocket[] = [];
  runs: [number, WebSocket, number][] = [];

  startServer(apiserver: ApiServer) {
    const app = new Application();
    const router = new Router();

    router.get("/wss", (ctx) => {
      if (!ctx.isUpgradable) {
        ctx.throw(501);
      }
      const ws = ctx.upgrade();
      ws.onopen = () => {
        this.clients.push(ws);
        this.updateSolutions([ws]);
      }

      ws.onmessage = (e) => {
        const json = JSON.parse(e.data.toString());
        if (!json.type) return;
        if (json.type === 'run') {
          const solution = json.solution;
          const input = json.input

          if (!(input && solution)) return;
          const id = Math.round(Math.random() * 100000)
          this.runs.push([id, ws, new Date().getTime()]);
          const clientname = this.solutions.find(solutiondata => solutiondata[1].includes(solution))![0];
          console.log(`running ${solution} with runid ${id} on runner ${clientname}`)
          const coderunner = apiserver.clients.find(client => client[0] === clientname);
          if (!coderunner) return;
          coderunner[1].send(`aocserver:run:${id}:${solution}:${input}`)
        } else if (json.type === 'data') {
          if (!json.name) return;
          Deno.readTextFile(`../data/${json.name}.txt`).then(data => {
            ws.send(JSON.stringify({ type: 'data', data: data }));
          }, () => { });
        }
      }

      ws.onclose = () => {
        this.clients = this.clients.filter(client => client !== ws);
      }
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.use(async (ctx) => {
      await ctx.send({
        root: `${Deno.cwd()}/public`,
        index: "index.html",
      });
    });

    console.log("Webserver on http://localhost:9000/");
    app.listen({ port: 9000 });
  }

  updateSolutions(clients = this.clients) {
    clients.forEach(client => {
      try {
        client.send(JSON.stringify({ type: 'solutions', data: this.solutions.map(x => x[1]).reduce((a, b) => a.concat(b), []) }));
      } catch (e) { }
    })
  }
}