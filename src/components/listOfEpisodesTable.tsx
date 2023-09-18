import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';

import { IEpisod } from '../store/slices/episodes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e8d5b2',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface IEpisodesTable {
  episodes: IEpisod[];
  rowsPerPage: number;
  count: number;
  pageInTable: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

const EpisodesTable: React.FC<IEpisodesTable> = (props: IEpisodesTable) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: 650,
          bgcolor: '#fdf5e6',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          mt: 4,
        }}
      >
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="left">Episode</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props.episodes &&
                props.episodes.map((episod) => (
                  <StyledTableRow key={`episod-card-${episod.id}`}>
                    <StyledTableCell component="th" scope="row">
                      {episod.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{episod.name}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>

            <TablePagination
              rowsPerPageOptions={[props.rowsPerPage]}
              component="div"
              count={props.count}
              page={props.pageInTable}
              onPageChange={props.onPageChange}
              rowsPerPage={props.rowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default EpisodesTable;
