import * as React from 'react';
import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getListOfEpisodesAsync } from '../store/slices/episodes';
import { RootState, AppDispatch } from '../store/store';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import EpisodesTable from '../components/listOfEpisodesTable';
import SkeletonTable from '../components/sckeletonForEpisodesTable';

const BasicTableEpisodes: React.FC = () => {
  const rowsPerPage = 20;
  const [pageInTable, setPageInTable] = useState<number>(0);

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const episodes = useAppSelector((state) => state.episodes.listOfEpisodes);
  const info = useAppSelector((state) => state.episodes.infoPage);
  const isLoading = useAppSelector((state) => state.episodes.isLoading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getListOfEpisodesAsync(pageInTable + 1));
  }, [dispatch, pageInTable]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPageInTable(newPage);
  };

  if (isLoading && episodes.length === 0)
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
        <EpisodesTable
          episodes={episodes}
          rowsPerPage={rowsPerPage}
          count={info?.count || 0}
          pageInTable={pageInTable}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};

export default BasicTableEpisodes;
