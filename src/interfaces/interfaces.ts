export interface PokemonTypeSlot {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Pokemon {
    id: number,
    name: string,
    sprites: {
        front_default?: string;
        back_default?: string;
        front_shiny?: string;
    },
    height?: number,
    weight?: number,
    types?: PokemonTypeSlot[],
    stats?: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }>,
    pokemon?: Pokemon
}

export interface PokedexEntry {
    flavor_text_entries: Array<{
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
    }>
}

