export function range(from: number, to: number) {
    return Array(to - from + 1)
        .fill(0)
        .map((_, i) => from + i);
}

/**
 * Array.prototype.groupBy polyfill
 */
export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, T[]>);
