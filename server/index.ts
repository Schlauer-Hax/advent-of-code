import ApiServer from "./apiserver.ts";
import WebServer from "./webserver.ts";

const apiserver = new ApiServer();
const webserver = new WebServer();

apiserver.startServer(webserver);
webserver.startServer(apiserver);