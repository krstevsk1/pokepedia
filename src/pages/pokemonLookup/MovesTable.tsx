import {Table} from "@chakra-ui/react";
import type {Move} from "@/interfaces/interfaces.ts";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

export const MovesTable = ({moves}: {moves: Array<Move>}) => {

    const {t} = useTranslation();

    const sortedMoves: Array<Move> = useMemo(() => {
        return [...moves].sort((a, b) => {
            const levelA = a.version_group_details.at(0)?.level_learned_at ?? 0;
            const levelB = b.version_group_details.at(0)?.level_learned_at ?? 0;
            return levelA - levelB;
        });

    }, [moves]);

    return (
        <Table.ScrollArea rounded="md" height="160px">
        <Table.Root size="sm" variant="outline" stickyHeader width="100%">
            <Table.Header>
                <Table.Row bg="bg.subtle">
                    <Table.ColumnHeader>{t("moves.name")}</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">{t("moves.learned_at")}</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sortedMoves.map((move) => (
                    <Table.Row key={move.move.name}>
                        <Table.Cell>{move.move.name}</Table.Cell>
                        <Table.Cell textAlign="end">{t("moves.lvl")} {move.version_group_details.at(0)?.level_learned_at}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
        </Table.ScrollArea>
    )
}