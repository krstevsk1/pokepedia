import type {MoveDetails} from "@/interfaces/interfaces.ts";
import axios from "axios";

export const getMove = async (url: string): Promise<MoveDetails> => {
    const response = await axios.get(url);
    return response.data;
}