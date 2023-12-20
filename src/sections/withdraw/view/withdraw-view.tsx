'use client';

// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Grid } from '@mui/material';
import IbanCard from '../withdraw-card';
import WithdrawWalletCard from '../withdraw-card';

// ----------------------------------------------------------------------

export default function WithdrawView() {
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
      <Typography variant="h4" textAlign="center">
        Withdraw
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        sx={{
          opacity: 0.6,
          fontWeight: 300,
          fontSize: '0.8rem',
          mt: 1,
        }}
      >
        Request cETH Withdrawal
      </Typography>
      <Grid xs={12} md={6} sx={{ my: 5, mx: 'auto' }} container>
        <WithdrawWalletCard title="" description="" banks={bnkDta} />
      </Grid>
    </Container>
  );
}
