import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import './component.css';

import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';

import HeroWindow from './heroWindow';
import { IHero } from '../store/slices/heroes';

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

interface IHeroesTable {
  heroes: IHero[];
  rowsPerPage: number;
  count: number;
  pageInTable: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

const HeroesTable: React.FC<IHeroesTable> = (props: IHeroesTable) => {
  const [isSelectedHero, setIsSelectedHero] = React.useState<boolean>(false);
  const [selectedHero, setSelectedHero] = React.useState<IHero | null>(null);

  const showCardInfo = (id: number) => {
    const hero = props.heroes.find((item) => item.id === id);
    console.log('hero', hero);
    setIsSelectedHero(true);
    setSelectedHero(hero as IHero);
  };

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
        {isSelectedHero && <HeroWindow selectedHero={selectedHero} closeWindow={() => setIsSelectedHero(false)} />}

        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props.heroes &&
                props.heroes.map((hero) => (
                  <StyledTableRow key={`hero-card-${hero.id}`} onClick={() => showCardInfo(hero.id)}>
                    <StyledTableCell>{hero.id}</StyledTableCell>
                    <StyledTableCell align="left">{hero.name}</StyledTableCell>
                    <StyledTableCell align="left">{hero.status}</StyledTableCell>
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

export default HeroesTable;
