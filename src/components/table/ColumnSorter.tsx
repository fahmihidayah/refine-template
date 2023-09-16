
import { IconButton } from "@chakra-ui/react";
import { IconChevronDown, IconSelector, IconChevronUp } from "@tabler/icons";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from "react-icons/bs"
import type { Column } from "@tanstack/react-table";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
    column,
}) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();
    const icon = sorted ? (
        sorted === "asc" ? (
            <IconChevronUp />
        ) : (
            <IconChevronDown />
        )
    ) : (
        <IconSelector />
    );
    return (
        <IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
            icon={ icon }
        >
        </IconButton>
    );
};