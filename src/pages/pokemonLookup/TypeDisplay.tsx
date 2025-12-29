import {Image} from "@chakra-ui/react";
import type {PokemonTypeSlot} from "@/interfaces/interfaces.ts";

const TypeDisplay = ({ types }: { types?: PokemonTypeSlot[] }) => {

    const getPokemonTypeLocations = () => {

        return (
            <div style={{display: "flex", alignContent: "flex-start"}}>
                {types?.map(type => (
                    <div style={{display: "flex", alignItems: "center", gap: "8px", width: "120px"}}>
                    <Image width="48px"
                        key={type.type.name}
                        src={`src/assets/images/types/${type.type.name}.png`}
                        alt={type.type.name}
                    />
                        <b style={{color: getFontColorForType(type.type.name)}}>{type.type.name}</b>
                    </div>
                ))}
            </div>
        );
    }

    const getFontColorForType = (typeName: string): string => {
        const typeColors: Record<string, string> = {
            normal: '#A8A878',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            grass: '#78C850',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#2563EB',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC'
        };

        return typeColors[typeName.toLowerCase()] || '#000000';
    }

    return (
        <div>
            {getPokemonTypeLocations()}
        </div>
    )
}

export default TypeDisplay;