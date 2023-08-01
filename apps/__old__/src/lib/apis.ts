import { brawlApi } from "@brawltracker/brawlapi";
import { BrawlClient } from "node-brawlstars";

export const brawlStarsApi = new BrawlClient(process.env.BRAWL_STARS_API_TOKEN!);
export const brawlifyApi = brawlApi;
