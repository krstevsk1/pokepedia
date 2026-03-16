import type {EvolutionChain} from "@/interfaces/interfaces.ts";
import axios from "axios";

export const getEvolutionChain = async (url: string): Promise<EvolutionChain> => {
    const response = await axios.get(url);
    return response.data;
}