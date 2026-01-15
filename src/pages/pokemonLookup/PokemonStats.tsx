import type {Stat} from "@/interfaces/interfaces.ts";
import {Progress} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const PokemonStats = ({stats}: {stats: Array<Stat> | undefined}) => {

    const {t} = useTranslation();

    const getColorForBar = (statValue: number) => {
        const ranges = ['red', 'yellow', 'green'];
        const bucket = Math.min(Math.floor(statValue * 3 / 160), 2);

        return ranges[bucket];
    }

    const calculateStatTotal = () => {
        return stats?.reduce((total, stat) => total + stat.base_stat, 0) ?? 0;
    }

    return (
        <>
            {
                stats?.map(stat => {
                    return(
                        <div style={{marginBottom: 6}}>
                            <p style={{marginBottom: 2}}>{t(`stats.${stat.stat.name}`)}: {stat.base_stat}</p>
                            <Progress.Root value={stat.base_stat} max={160} colorPalette={getColorForBar(stat.base_stat)} >
                                <Progress.Track>
                                    <Progress.Range/>
                                </Progress.Track>
                            </Progress.Root>
                        </div>
                    )
                })
            }
            <div style={{marginTop: 12}}>
                <p>{t("stats.total")}: {calculateStatTotal()}</p>
            </div>
        </>
    )
}

export default PokemonStats;