import {getPokemonByNameOrNumber} from "@/pages/pokemonLookup/services/pokemonLookupService.ts";
import {useEffect, useState} from "react";
import type {Pokemon} from "@/interfaces/interfaces.ts";
import {CardBody, CardHeader, CardRoot, Image} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {getEvolutionChain} from "@/pages/pokemonLookup/services/evolutionService.ts";

const EvolutionDisplay = ({prevEvolutionInfo, evoChain}: {
    prevEvolutionInfo?: {name: string, url: string},
    evoChain: string
}) => {
    const [prevEvo, setPrevEvo] = useState<Pokemon | undefined>(undefined);
    const [nextEvo, setNextEvo] = useState<Pokemon | undefined>(undefined);

    const {t} = useTranslation();

    useEffect(() => {
        const fetchPokemon = async () => {
            if (prevEvolutionInfo) {
                const data = await getPokemonByNameOrNumber(prevEvolutionInfo.name);
                setPrevEvo(data);
            } else {
                setPrevEvo(undefined);
            }
        };
        const fetchEvoChain = async () => {

            const data = await getEvolutionChain(evoChain);
            if (!prevEvolutionInfo) {
                const pokemon = data.chain.evolves_to[0]?.species.name
                    ? await getPokemonByNameOrNumber(data.chain.evolves_to[0]?.species.name)
                    : undefined;
                setNextEvo(pokemon);
            } else if (data.chain.species.name === prevEvolutionInfo.name && data.chain.evolves_to[0].evolves_to[0] == undefined) {
                setNextEvo(undefined);
            } else if (data.chain.species.name === prevEvolutionInfo.name && data.chain.evolves_to[0].evolves_to) {
                const pokemon = await getPokemonByNameOrNumber(data.chain.evolves_to[0].evolves_to[0].species.name);
                setNextEvo(pokemon);
            } else {
                setNextEvo(undefined);
            }
        }
        fetchPokemon();
        fetchEvoChain();
    }, [evoChain, prevEvolutionInfo]);




    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {prevEvo && <CardRoot width="140px">
                <CardHeader>
                    <div>
                        {t("pokemon.evolves_from")}
                    </div>
                </CardHeader>
                <CardBody>
                    <Image height="120px" src={prevEvo.sprites.front_default?.valueOf()}/>
                </CardBody>
            </CardRoot>}
            {nextEvo && <CardRoot width="140px">
                <CardHeader>
                    <div>
                        {t("pokemon.evolves_to")}
                    </div>
                </CardHeader>
                <CardBody>
                    <Image height="120px" src={nextEvo.sprites.front_default?.valueOf()}/>
                </CardBody>
            </CardRoot>}
            {prevEvo == undefined && nextEvo == undefined && t("pokemon.no_evolutions")
            }
        </div>
    );
}

export default EvolutionDisplay