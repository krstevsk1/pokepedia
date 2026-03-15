export interface PokemonTypeSlot {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Stat {
    base_stat: number,
    effort: number,
    stat: {
        name: string;
    },
    stats?: Array<Stat> | undefined
}

export interface Move {
    move: {
        name: string;
        url: string;
    },
    version_group_details: Array<{
        level_learned_at: number;
        move_learn_method: {
            name: string;
        }
    }>
}

export interface MoveDetails {
    names: Array<{
        language: {
            name: string;
        }
        name: string;
    }>;
    power: number;
    pp: number;
    accuracy: number;
}

export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default?: string;
        back_default?: string;
        front_shiny?: string;
    };
    height?: number;
    weight?: number;
    types?: PokemonTypeSlot[];
    stats?: Array<Stat>;
    moves: Array<Move>;
}

export interface PokedexEntry {
    flavor_text_entries: Array<{
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
    }>,
    evolves_from_species: {
        name: string;
        url: string;
    }
}

