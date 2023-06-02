import { describe, expect, it } from "vitest";

import { createBrawlApi } from "../dist";

const brawlApi = createBrawlApi();

describe("brawlapi", () => {
    describe("Brawlers", () => {
        it("GIVEN valid brawler id THEN returns brawler", async () => {
            const brawler = await brawlApi.brawlers.getBrawlerById(16000000);
            expect(brawler.id).toBe(16000000);
        });
    });
});
