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

const PokemonLookupView = () => {
    const [nameOrNumber, setNameOrNumber] = useState<string>("")
    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined)
    const [pokedexEntry, setPokedexEntry] = useState<string | undefined>(undefined)

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
            <Container maxW="md">
                <Flex gap={2}>
                    <Input
                        placeholder="Type the name or the pokedex number."
                        onBlur={(e) => changeNameOrNumber(e.target.value)}
                    />
                    <Button onClick={() => searchPokemon()} colorPalette="green">Search</Button>
                    <Button onClick={searchRandomPokemon} colorPalette="blue">?</Button>
                </Flex>
            </Container>
            {pokemon && (
                <Flex direction="column" align="center" gap={4} mt={8}>
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
                                    <BlockquoteCaption><cite>-Pokedex</cite></BlockquoteCaption>
                                </BlockquoteRoot>
                            </GridItem>
                            <GridItem>
                                <Stack gap={4}>
                                    <Dropdown title="stats"/>
                                    <Dropdown title="moves"/>
                                    <Dropdown title="evolves to"/>
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