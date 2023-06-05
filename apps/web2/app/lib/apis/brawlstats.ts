import base64 from "base-64";
import md5 from "md5";

const BASE_URL = "https://api.brawlstats.com/v6";

interface ExchangeKeyDecoded {
    uuid: string;
    ipAddress: string;
    iat: number;
    exp: number;
}

export class BrawlStatsApi {
    public token?: string;

    public constructor(token?: string) {
        this.token = token;
    }

    private async getExchangeKey() {
        const response = await fetch(`${BASE_URL}/auth/exchange-key`, {
            // avoid cors issues
            mode: "cors",
        });

        return response.text();
    }

    private decodeExchangeKey(exchangeKey: string) {
        const dataLocation = exchangeKey.split(".")[1];
        const decodedResult = base64.decode(dataLocation);

        return JSON.parse(decodedResult) as ExchangeKeyDecoded;
    }

    private createChecksum(exchangeKey: ExchangeKeyDecoded) {
        const { uuid } = exchangeKey;
        const uuidNew = uuid.substring(5, uuid.length - 1);
        const checksum = md5(uuidNew);

        return checksum;
    }

    public shouldRefreshToken(exchangeKey: ExchangeKeyDecoded) {
        const { iat, exp } = exchangeKey;
        const now = Math.floor(Date.now() / 1000);

        return now > iat && now < exp;
    }

    public async refreshToken() {
        const exchangeKey = await this.getExchangeKey();
        const decodedExchangeKey = this.decodeExchangeKey(exchangeKey);
        const checksum = this.createChecksum(decodedExchangeKey);

        const token = await this.getToken(checksum, exchangeKey);

        this.token = token;
    }

    public async getToken(checksum: string, exchangeKey: string) {
        const response = await fetch(`${BASE_URL}/auth/token?checkSum=${checksum}`, {
            headers: {
                Authorization: `Bearer ${exchangeKey}`,
            },
            // avoid cors issues
            mode: "cors",
        });

        return response.text();
    }

    public async testApi() {
        const exchangeKey = await this.getExchangeKey();
        const decodedExchangeKey = this.decodeExchangeKey(exchangeKey);
        const checksum = this.createChecksum(decodedExchangeKey);

        const token = await this.getToken(checksum, exchangeKey);

        const res = await fetch(
            "https://api.brawlstats.com/v6/players/profiles/V8LLPPC?onAutoRefresh=true",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // avoid cors issues
                mode: "cors",
            }
        );

        return !!(await res.json()).playerProfile.historical.trophies;
    }
}
