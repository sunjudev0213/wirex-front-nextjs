'use client';

// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Grid } from '@mui/material';
import IbanCard from '../iban-card';

// ----------------------------------------------------------------------

export default function OrderView() {
  const settings = useSettingsContext();
  const bnkDta = [
    {
      name: 'Bank Fikk',
      iban: 'DE89370400440532013000',
      bal: 1000,
    },
    {
      name: 'UBS',
      iban: 'HK89370400440532013000',
      bal: 1400,
    },
    {
      name: 'ING',
      iban: 'DM89370400440532013000',
      bal: 1200,
    },
    {
      name: 'KBC',
      iban: 'LKAsSDasdASDE832013000',
      bal: 100,
    },
  ];
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page : Order </Typography>
      <Grid xs={12} md={5} lg={6} sx={{ my: 5, mx: 'auto' }} container>
        <IbanCard
          title="Bank Account Details"
          description="Your current balance and IBAN."
          banks={bnkDta}
        />
      </Grid>
    </Container>
  );
}
