import { Button } from "@mantine/core";

import { css } from "~/styled-system/css";

export default function Home() {
    return (
        <div>
            hello world
            <h1
                className={css({
                    color: "red.4",
                    fontFamily: "lexend",
                    marginTop: 50,
                })}
            >
                Hi
            </h1>
            <Button
                className={css({
                    bg: "red.4",
                })}
            >
                Yooo!
            </Button>
        </div>
    );
}
