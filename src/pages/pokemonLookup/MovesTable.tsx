import {Button, Progress, Table} from "@chakra-ui/react";
import type {Move, MoveDetails} from "@/interfaces/interfaces.ts";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {getMove} from "@/pages/pokemonLookup/services/moveLookupService.ts";

export const MovesTable = ({moves}: {moves: Array<Move>}) => {
    const [selectedMove, setSelectedMove] = useState<Move | undefined>(undefined);
    const [moveDetails, setMoveDetails] = useState<MoveDetails | undefined>(undefined)
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const {t, i18n} = useTranslation();
    const language = i18n.language;

    const scrollRef = useRef<HTMLDivElement>(null);

    const sortedMoves: Array<Move> = useMemo(() => {
        return [...moves].sort((a, b) => {
            const levelA = a.version_group_details.at(0)?.level_learned_at ?? 0;
            const levelB = b.version_group_details.at(0)?.level_learned_at ?? 0;
            return levelA - levelB;
        });

    }, [moves]);

    useEffect(() => {
        if (!selectedMove) return;

        let cancelled = false;

        getMove(selectedMove.move.url)
            .then(details => {
                if (!cancelled) {
                    setMoveDetails(details);
                }
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            cancelled = true;
        };
    }, [selectedMove]);

    useEffect(() => {
        if (!selectedMove && scrollRef.current) {
            scrollRef.current.scrollTop = scrollPosition;
        }
    }, [selectedMove, scrollPosition]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollPosition(e.currentTarget.scrollTop);
    };

    if (selectedMove && moveDetails) {
        const moveName = moveDetails.names.find(
            n => n.language.name === language
        )?.name ?? moveDetails.names[0]?.name;

        const getColorForPower = (statValue: number) => {
            const ranges = ['red', 'yellow', 'green'];
            const bucket = Math.min(Math.floor(statValue * 3 / 120), 2);

            return ranges[bucket];
        }

        const getColorForAccuracy = (statValue: number) => {
            const ranges = ['red', 'yellow', 'green'];
            const bucket = Math.min(Math.floor(statValue * 3 / 100), 2);

            return ranges[bucket];
        }

        return (
            <div style={{height: "180px"}}>
                <h2 style={{marginBottom: 10}}>{moveName}</h2>
                <p style={{marginBottom: 6}}>{t("moves.power")}: {moveDetails.power}</p>
                <Progress.Root style={{marginBottom: 6}} value={moveDetails.power ?? 0} max={120} colorPalette={getColorForPower(moveDetails.power ?? 0)} >
                    <Progress.Track>
                        <Progress.Range/>
                    </Progress.Track>
                </Progress.Root>
                <p style={{marginBottom: 6}}>{t("moves.accuracy")}: {moveDetails.accuracy}</p>
                <Progress.Root  style={{marginBottom: 6}} value={moveDetails.accuracy ?? 0} max={100} colorPalette={getColorForAccuracy(moveDetails.accuracy ?? 0)} >
                    <Progress.Track>
                        <Progress.Range/>
                    </Progress.Track>
                </Progress.Root>
                <p>{t("moves.pp")}: {moveDetails.pp}</p>
                <Button variant="ghost" style={{float: "right"}} onClick={() => setSelectedMove(undefined)}>{t("button.back")}</Button>
            </div>
        )
    }

    if (selectedMove && !moveDetails) {
        return <div style={{height: "180px"}}>{t("loading")}</div>;
    }

    return (
        <Table.ScrollArea rounded="md" height="180px" ref={scrollRef} onScroll={handleScroll}>
        <Table.Root size="sm" variant="outline" width="100%" stickyHeader interactive>
            <Table.Header>
                <Table.Row bg="bg.subtle">
                    <Table.ColumnHeader>{t("moves.name")}</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">{t("moves.learned_at")}</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sortedMoves.map((move) => (
                    <Table.Row onClick={() => setSelectedMove(move)} key={move.move.name} cursor="pointer">
                        <Table.Cell>{move.move.name}</Table.Cell>
                        <Table.Cell textAlign="end">{t("moves.lvl")} {move.version_group_details.at(0)?.level_learned_at}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
        </Table.ScrollArea>
    )
}