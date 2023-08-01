export const enum CssUnit {
    Pixel = "px",
    Percent = "%",
    ViewportWidth = "vw",
    ViewportHeight = "vh",
    Rem = "rem",
    Em = "em",
    ViewportMin = "vmin",
    ViewportMax = "vmax",
}

/**
 * Extracts the numeric value from a CSS string.
 *
 * @param css The CSS string to extract the value from.
 * @param unit The unit to extract the value from.
 * @returns The numeric value extracted from the CSS string.
 */
export function extractUnitValue(css: string, unit: CssUnit) {
    // convert 180px -> 180
    return parseInt(css.replace(unit, ""), 10);
}
