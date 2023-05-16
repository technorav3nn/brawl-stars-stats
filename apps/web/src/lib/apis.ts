import { BrawlClient } from "node-brawlstars";
import { BrawlAPI } from "brawl-api";

const brawlApiOld = new BrawlAPI();

export const brawlStarsApi = new BrawlClient(process.env.BRAWL_STARS_API_TOKEN!);
// this shit uses PascalCase retarded
// i could make my own but tbh its just a waste of time
export const brawlifyApi = {
    clubLogs: brawlApiOld.ClubLogs,
    gameModes: brawlApiOld.GameModes,
    brawlers: brawlApiOld.Brawlers,
    maps: brawlApiOld.Maps,
    events: brawlApiOld.Events,
    icons: brawlApiOld.Icons,
};
