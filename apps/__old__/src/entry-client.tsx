import { startClient } from "rakkasjs";
import { HelmetProvider } from "react-helmet-async";

import Root from "./root";

startClient({
    hooks: {
        wrapApp(app) {
            return <Root>{app}</Root>;
        },
    },
});
