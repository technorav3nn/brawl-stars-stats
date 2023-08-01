/* eslint-disable sort-keys-fix/sort-keys-fix */
import { css } from "../../../styled-system/css";

export const tab = css({
    position: "relative",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
        _light: "gray.2",
        _dark: "dark.4",
    },
    bg: {
        _light: "var(--mantine-color-white)",
        _dark: "dark.6",
    },

    _firstOfType: {
        borderRadius: "4px 0 0 4px",
    },
    _lastOfType: {
        borderRadius: "0 4px 4px 0",
    },
    _hover: {
        bg: {
            _light: "gray.0",
            _dark: "dark.5",
        },
    },

    "&[data-active]": {
        zIndex: 1,
        bg: "blue.filled!",
        borderColor: "blue.filled!",
        color: "var(--mantine-color-white)",
        _hover: {
            bg: "blue.filledHover!",
        },
    },
    "& + &": {
        borderLeftWidth: 0,
    },
});
