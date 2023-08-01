export interface BrawlApiBrawler {
    id: number;
    avatarId: number;
    name: string;
    hash: string;
    path: string;
    released: boolean;
    version: number;
    link: string;
    imageUrl: string;
    imageUrl2: string;
    imageUrl3: string;
    class: {
        id: number;
        name: string;
    };
    rarity: {
        id: number;
        name: string;
        color: string;
    };
    unlock: null;
    description: string;
    starPowers: BrawlApiStarPower[];
    gadgets: BrawlApiGadget[];
    videos: BrawlApiVideo[];
}

export interface BrawlApiGetAllBrawlersResponse {
    list: BrawlApiBrawler[];
}

export interface BrawlApiClub {
    club: {
        tag: string;
        name: string;
        trophies: number;
        requiredTrophies: number;
        memberCount: number;
        description: string;
        updated: {
            data: number;
            history: number;
        };
    };
    history: BrawlApiClubHistory[];
}

export interface BrawlApiEvents {
    active: BrawlApiEvent[];
    upcoming: BrawlApiEvent[];
}

export interface BrawlApiEventStats {
    name: string;
    hash: string;
    brawler1: number;
    brawler2: number;
    brawler3: number;
    data: {
        winRate: number;
        useRate: number;
        wins: number;
        losses: number;
        draws: number;
        total: number;
    };
}

export interface BrawlApiEventTeamStats {
    name: string;
    hash: string;
    brawler1: number;
    brawler2: number;
    brawler3: number;
    data: {
        winRate: number;
        useRate: number;
        wins: number;
        losses: number;
        draws: number;
        total: number;
    };
}

export interface BrawlApiEvent {
    slot: {
        id: number;
        name: string;
        hash: string;
        listAlone: boolean;
        hideable: boolean;
        hideForSlot: null;
        background: string;
    };
    startTime: string;
    endTime: string;
    reward: number;
    map: BrawlApiMap;
    teamStats: BrawlApiEventTeamStats[];
    modifier: null;
}

export interface BrawlApiIcon {
    id: number;
    imageUrl: string;
    imageUrl2: string;
    brawler: number | null;
}

export interface BrawlApiIconsResponse {
    player: BrawlApiIcon[];
    club: BrawlApiIcon[];
}

export interface BrawlApiMaps {
    list: BrawlApiMap[];
}

export interface BrawlApiMap {
    id: number;
    new: boolean;
    disabled: boolean;
    name: string;
    hash: string;
    version: number;
    link: string;
    imageUrl: string;
    credit: null;
    environment: {
        id: number;
        name: string;
        hash: string;
        path: string;
        version: number;
        imageUrl: string;
    };
    gameMode: BrawlApiGameMode;
    lastActive: number;
    dataUpdated: null;
    stats: [];
    teamStats: [];
}

export interface BrawlApiGameModes {
    list: BrawlApiGameMode[];
}

export interface BrawlApiGameMode {
    id: number;
    name: string;
    hash: string;
    scHash: string;
    disabled: boolean;
    color: string;
    version: number;
    title: string;
    tutorial: string;
    description: string;
    shortDescription: string;
    sort1: number;
    sort2: number;
    link: string;
    imageUrl: string;
    imageUrl2: string;
}

export interface BrawlApiStarPower {
    id: number;
    name: string;
    path: string;
    version: number;
    description: string;
    imageUrl: string;
    released: boolean;
}

export interface BrawlApiGadget {
    id: number;
    name: string;
    path: string;
    version: number;
    description: string;
    imageUrl: string;
    released: boolean;
}

export interface BrawlApiVideo {
    type: number;
    name: string;
    description: string;
    duration: string;
    videoUrl: string;
    previewUrl: string;
    uploadDate: string;
}

export interface BrawlApiClubHistory {
    type: string;
    data: {
        joined: boolean;
        player: {
            tag: string;
            name: string;
        };
    };
    timestamp: number;
}

export type BrawlerRating = 1 | 2 | 3 | 4 | 5;

export interface CsvBrawler {
    id: number;
    Speed: number;
    Hitpoints: number;
    OffenseRating: BrawlerRating;
    DefenseRating: BrawlerRating;
    UtilityRating: BrawlerRating;
}
