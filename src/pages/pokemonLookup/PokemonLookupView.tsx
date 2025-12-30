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
    Stack
} from "@chakra-ui/react";
import {useState} from "react";
import {
    getPokedexByNameOrNumber,
    getPokemonByNameOrNumber
} from "@/pages/pokemonLookup/services/pokemonLookupService.tsx";
import TypeDisplay from "@/pages/pokemonLookup/TypeDisplay.tsx";
import type {Pokemon} from "@/interfaces/interfaces.ts";
import SpriteCardsDisplay from "@/pages/pokemonLookup/SpriteCardsDisplay.tsx";
import Dropdown from "@/components/Dropdown.tsx";
import {useTranslation} from "react-i18next";

const PokemonLookupView = () => {
    const [nameOrNumber, setNameOrNumber] = useState<string>("")
    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined)
    const [pokedexEntry, setPokedexEntry] = useState<string | undefined>(undefined)

    const { t, i18n } = useTranslation();

    const lngs = {
        en: {nativeName: "English"},
        de: {nativeName: "Deutsch"},
        fr: {nativeName: "français"},
        jp: {nativeName: "日本語"}
    }

    const changeNameOrNumber = (newNameOrNumber: string) => {
        setNameOrNumber(newNameOrNumber);
    }

    const searchPokemon = async (searchValue?: string) => {
        const valueToSearch = searchValue || nameOrNumber;
        await getPokemonByNameOrNumber(valueToSearch).then(pokemon => {
            setPokemon(pokemon);
            getPokedexEntry(pokemon.id.toString()).then(entry => setPokedexEntry(entry.flavor_text_entries[0].flavor_text));
        });
    }

    const searchRandomPokemon = async () => {
        const numOfPokemon = 1025;

        const randomNumber = Math.floor(Math.random() * (numOfPokemon - 1) + 1).toString();
        await getPokemonByNameOrNumber(randomNumber).then(pokemon => {
            setPokemon(pokemon);
            getPokedexEntry(pokemon.id.toString());
        });
    }

    const getPokedexEntry = async (searchValue?: string) => {
        return await getPokedexByNameOrNumber(searchValue ?? nameOrNumber);
    }

    return (
        <>
            <Flex gap={4} justify="center">
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
                <Flex gap={2}>
                    <Input
                        placeholder={t("input.search_pokemon")}
                        onBlur={(e) => changeNameOrNumber(e.target.value)}
                    />
                    <Button onClick={() => searchPokemon()} colorPalette="green">{t("button.search")}</Button>
                    <Button onClick={searchRandomPokemon} colorPalette="blue">?</Button>
                </Flex>
            </Container>
            {pokemon && (
                <Flex direction="column" align="center" gap={4} mt={4}>
                    <Heading size="4xl" css={{marginTop: "8"}}>{pokemon.name.toUpperCase()}</Heading>
                    <div>
                        <Flex gap={4}>
                            <SpriteCardsDisplay pokemon={pokemon} searchPokemon={searchPokemon} />
                        </Flex>
                    </div>
                    <div style={{width: "55%", marginTop: "24px"}}>
                        <Grid width="600px" templateColumns="repeat(2, 1fr)">
                            <GridItem>
                                <TypeDisplay types={pokemon.types} />
                                <BlockquoteRoot css={{marginTop: "12"}}>
                                    <BlockquoteContent>{pokedexEntry}</BlockquoteContent>
                                    <BlockquoteCaption><cite>-{t("common.pokedex")}</cite></BlockquoteCaption>
                                </BlockquoteRoot>
                            </GridItem>
                            <GridItem>
                                <Stack gap={4}>
                                    <Dropdown title={t("dropdown.stats")}/>
                                    <Dropdown title={t("dropdown.moves")}/>
                                    <Dropdown title={t("dropdown.evolution")}/>
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