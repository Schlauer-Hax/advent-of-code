import { startApi } from "./apiserver";
import { startWebserver } from "./webserver";

const webport = 9000;
const apiport = 1337;

startWebserver(webport, apiport);
startApi(apiport);