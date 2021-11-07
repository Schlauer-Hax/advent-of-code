import { ApiServer } from "./apiserver";
import { WebServer } from "./webserver";

const webport = 9000;
const apiport = 1337;

const webserver = new WebServer(webport);
const apiserver = new ApiServer(apiport);

webserver.startWebserver(apiserver);
apiserver.startApi(webserver);