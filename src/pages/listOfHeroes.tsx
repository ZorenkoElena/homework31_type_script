import * as React from 'react';
import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getListOfHeroesAsync } from '../store/slices/heroes';
import { RootState, AppDispatch } from '../store/store';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import HeroesTable from '../components/listOfHeroesTable';
import SkeletonTable from '../components/sckeletonForHeroesTable';

const BasicTableHeroes: React.FC = () => {
  const rowsPerPage = 20;
  const [pageInTable, setPageInTable] = useState<number>(0);

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const heroes = useAppSelector((state) => state.heroes.listOfHeroes);
  const info = useAppSelector((state) => state.heroes.infoPage);
  const isLoading = useAppSelector((state) => state.heroes.isLoading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getListOfHeroesAsync(pageInTable + 1));
  }, [dispatch, pageInTable]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPageInTable(newPage);
  };

  if (isLoading && heroes.length === 0)
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 5,
            mt: 5,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Container>
    );

  return (
    <>
      {isLoading ? (
        <SkeletonTable rowsPerPage={rowsPerPage} />
      ) : (
        <HeroesTable
          heroes={heroes}
          rowsPerPage={rowsPerPage}
          count={info?.count || 0}
          pageInTable={pageInTable}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};

export default BasicTableHeroes;
