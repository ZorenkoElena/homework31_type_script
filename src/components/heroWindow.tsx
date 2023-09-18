import React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IHero } from '../store/slices/heroes';

interface IHeroWindow {
  selectedHero: IHero | null;
  closeWindow: () => void;
}

const HeroWindow: React.FC<IHeroWindow> = (props: IHeroWindow) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          mt: 2,
          mb: 4,
        }}
      >
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <img src={`${props.selectedHero?.image}`} alt="Img" className="heroImage"></img>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5">{props.selectedHero?.name}</Typography>
            <Typography variant="subtitle1">
              <b>Status:</b> {props.selectedHero?.status}
            </Typography>
            <Typography variant="subtitle1">
              <b>Species:</b> {props.selectedHero?.species}
            </Typography>
            <Typography variant="subtitle1">
              <b>Gender:</b> {props.selectedHero?.gender}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button size="medium" color="success" variant="contained" onClick={() => props.closeWindow()}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HeroWindow;
