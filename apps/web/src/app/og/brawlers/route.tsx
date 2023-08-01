/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "next/server";

import { BrawlStarsLogo } from "~/components/Icons/BrawlStarsLogo";

export const runtime = "edge";

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    letterSpacing: "-.02em",
                    fontWeight: 700,
                    background: "white",
                }}
            >
                <div
                    style={{
                        left: 12,
                        top: 12,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <span>
                        <img
                            width="80"
                            height="95"
                            src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9vODRTTEdKZzNLZ2JuaUpadFN5MS5wbmcifQ:supercell:FPjIUyMyFqgwp3k9Ry3iM8lOI75QDfvP3Ol25sDZxoQ?width=2400"
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: 12,
                            fontSize: 30,
                            fontWeight: "bolder",
                            marginBottom: 24,
                        }}
                    >
                        Brawl Stars Stats
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "20px 50px",
                        margin: "0 42px",
                        fontSize: 40,
                        width: "auto",
                        maxWidth: 550,
                        textAlign: "center",
                        backgroundColor: "black",
                        lineHeight: 1.4,
                        marginTop: 20,
                        color: "white",
                    }}
                >
                    View Brawlers In Brawl Stars
                </div>
            </div>
        ),
        {
            width: 800,
            height: 400,
            debug: false,
        }
    );
}
