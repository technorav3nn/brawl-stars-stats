import { inspect } from "node:util";

import { App } from "@tinyhttp/app";
import { logger } from "@tinyhttp/logger";
import * as colorette from "colorette";

colorette.createColors();

inspect.defaultOptions.depth = 1;

const app = new App();

enum LogLevel {
    Info = "info",
    Warn = "warn",
    Error = "error",
    Debug = "debug",
}

function log(level: LogLevel, ...args: unknown[]) {
    const color = {
        [LogLevel.Info]: colorette.green("info"),
        [LogLevel.Warn]: colorette.yellow("warn"),
        [LogLevel.Error]: colorette.red("error"),
        [LogLevel.Debug]: colorette.blue("debug"),
    }[level];

    console.log(`[${color}]:`, ...args);
}

app.use(logger());
app.use(async (req, res, next) => {
    if (req.path.startsWith("/brawlers")) {
        log(LogLevel.Info, "Requesting brawlers data");
        // get the rest of the path after /brawlers
        const path = req.path.slice("/brawlers".length);

        // forward the request to the media.brawltime.ninja server
        const mediaResponse = await fetch(`https://media.brawltime.ninja/brawlers${path}`);
        const contentType = mediaResponse.headers.get("content-type");
        const body = await mediaResponse.arrayBuffer();

        res.set("Content-Type", contentType!);
        res.send(Buffer.from(body));
    }

    next();
});

app.get("/", (_, res) => {
    res.send("Hello World!!");
});

app.listen(5555, () => {
    log(LogLevel.Info, "BrawlTracker CDN is running on http://localhost:5555");
});
