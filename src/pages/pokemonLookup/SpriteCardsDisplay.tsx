import type {Pokemon} from "@/interfaces/interfaces.ts";
import {FcNext, FcPrevious} from "react-icons/fc";
import {Button, CardBody, CardHeader, CardRoot, Heading, Image} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const SpriteCardsDisplay = (
    { pokemon, searchPokemon }: {
        pokemon: Pokemon,
        searchPokemon: (number: string, changeOrder: boolean) => void
    }) => {

    const { t } = useTranslation();

    const handlePokemonChange = (order: string) => {

        if (order == "next") {
            const nextPokemon = pokemon.id + 1;
            searchPokemon(nextPokemon.toString(), true);
        } else {
            const previousPokemon = pokemon.id - 1;
            searchPokemon(previousPokemon.toString(), true)
        }
    }

    return (
        <>
            { pokemon.id > 1 && (<Button
                onClick={() => handlePokemonChange("previous")}
                style={{marginTop: "25%"}}
                variant="ghost">
                <FcPrevious/>
            </Button>)}
            <CardRoot width="240px">
                <CardHeader>
                    <Heading>{t("pokemon.front_sprite")}</Heading>
                </CardHeader>
                <CardBody>
                    <Image height="200px" src={pokemon.sprites.front_default?.valueOf()}/>
                </CardBody>
            </CardRoot>
            {pokemon.sprites.back_default && (<CardRoot width="240px">
                <CardHeader>
                    <Heading>{t("pokemon.back_sprite")}</Heading>
                </CardHeader>
                <CardBody>
                    <Image height="200px" src={pokemon.sprites.back_default?.valueOf()}/>
                </CardBody>
            </CardRoot>)}
            { pokemon.id < 1025 && (<Button
                onClick={() => handlePokemonChange("next")}
                style={{marginTop: "25%"}}
                variant="ghost">
                <FcNext/>
            </Button>)}
        </>
    )
}

export default SpriteCardsDisplay;