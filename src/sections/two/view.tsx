'use client';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid } from '@mui/material';
import NoticeCard from '../setup/notice-card';

// ----------------------------------------------------------------------

export default function TwoView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page : Setup tests </Typography>
      <Grid xs={12} md={4} sx={{ mt: 5 }} container>
        <NoticeCard
          title="Start your KYC"
          description="Begin your Know Your Customer (KYC) procedure to verify your identity."
          action={
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              Start KYC
            </Button>
          }
        />
      </Grid>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
    </Container>
  );
}
