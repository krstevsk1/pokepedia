import {getPokemonByNameOrNumber} from "@/pages/pokemonLookup/services/pokemonLookupService.ts";
import {useEffect, useState} from "react";
import type {Pokemon} from "@/interfaces/interfaces.ts";
import {CardBody, CardHeader, CardRoot, Image} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const EvolutionDisplay = ({prevEvolutionInfo}: {
    prevEvolutionInfo?: {name: string, url: string}
}) => {
    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

    const {t} = useTranslation();

    useEffect(() => {
        const fetchPokemon = async () => {
            if (prevEvolutionInfo) {
                const data = await getPokemonByNameOrNumber(prevEvolutionInfo.name);
                setPokemon(data);
            } else {
                setPokemon(undefined);
            }
        };
        fetchPokemon();
    }, [prevEvolutionInfo]);


    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {pokemon && <CardRoot width="120px">
                <CardHeader>
                    {t("pokemon.evolves_from")}
                </CardHeader>
                <CardBody>
                    <Image height="120px" src={pokemon.sprites.front_default?.valueOf()}/>
                </CardBody>
            </CardRoot>}
        </div>
    );
}

export default EvolutionDisplay