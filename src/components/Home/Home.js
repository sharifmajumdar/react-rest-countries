import React, { useState, useContext, useCallback } from 'react';
import { CountriesContext } from '../../App';
import { TableContainer, Table, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import TableHeader from '../TableHeader/TableHeader';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => - descendingComparator(a, b, orderBy)
}

const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
}

const Home = () => {
    const [countries] = useContext(CountriesContext);
    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState(['name', 'population']);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc');
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = useCallback(
        (event) => {
            setRowsPerPage(parseInt(event.target.value), 10)
            setPage(0);
        }
      );

  /*   const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value), 10)
        setPage(0);
    } */
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHeader
                        valueToOrderBy={valueToOrderBy}
                        orderDirection={orderDirection}
                        handleRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {
                            sortedRowInformation(countries, getComparator(orderDirection, valueToOrderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((country, index) => (
                                    <TableRow key={index}>
                                        <TableCell><img src={country.flags.svg} width="100px" height="50px" alt='flag' /></TableCell>
                                        <TableCell>{country.name.common}</TableCell>
                                        <TableCell>{country.region}</TableCell>
                                        <TableCell>{country.population}</TableCell>
                                        <TableCell>{Object.values(country.languages || {})[0]}</TableCell>
                                        <TableCell>
                                            <Link to={`/countrydetails/${country.name.common}`}>
                                                <ArrowForwardIosIcon/>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1, 5]}
                component='div'
                count={countries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div >
    );
};

export default Home;