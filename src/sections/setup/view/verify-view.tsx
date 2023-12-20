'use client';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid } from '@mui/material';
import NoticeCard from '../notice-card';

// ----------------------------------------------------------------------

export default function VerifyView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" textAlign="center">
        Page : Setup
      </Typography>
      <Grid xs={12} md={4} sx={{ my: 5, mx: 'auto' }} justifyContent="center" container>
        <NoticeCard
          title="Start your KYC"
          description="Begin your Know Your Customer (KYC) procedure to verify your identity."
          action={
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              onClick={() => {
                alert('Start KYC');
              }}
            >
              Start KYC
            </Button>
          }
        />
      </Grid>
    </Container>
  );
}
