import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

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

interface IPropsSkeleton {
  rowsPerPage: number;
}

const SkeletonTable = (props: IPropsSkeleton) => {
  const sckeletonArray = [...Array(props.rowsPerPage)];
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
              {sckeletonArray.map((episod, index) => (
                <StyledTableRow key={`episod-card-skeleton-${index}`}>
                  <StyledTableCell component="th" scope="row">
                    <Skeleton variant="rounded" height={30} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rounded" height={30} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default SkeletonTable;
