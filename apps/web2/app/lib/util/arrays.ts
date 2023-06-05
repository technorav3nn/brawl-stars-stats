export function range(from: number, to: number) {
    return Array(to - from + 1)
        .fill(0)
        .map((_, i) => from + i);
}
