import {
    BlockquoteCaption,
    BlockquoteContent,
    BlockquoteRoot,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Input,
    Stack, useBreakpointValue
} from "@chakra-ui/react";
import {useState} from "react";
import {
    getPokedexByNameOrNumber,
    getPokemonByNameOrNumber
} from "@/pages/pokemonLookup/services/pokemonLookupService.ts";
import TypeDisplay from "@/pages/pokemonLookup/TypeDisplay.tsx";
import type {PokedexEntry, Pokemon} from "@/interfaces/interfaces.ts";
import SpriteCardsDisplay from "@/pages/pokemonLookup/SpriteCardsDisplay.tsx";
import Dropdown from "@/components/Dropdown.tsx";
import {useTranslation} from "react-i18next";
import PokemonStats from "@/pages/pokemonLookup/PokemonStats.tsx";
import {MovesTable} from "@/pages/pokemonLookup/MovesTable.tsx";
import EvolutionDisplay from "@/pages/pokemonLookup/EvolutionDisplay.tsx";

const PokemonLookupView = () => {
    const [nameOrNumber, setNameOrNumber] = useState<string>("")
    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined)
    const [pokedexEntry, setPokedexEntry] = useState<PokedexEntry | undefined>(undefined)

    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const isMobile = useBreakpointValue({ base: true, sm: false });

    const lngs = {
        en: {nativeName: "English"},
        de: {nativeName: "Deutsch"},
        fr: {nativeName: "Français"},
        ja: {nativeName: "にほんご"}
    }

    const changeNameOrNumber = (newNameOrNumber: string) => {
        setNameOrNumber(newNameOrNumber);
    }

    const searchPokemon = async (searchValue?: string) => {
        const valueToSearch = searchValue || nameOrNumber;

        const [pokemonData, pokedexData] = await Promise.all([
            getPokemonByNameOrNumber(valueToSearch),
            getPokedexByNameOrNumber(valueToSearch)
        ]);

        setPokemon(pokemonData);
        setPokedexEntry(pokedexData);
    }

    const searchRandomPokemon = async () => {
        const numOfPokemon = 1025;
        const randomNumber = Math.floor(Math.random() * (numOfPokemon - 1) + 1).toString();

        const [pokemonData, pokedexData] = await Promise.all([
            getPokemonByNameOrNumber(randomNumber),
            getPokedexByNameOrNumber(randomNumber)
        ]);

        setPokemon(pokemonData);
        setPokedexEntry(pokedexData);
    }

    const currentPokedexEntry = pokedexEntry?.flavor_text_entries.find(
        entry => entry.language.name === language
    )?.flavor_text ?? t("error.no_pokedex_entry");

    return (
        <>
            <Flex gap={isMobile ? 1 : 4} justify="center">
                {Object.entries(lngs).map(([lng, details]) => (
                    <Button
                        type="submit"
                        colorPalette="gray"
                        variant="surface"
                        key={lng}
                        onClick={() => i18n.changeLanguage(lng)}
                        disabled={i18n.resolvedLanguage == lng}>
                        {details.nativeName}
                    </Button>
                ))}
            </Flex>
            <Container maxW="md" mt="8">
                <Flex gap={2} direction={isMobile ? "column" : "row"}>
                    <Input
                        placeholder={t("input.search_pokemon")}
                        onBlur={(e) => changeNameOrNumber(e.target.value)}
                    />
                    <Flex gap={2} width={isMobile ? "50%" : "auto"} alignSelf={isMobile ? "center" : "auto"}>
                        <Button onClick={() => searchPokemon()} colorPalette="green" flex={4}>{t("button.search")}</Button>
                        <Button onClick={searchRandomPokemon} colorPalette="blue" flex={1}>?</Button>
                    </Flex>
                </Flex>
            </Container>
            {pokemon && (
                <Flex direction="column" align="center" gap={4} mt={4}>
                    <Heading size="4xl" css={{marginTop: "8"}}>{pokemon.name.toUpperCase()}</Heading>
                    <div style={{width: "min(600px, 90vw)", marginTop: "24px", marginLeft: "auto", marginRight: "auto"}}>
                        <Flex gap={4} justify="center">
                            <SpriteCardsDisplay pokemon={pokemon} searchPokemon={searchPokemon} />
                        </Flex>
                        <Grid width="100%" templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} mt={isMobile ? 12 : 6} gap={4}>
                            <GridItem minW="0">
                                <TypeDisplay types={pokemon.types} />
                                <BlockquoteRoot css={{marginTop: "6"}}>
                                    <BlockquoteContent>{currentPokedexEntry}</BlockquoteContent>
                                    <BlockquoteCaption><cite>-{t("common.pokedex")}</cite></BlockquoteCaption>
                                </BlockquoteRoot>
                            </GridItem>
                            <GridItem minW="0">
                                <Stack gap={4}>
                                    <Dropdown title={t("dropdown.stats")}>
                                        <PokemonStats stats={pokemon.stats}/>
                                    </Dropdown>
                                    <Dropdown title={t("dropdown.moves")}>
                                        <MovesTable moves={pokemon.moves}/>
                                    </Dropdown>
                                    <Dropdown title={t("dropdown.evolution")}>
                                        {pokedexEntry &&
                                            <EvolutionDisplay
                                                prevEvolutionInfo={pokedexEntry.evolves_from_species}
                                                evoChain={pokedexEntry.evolution_chain.url}
                                            />
                                        }
                                    </Dropdown>
                                </Stack>
                            </GridItem>
                        </Grid>
                    </div>
                </Flex>
            )}
        </>
    )
}
export default PokemonLookupView