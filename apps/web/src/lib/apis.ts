import { BrawlAPI } from "brawl-api";
import { BrawlClient } from "node-brawlstars";

const brawlApiOld = new BrawlAPI();

export const brawlStarsApi = new BrawlClient(process.env.BRAWL_STARS_API_TOKEN!);
// this shit uses PascalCase retarded
// i could make my own but tbh its just a waste of time
export const brawlifyApi = {
    brawlers: brawlApiOld.Brawlers,
    clubLogs: brawlApiOld.ClubLogs,
    events: brawlApiOld.Events,
    gameModes: brawlApiOld.GameModes,
    icons: brawlApiOld.Icons,
    maps: brawlApiOld.Maps,
};
