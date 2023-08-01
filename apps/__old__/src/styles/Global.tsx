import { Global } from "@mantine/core";

import bold from "~/lib/fonts/GreycliffCF-Bold.woff2?url";
import heavy from "~/lib/fonts/GreycliffCF-Heavy.woff2?url";

export function GlobalStyles() {
    return (
        <Global
            styles={[
                {
                    "@font-face": {
                        fontFamily: "Greycliff CF",
                        fontStyle: "normal",
                        fontWeight: 700,
                        src: `url('${bold}') format("woff2")`,
                    },
                },
                {
                    "@font-face": {
                        fontFamily: "Greycliff CF",
                        fontStyle: "normal",
                        fontWeight: 900,
                        src: `url('${heavy}') format("woff2")`,
                    },
                },
            ]}
        />
    );
}
