export interface BrawlerWithLess {
    id: string;
    name: string;
    resolvedName: string;
    imageUrl: string;
    rarity: {
        id: number;
        name: string;
        color: string;
    };
    description: string;
    class: {
        id: number;
        name: string;
    };
}
