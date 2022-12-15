import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const TableHeader = (props) => {
    const { valueToOrderBy, orderDirection, handleRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Flag
                </TableCell>
                <TableCell key="name">
                    <TableSortLabel
                        active={valueToOrderBy === 'name'}
                        direction={valueToOrderBy === 'name' ? orderDirection : 'asc'}
                        onClick={createSortHandler('name')}
                    >
                        Name
                    </TableSortLabel>
                </TableCell>
                <TableCell>
                    Region
                </TableCell>
                <TableCell key="population">
                    <TableSortLabel
                        active={valueToOrderBy === 'population'}
                        direction={valueToOrderBy === 'population' ? orderDirection : 'desc'}
                        onClick={createSortHandler('population')}
                    >
                        Population
                    </TableSortLabel>
                </TableCell>
                <TableCell>
                    Language
                </TableCell>
                <TableCell>
                    Details
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;