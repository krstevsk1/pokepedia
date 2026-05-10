import type {Pokemon} from "@/interfaces/interfaces.ts";
import {Button, CardBody, CardHeader, CardRoot, Heading, Icon, Image, useBreakpointValue} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import {useColorMode} from "@/components/ui/color-mode.tsx";

const SpriteCardsDisplay = (
    { pokemon, searchPokemon }: {
        pokemon: Pokemon,
        searchPokemon: (number: string, changeOrder: boolean) => void
    }) => {

    const { t } = useTranslation();
    const { colorMode } = useColorMode();
    const isMobile = useBreakpointValue({ base: true, sm: false });
    const isDark = colorMode === "dark";

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
                minW={isMobile ? "1" : "auto"}
                px={isMobile ? "1" : "4"}
                variant="ghost"
            >
                <Icon as={MdChevronLeft} css={{ color: isDark ? "#ffde00 !important" : "#ee1515 !important" }} boxSize={12} />
            </Button>)}
            <CardRoot width="240px">
                {!isMobile && <CardHeader>
                    <Heading>{t("pokemon.front_sprite")}</Heading>
                </CardHeader>}
                <CardBody>
                    <Image height="200px" src={pokemon.sprites.front_default?.valueOf()}/>
                </CardBody>
            </CardRoot>
            {pokemon.sprites.back_default && !isMobile && (<CardRoot width="240px">
                {!isMobile && <CardHeader>
                    <Heading>{t("pokemon.back_sprite")}</Heading>
                </CardHeader>}
                <CardBody>
                    <Image height="200px" src={pokemon.sprites.back_default?.valueOf()}/>
                </CardBody>
            </CardRoot>)}
            { pokemon.id < 1025 && (<Button
                onClick={() => handlePokemonChange("next")}
                style={{marginTop: "25%"}}
                minW={isMobile ? "1" : "auto"}
                px={isMobile ? "1" : "4"}
                variant="ghost"
            >
                <Icon as={MdChevronRight} css={{ color: isDark ? "#ffde00 !important" : "#ee1515 !important" }} boxSize={12} />
            </Button>)}
        </>
    )
}

export default SpriteCardsDisplay;