import axios from "axios";
import type {Pokemon} from "@/interfaces/interfaces.ts";

export const getPokemonByNameOrNumber = async (name: string):Promise<Pokemon> => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
};

export const getPokedexByNameOrNumber = async (name: string):Promise<Pokemon> => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    return response.data;
}

